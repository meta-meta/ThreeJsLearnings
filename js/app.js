$(function() {
	var w = 1024, h = 768;
	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera( 45, w / h, 0.1, 10000 );
	var scene = new THREE.Scene();

	scene.add(camera);

	camera.position.z = 300;

	renderer.setSize(w, h);

	$('body').append(renderer.domElement);


	var dod = new THREE.Mesh( new THREE.DodecahedronGeometry(50), new THREE.MeshPhongMaterial({color: 0x666666}) );
	scene.add(dod);


	var pointLight = new THREE.PointLight(0xFF0000);
	scene.add(pointLight);

	var pointLight2 = new THREE.PointLight(0x0000FF);
	scene.add(pointLight2);

	var pointLight3 = new THREE.PointLight(0x00FF00);
	scene.add(pointLight3);

	var pointLight4 = new THREE.PointLight(0xFFFFFF);
	scene.add(pointLight4);


	function draw(t) {
		pointLight.position.set(100 * Math.sin(t / 1000), 50, 100 * Math.cos(t / 1000) );
		pointLight2.position.set(100 * Math.sin(3.1 + t / 1000), 50, 100 * Math.cos(3.1 +  t / 1000) );

		pointLight3.position.set(100 * Math.sin(-t / 1000), -50, 100 * Math.cos(-t / 1000) );
		pointLight4.position.set(100 * Math.sin(3.1 + -t / 1000), -50, 100 * Math.cos(3.1 +  -t / 1000) );

		dod.rotateX(.01);
		renderer.render(scene, camera);
	}


	// requestAnim shim layer by Paul Irish
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	function animate(t) {
		requestAnimFrame( animate );
		draw(t);
	}

	animate();
});