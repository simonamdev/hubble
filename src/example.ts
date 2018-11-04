export const addExamplesToScene: (scene: BABYLON.Scene) => void = function(scene: BABYLON.Scene) {
  const light: BABYLON.Light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

  const sphere: BABYLON.Mesh = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);

  sphere.position.y = 1;

  const ground: BABYLON.Mesh = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
};
