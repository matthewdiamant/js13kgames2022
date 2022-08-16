import Background from "./Background";
import BloodCollection from "./BloodCollection";
import BloodChunkCollection from "./BloodChunkCollection";
import CPUPlayer from "./CPUPlayer";
import Drawer from "./Drawer";
import Keyboard from "./Keyboard";
import HUD from "./HUD";
import HumanPlayer from "./HumanPlayer";
import Map from "./Map";
import MineCollection from "./MineCollection";
import MiniMap from "./MiniMap";
import Mouse from "./Mouse";
import Sound from "./Sound";

let fps = 60,
  interval = 1000 / fps,
  lastTime = 0,
  delta = 0;

window.onload = () => {
  let drawer = new Drawer();

  let background = new Background({
    cw: drawer.canvas.width,
    ch: drawer.canvas.height,
  });
  let keyboard = new Keyboard();
  let mouse = new Mouse();
  let sound = new Sound();

  let bloods = new BloodCollection();
  let bloodChunks = new BloodChunkCollection();
  let hud = new HUD();
  let map = new Map();
  let mines = new MineCollection({ map });
  let miniMap = new MiniMap();
  let humanPlayer = new HumanPlayer();
  let cpuPlayer = new CPUPlayer();

  let gameLoop = (currentTime) => {
    window.requestAnimationFrame(gameLoop);
    if (currentTime - lastTime) {
      tick();
      drawer.clearBackground();
      drawer.clearMiniMap();
      drawObjects().map((object) => object.draw(drawer));
      lastTime = currentTime - (delta % interval);
    }
  };

  let tick = () => {
    const { camera } = drawer;
    camera.tick({ keyboard });
    mouse.tick({ camera });
    cpuPlayer.tick({
      bloods,
      bloodChunks,
      map,
      sound,
      targets: humanPlayer.entities(),
    });
    humanPlayer.tick({
      bloods,
      bloodChunks,
      cpuPlayer,
      map,
      mouse,
      sound,
      targets: cpuPlayer.entities(),
    });
    mines.tick();
    hud.tick({ drawer, mouse, player: humanPlayer });
    bloods.tick({ map });
    bloodChunks.tick({ map });
  };

  let drawObjects = () => [
    background,
    map,
    bloods,
    bloodChunks,
    mines,
    cpuPlayer,
    humanPlayer,
    mouse,
    hud,
    miniMap,
  ];

  gameLoop();
};
