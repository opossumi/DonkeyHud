import React from 'react'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const StatCards = () => {
  return (
   <>
    <Card title={'Test'} value={'100$'} pillText={'20%'} trend={'up'} period={'Jan 1 - 2'} />
    <Card title={'Test'} value={'100$'} pillText={'20%'} trend={'down'} period={'Jan 1 - 2'} />
    <Card title={'Test'} value={'100$'} pillText={'20%'} trend={'up'} period={'Jan 1 - 2'} />
   </>
  )
}

interface CardProps {
    title: string;
    value: string;
    pillText: string;
    trend: "up" | "down";
    period: string;
}

const Card = ({title, value, pillText, trend, period}:CardProps) => {
    return (
        <div className='p-4 col-span-4 rounded border border-stone-300'>
            <div className='flex mb-8 items-start justify-between'>
                <div>
                    <h3 className='text-sm text-stone-500 mb-2'>{title}</h3>
                    <p className='text-3xl font-semibold'>{value}</p>
                </div>
                <span className={`text-sm flex items-center gap-1 font-medium px-2 py-1 rounded ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {trend === 'up' ? <TrendingUpIcon/> : <TrendingDownIcon/>}
                    {pillText}
                </span>
            </div>
            <p className='text-xs text-stone-500'>{period}</p>
        </div>
    )
}
