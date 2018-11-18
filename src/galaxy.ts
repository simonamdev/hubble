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

export const addSystemsFromJson: (scene: BABYLON.Scene, systems: System[]) => void = function(scene: BABYLON.Scene, systems: System[]) {
  // TODO: Deduplicate from other function
  console.log(`Adding ${systems.length} systems from file`);
  const sytemSphere: BABYLON.Mesh = BABYLON.Mesh.CreateSphere('system', systemSegments, systemDiameter, scene, false, BABYLON.Mesh.FRONTSIDE);
  systems.forEach((system: System) => addSystem(sytemSphere, system.coords.x, system.coords.y, system.coords.z, scene));
};

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

export const addSystems: (scene: BABYLON.Scene) => void = function(scene: BABYLON.Scene) {
  // TODO: Add spheres where systems would be
  // For now - random positions are sufficient
  const sytemSphere: BABYLON.Mesh = BABYLON.Mesh.CreateSphere('system', systemSegments, systemDiameter, scene, false, BABYLON.Mesh.FRONTSIDE);
  for (let i = 0; i < systemCount; i++) {
    // Ref:
    // https://programming.guide/random-point-within-circle.html
    // To be circular, generate a random angle, then adjust X and Z to that angle
    const angle: number = Math.random() * 2 * Math.PI;
    const radius: number = galaxyMaxX * Math.sqrt(Math.random());
    const randomX: number = radius * Math.cos(angle);
    const randomZ: number = radius * Math.sin(angle);
    const randomY: number = getRandInt(-galaxyMaxY, galaxyMaxY);
    addSystem(sytemSphere, randomX, randomY, randomZ, scene);
    console.log(`Added System ${i + 1}`);
  }
};

const addSystem = function(mesh: BABYLON.Mesh, x: number, y: number, z: number, scene: BABYLON.Scene) {
  const name: string = v4();
  const newInstance: BABYLON.InstancedMesh = mesh.createInstance(name);
  newInstance.position.x = x;
  newInstance.position.y = y;
  newInstance.position.z = z;
  newInstance.freezeWorldMatrix();
};

// This is inclusive of min and max
const getRandInt: (min: number, max: number) => number = function getRandomInt(min: number, max: number) {
  // Reference: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
