import { v4 } from 'uuid';
import { Mesh, Scene } from 'babylonjs';

// TODO: Adjust these to realistic numbers
const galaxyMaxX: number = 100;
const galaxyMaxY: number = 10;
const galaxyMaxZ: number = 100;

const systemCount: number = 10000;
const systemSegments = 8;
const systemDiameter: number = 1;

export interface Coords {
  x: number;
  y: number;
  z: number;
}

export interface System {
  name: string;
  id: number;
  id64: number;
  distance: number;
  coords: Coords;
  coordsLocked: boolean;
}

export const parseJsonSystem: (jsonSystem: any) => System = function(jsonSystem: any) {
  // TODO: Find simpler method of deserialising
  const coords: Coords = { x: jsonSystem.coords.x, y: jsonSystem.coords.y, z: jsonSystem.coords.z };
  const system: System = {
    coords: coords,
    name: jsonSystem.name,
    id: jsonSystem.id,
    id64: jsonSystem.id64,
    distance: jsonSystem.distance,
    coordsLocked: jsonSystem.coordsLocked
  };
  return system;
};

export const addSystemsFromJson: (scene: BABYLON.Scene, systems: System[]) => void = function(
  scene: BABYLON.Scene,
  systems: System[]
) {
  console.log(`Adding ${systems.length} systems from file`);
  const sytemSphere: BABYLON.Mesh = BABYLON.Mesh.CreateSphere(
    'system',
    systemSegments,
    systemDiameter,
    scene,
    false,
    BABYLON.Mesh.FRONTSIDE
  );
  systems.forEach((system: System) => addSystem(sytemSphere, system, scene));
  // Hide the original mesh as it does not allow clicking on the first instance
  sytemSphere.setEnabled(false);
};

const addSystem = function(mesh: BABYLON.Mesh, system: System, scene: BABYLON.Scene) {
  const newInstance: BABYLON.InstancedMesh = mesh.createInstance(system.name);
  // Test out actions
  newInstance.actionManager = new BABYLON.ActionManager(scene);
  // Copied from example: https://doc.babylonjs.com/how_to/how_to_use_actions
  newInstance.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
      console.log(`Clicked on: ${system.name}`);
    })
  );
  newInstance.position.x = system.coords.x;
  newInstance.position.y = system.coords.y;
  newInstance.position.z = system.coords.z;
  newInstance.freezeWorldMatrix();
};

// This is inclusive of min and max
const getRandInt: (min: number, max: number) => number = function getRandomInt(min: number, max: number) {
  // Reference: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
