import * as BABYLON from "babylonjs";

const canvasId: string = "3d-map-canvas";

// Create the canvas object
const canvas = document.createElement("canvas");
canvas.id = canvasId;
document.body.appendChild(canvas);

const engineOptions: BABYLON.EngineOptions = {
  preserveDrawingBuffer: true,
  stencil: true
};
const engine: BABYLON.Engine = new BABYLON.Engine(canvas, true, engineOptions);

const createScene = function(): BABYLON.Scene {
  const scene: BABYLON.Scene = new BABYLON.Scene(engine);

  const camera: BABYLON.FreeCamera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, false);

  const light: BABYLON.Light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

  const sphere: BABYLON.Mesh = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);

  sphere.position.y = 1;

  const ground: BABYLON.Mesh = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene, false);

  return scene;
};

const scene: BABYLON.Scene = createScene();

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Set an event handler for canvas/window resize

window.addEventListener("resize", () => {
  engine.resize();
});
