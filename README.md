# Toy Drone

This is my first game built in Phaser 3, a vast library with loads of examples.  Definitely an enjoyable experience using the power of JavaScript.

I am hosting the production build on an unused webhosting that I own. The site is a static [Hugo](https://gohugo.io/) website.
## [Here Be The Game](https://rundun.co.za/game)

--------------------

## Requirements

[Node.js v12.22.3](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

TODO The production build will have a custom compiled version of phaser

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |
| `npm run lint` | Runs the EsLint commans `--ignore-pattern node_modules/` |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## CHANGELOG
- [x] Add Text Console
    - [x] Report Card
    - [x] Place Values
    - [x] Move errors
    - [ ] Attack errors
    - [x] Place errors
- [ ] Change origin 0,0 to south west corner
- [x] Add Explosion
- [x] Forward Button
- [x] Rotate Buttons
- [x] Place Button
- [x] Attack Button
- [x] Report Button
- [x] Visually Indicate all buttons are disabled until place is complete
- [ ] HTML loading screen while waiting for JS
- [x] Update README with production link
- [x] Add zip file to github releases with version 1
- [ ] Bullet Score
- [ ] Splash Screen Scene
- [ ] HTML / CSS loader for Hugo while waiting for JS to download.
- [ ] [Reduce](https://medium.com/@louigi.verona/reducing-phasers-filesize-custom-phaser-builds-4a0314819a38) phaser.js lib size  

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

## Test Automation

1. How would you select which automation tool is best suited for a project?
    - https://www.npmjs.com/package/phase-2-e
    - Unit Test mocked configurations that the game can run.

2. How will you go about automating the Movement of the drone?
    - Mocking out a configuration that an automation can input 
    - Exposing the MOVE button to the DOM?

3. How will your automation confirm that the drone has moved successfully to the correct location?
    - The 10x10 map will have coordinates and with a state system the drone will understand what coordinates its currently at.

4. How will you automate and confirm that no other sequence of commands can be used before the Place command has been executed?
    - The game will have state, and until the drone has been put in a placed state no other command will be executed.  The automation will be restricted by the same design.

5. How will you go about automating and verifying that the drone does not go out of the boundary?
    - The automated test will try to fly the drone away from a tile that has coordinates and then we can assert if the drone is in a boundary tile.

6. Based on your Assessment requirements and your solution, what other automatable test scenarios can you identify?
    - Check if the drone can ATTACK according specification
    - Check if the drone can TURN 90 degrees LEFT and RIGHT
    - Check if the drone can REPORT its status
