# OpenHud - Open source CS2 Hud and Admin Panel

Start of an open source CS2 Custom Hud.
<br/>
EXTREMELY EARLY AND EXPERIMENTAL.
<br/>

- Styling: TailwindCSS / Material UI / Sass
- Tech: NodeJS, Express, React, Typescript, Axios, Socketio, SQLite3

# To Do:

- Full Screen overlay fully functioning
- Rework Teams, Players, and Matches components to display data better (using tables)
- Reverse Team Sides
- Start Supporting uploading local files for team logos and player pictures.
- Work on readability of code

# Getting Started:

- [NodeJS](https://nodejs.org/en) needs to be installed on your computer.
- Place the cfg file in `/public/cfgs/gamestate_integration_openhud.cfg` in your games cfg folder at `steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg`
- FIRST TIME RUNNING: Open the integrated terminal in main directory and run `npm install`. This will install needed files for both the server and client.
- Open the integrated terminal in the main directory and run `npm start`. This will run the Server and Client concurrently.

Hopefully it ends up looking very nice and lets a lot of people use it in their streams!

# CS2-React-Hud (https://github.com/lexogrine/cs2-react-hud)

![Custom CS2 Hud](https://github.com/lexogrine/cs2-react-hud/raw/main/preview.png)
(screenshot from complete version of hud in different software. major parts of the hud still need to be implemented.)

# Admin Panel

![AdminPanel/Players](https://i.imgur.com/tseO9ZE.png)
![AdminPanel/Teams](https://i.imgur.com/ZpyKcjG.png)
![AdminPanel/Matches](https://i.imgur.com/Fco54RY.png)
