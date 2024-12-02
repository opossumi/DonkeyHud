# OpenHud - Open source CS2 Hud and Admin Panel

Start of an open source CS2 Custom Hud.
<br/>
EXTREMELY EARLY AND EXPERIMENTAL.
<br/>

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
- For OBS overlay, create a `Browser Source`, delete all of the custom css, and use the url: `http://localhost:3000/hud` (port will probably change later)
- Still working on an overlay for ingame. [Here](https://drive.google.com/drive/folders/1kHaRyzMUZ-qRBBaC0mFb6nQEz5j79bQm?usp=sharing) (run the Overlay.exe) is an EXTEREMELY experimental version that is not tesed at all (use at your own risk). Otherwise you can observe through your OBS scene by running the preview window as fullscreen and have the game on a second monitor

Hopefully it ends up looking very nice and lets a lot of people use it in their streams!
Join the community [Discord](https://discord.gg/HApB9HyaWM)!

# CS2-React-Hud based on [Lexogrine react hud](https://github.com/lexogrine/cs2-react-hud)

![Custom CS2 Hud](https://i.imgur.com/yEFQNyN.png)

# Admin Panel

![AdminPanel/Matches](https://i.imgur.com/13QOpMn.png)
![AdminPanel/Players](https://i.imgur.com/uKwU7Kt.png)
![AdminPanel/Teams](https://i.imgur.com/MNGA5lP.png)
