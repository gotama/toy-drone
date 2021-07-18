# Toy Drone

This is my first game built in Phaser 3, a vast library with loads of examples.  Definitely an enjoyable experience using the power of JavaScript.

I am hosting the production build [here](https://rundun.co.za/game)

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

## TODO
- [x] Add Text Console
    - [ ] Report Card
    - [ ] Place Values
    - [ ] Move errors
    - [ ] Attack errors
    - [ ] Place errors
- [ ] Change origin 0,0 to south west corner
- [ ] Add Explosion
- [ ] Forward Button
- [ ] Rotate Buttons
- [ ] Place Button
- [ ] Attack Button
- [ ] Report Button
- [ ] Visually Indicate all buttons are disabled until place is complete
- [ ] HTML loading screen while waiting for JS
- [ ] Update README with production link
- [ ] Add zip file to github releases with version 1
- [ ] Bullet Score
- [ ] Splash Screen Scene
- [ ] [Reduce](https://medium.com/@louigi.verona/reducing-phasers-filesize-custom-phaser-builds-4a0314819a38) phaser.js lib size  

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/base.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json'.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended. 

