import Background from "./Background";
import Drawer from "./Drawer";
import Keyboard from "./Keyboard";
import HUD from "./HUD";
import Map from "./Map";
import MiniMap from "./MiniMap";
import Mouse from "./Mouse";
import Player from "./Player";

let fps = 60,
  interval = 1000 / fps,
  lastTime = 0,
  delta = 0;

/*
import Sound from "./Sound";
import CollisionDetector from "./CollisionDetector";

import Level from "./Level";
import Map from "./Map";
import HUD from "./HUD";
import EnemyCollection from "./EnemyCollection";
import ProjectileCollection from "./ProjectileCollection";
import BloodCollection from "./BloodCollection";
import PackageCollection from "./PackageCollection";
*/

window.onload = () => {
  let drawer = new Drawer();

  let background = new Background({
    cw: drawer.canvas.width,
    ch: drawer.canvas.height,
  });
  let keyboard = new Keyboard();
  let mouse = new Mouse();

  let hud = new HUD();
  let map = new Map();
  let miniMap = new MiniMap();
  let player = new Player();

  /*
  let sound = new Sound();
  let collisionDetector = new CollisionDetector();


  let level = new Level();
  let enemies = new EnemyCollection();
  let projectiles = new ProjectileCollection();
  let spurts = new BloodCollection();
  let chunks = { chunks: [] };
  let packages = new PackageCollection();

  level.initializeLevel(1, {
    player,
    enemies,
    chunks,
    spurts,
    packages,
    map,
  });
  */

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
    const mouseEvents = mouse.tick({ camera });
    player.tick({ mouseEvents });

    /*
    level.tick({
      player,
      enemies,
      chunks,
      spurts,
      packages,
      sound,
      map,
      background,
    });
    player.tick({ camera, keyboard, map, projectiles, sound, chunks, spurts });
    enemies.tick({
      camera,
      map,
      projectiles,
      spurts,
      chunks,
      player,
      sound,
      level,
    });
    camera.tick({ player, map });
    projectiles.tick();
    spurts.tick();

    if (chunks.chunks.length > 1000) {
      chunks.chunks = chunks.chunks.slice(chunks.chunks.length - 1000);
    }
    chunks.chunks.forEach((chunk) => chunk.tick());

    hud.tick(player, enemies, level.level.enemyColor);
    packages.tick(map, level.level.level);
    */
  };

  let drawObjects = () => [background, map, player, mouse, hud, miniMap];

  gameLoop();
};
