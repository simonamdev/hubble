import { v4 } from 'uuid';

// TODO: Adjust these to realistic numbers
const galaxyMaxX: number = 100;
const galaxyMaxY: number = 10;
const galaxyMaxZ: number = 100;

const systemCount: number = 2000;

export const addSystems: (scene: BABYLON.Scene) => void = function(scene: BABYLON.Scene) {
  // TODO: Add spheres where systems would be
  // For now - random positions are sufficient
  for (let i = 0; i < systemCount; i++) {
    const name: string = v4();
    // Ref:
    // https://programming.guide/random-point-within-circle.html
    // To be circular, generate a random angle, then adjust X and Z to that angle
    const angle: number = Math.random() * 2 * Math.PI;
    const radius: number = galaxyMaxX * Math.sqrt(Math.random());
    const randomX: number = radius * Math.cos(angle);
    const randomZ: number = radius * Math.sin(angle);
    const randomY: number = getRandInt(-galaxyMaxY, galaxyMaxY);
    addSystem(name, randomX, randomY, randomZ, scene);
    console.log(`Added System ${i + 1}`);
  }
};

const systemDiameter: number = 1;
const addSystem: (name: string, x: number, y: number, z: number, scene: BABYLON.Scene) => void = function(
  name: string,
  x: number,
  y: number,
  z: number,
  scene: BABYLON.Scene
) {
  const sphere: BABYLON.Mesh = BABYLON.Mesh.CreateSphere(`system-${name}`, 16, systemDiameter, scene, false, BABYLON.Mesh.FRONTSIDE);
  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = z;
};

// This is inclusive of min and max
const getRandInt: (min: number, max: number) => number = function getRandomInt(min: number, max: number) {
  // Reference: https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
