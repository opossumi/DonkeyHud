# OpenHud - Open source CS2 Hud and Admin Panel

Start of an open source CS2 Custom Hud.
<br/>
Join the community [Discord](https://discord.gg/HApB9HyaWM)!

- Styling: TailwindCSS (admin panel) / Sass (hud)
- Tech: NodeJS, Express, React, Typescript, Axios, Socketio, SQLite3

# To Do:

- Full Screen overlay fully functioning
- Reverse Team Sides
- Start Supporting uploading local files for team logos and player pictures.
- Work on readability of code
- (others listed under App.tsx)

# Getting Started:

- [NodeJS](https://nodejs.org/en) needs to be installed on your computer.
- Place the cfg file in `/public/cfgs/gamestate_integration_openhud.cfg` in your games cfg folder at `steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg`
- Run the RUN_OpenHUD.bat file
- For OBS overlay, create a `Browser Source`, delete all of the custom css, and use the url: `http://localhost:1349/hud`
- For ingame Overlay download it [Here](https://drive.google.com/file/d/1qluO3iujecZ1wNGQrf2aJiYV0Qe0SyFH/view?usp=sharing) (run OpenHUD Overlay).

Hopefully it ends up looking very nice and lets a lot of people use it in their streams!

# OpenHud React Hud based on [Lexogrine react hud](https://github.com/JohnTimmermann/OpenHud-React-Hud)

![Custom CS2 Hud](https://i.imgur.com/RH76sfA.png)

# Admin Panel

![AdminPanel/Matches](https://i.imgur.com/13QOpMn.png)
![AdminPanel/Players](https://i.imgur.com/uKwU7Kt.png)
![AdminPanel/Teams](https://i.imgur.com/MNGA5lP.png)
