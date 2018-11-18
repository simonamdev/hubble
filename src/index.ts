import * as BABYLON from 'babylonjs';
import './styles/style.scss';

import { addSystems, addSystemsFromJson, parseJsonSystem } from './galaxy';
import { addExamplesToScene } from './example';

// Test files
// TODO: Do not package these as they will inflate the package size - they should be lazy loaded
import * as jsonSystems from './assets/systems/systems-100ly.json';

const canvasId: string = '3d-map-canvas';

// Create the canvas object
const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
canvas.style.width = `100%`;
canvas.style.height = `100%`;

const engineOptions: BABYLON.EngineOptions = {
  preserveDrawingBuffer: true,
  stencil: true
};
const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true, engineOptions);

const createScene = function(): BABYLON.Scene {
  const scene: BABYLON.Scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera('camera1', 0, 0, 0, new BABYLON.Vector3(0, 5, -10), scene);
  // const camera: BABYLON.FreeCamera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, false);

  // Always attach the light for now
  const light: BABYLON.Light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

  //   addExamplesToScene(scene);
  // addSystems(scene);
  const systems: any[] = jsonSystems.map(jsonSystem => parseJsonSystem(jsonSystem));
  addSystemsFromJson(scene, systems);

  return scene;
};

const scene: BABYLON.Scene = createScene();

// Run the optimiser to try and maintain a good FPS count
// TODO: See if freezing issue when this is enabled can be solved
BABYLON.SceneOptimizer.OptimizeAsync(scene);

// TODO: Refactor into util file
const showFps = () => {
  const fpsElement = document.getElementById('fps-counter');
  fpsElement.innerHTML = `FPS: ${engine.getFps().toFixed()}`;
};

// Render loop
console.log('Done');
engine.runRenderLoop(() => {
  scene.render();
  // TODO: Do not show FPS every render frame - it is wasteful
  showFps();
});

// Set an event handler for canvas/window resize

window.addEventListener('resize', () => {
  console.log('Resizing');

  engine.resize();
});
