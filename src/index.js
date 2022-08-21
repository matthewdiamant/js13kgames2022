import Background from "./Background";
import CPUPlayer from "./CPUPlayer";
import Drawer from "./Drawer";
import FogOfWar from "./FogOfWar";
import Keyboard from "./Keyboard";
import HUD from "./HUD";
import HumanPlayer from "./HumanPlayer";
import Level from "./Level";
import Map from "./Map";
import MineCollection from "./MineCollection";
import MiniMap from "./MiniMap";
import Mouse from "./Mouse";
import ParticleCollection from "./ParticleCollection";
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

  let fogOfWar = new FogOfWar();
  let hud = new HUD();
  let level = new Level();
  let map = new Map();
  let mines = new MineCollection({ map });
  let miniMap = new MiniMap();
  let humanPlayer = new HumanPlayer({ map });
  let cpuPlayer = new CPUPlayer({ map });
  let particles = new ParticleCollection();

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
    level.tick({ cpuPlayer, humanPlayer });
    camera.tick({ keyboard, mouse });
    mouse.tick({ camera });
    cpuPlayer.tick({
      map,
      mines,
      particles,
      sound,
      targets: humanPlayer.entities(),
    });
    humanPlayer.tick({
      camera,
      cpuPlayer,
      drawer,
      map,
      mines,
      mouse,
      particles,
      sound,
      targets: cpuPlayer.entities(),
    });
    mines.tick();
    hud.tick({ camera, drawer, map, mouse, player: humanPlayer, sound });
    particles.tick({ map });
    fogOfWar.tick({ humanPlayer, map });
  };

  let drawObjects = () => [
    background,
    map,
    particles,
    mines,
    cpuPlayer,
    humanPlayer,
    mouse,
    fogOfWar,
    hud,
    miniMap,
    level,
  ];

  gameLoop();
};
