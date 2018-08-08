'use strict'

window.onload = function () {

    var width = 640;
    var height = 480;
    var aspect = width / height;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(65, aspect, 1, 1000);　 //左から画角、縦横比、クリッピング近い、クリッピング遠い
    camera.position.z = 600;

    var geometry = new THREE.CubeGeometry(200, 200, 200);
    var material = new THREE.MeshLambertMaterial({
        color: 0x202080
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.rotation.set(0.5, 0.5, 0);
    scene.add(cube);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 0, 3);
    scene.add(directionalLight);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color('white'));
    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);

    function animate() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}