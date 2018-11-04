export const addExamplesToScene: (scene: BABYLON.Scene) => void = function(scene: BABYLON.Scene) {
  const sphere: BABYLON.Mesh = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);

  sphere.position.y = 1;

  const ground: BABYLON.Mesh = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
};
