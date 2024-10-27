import { SvgIconComponent } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface RouteProps {
    Icon: SvgIconComponent;
    title: string;
    target?: string;
}

const routes: RouteProps[] = [
    {Icon: AddCircleIcon, title: 'Matches'},
    {Icon: PersonIcon, title: 'Players'},
    {Icon: GroupsIcon, title: 'Teams'},
    {Icon: DashboardIcon, title: 'Dashboard'},
]


export const RouteSelect = () => {
  return (
    <div className='w-full'>
        <div className='border-b pb-4 border-border space-y-1'>
        {routes.map((route, index) => (
            <NavRoutes key={index} {...route} />
        ))}
        </div>
        <div className='w-full mt-4 flex justify-center items-center'>
            <NavLink to={`/hud`} target='_blank' className={`flex items-center justify-center gap-2 w-1/2 rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] hover:bg-border bg-[#006494] text-textcolor shadow`}>
                <PlayArrowIcon />
                Hud
            </NavLink>
        </div>
    </div>
  )
}


const NavRoutes = ({Icon, title, target}: RouteProps) => {

    return (
        <NavLink 
        to={`${title.toLowerCase()}`}
        target={target}
        className={({ isActive }) => 
        `flex items-center justify-center lg:justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] 
        ${isActive ? 'bg-[#006494] text-textcolor shadow' : 'hover:bg-background2 bg-transparent text-stone-300 shadow-none'}`
        }>
            {<Icon />}
            {title}
      </NavLink>
    )
}