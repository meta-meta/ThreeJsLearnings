$(function() {
	var w = 1024, h = 768;
	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera( 45, w / h, 0.1, 10000 );
	var scene = new THREE.Scene();

	scene.add(camera);

	camera.position.z = 300;

	renderer.setSize(w, h);

	$('body').append(renderer.domElement);



	var dod = new THREE.Mesh( new THREE.DodecahedronGeometry(50), new THREE.MeshLambertMaterial({color: 0xCC00CC}) );
	scene.add(dod);

	var pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position.set(10, 50, 130);
	scene.add(pointLight);

	renderer.render(scene, camera);

});