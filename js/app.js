$(function() {
	var w = 400, h = 300;
	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera( 45, w / h, 0.1, 10000 );
	var scene = new THREE.Scene();

	scene.add(camera);

	camera.position.z = 300;

	renderer.setSize(w, h);

	$('body').append(renderer.domElement);


	THREE.DodecahedronGeometry(10)
});