$(function() {
	var w = 1024, h = 1024;
	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera( 45, w / h, 0.1, 10000 );
	var scene = new THREE.Scene();

	scene.add(camera);

	camera.position.z = 300;

	renderer.setSize(w, h);

	$('body').append(renderer.domElement);


	var dod;

	html2canvas(document.body.children[0], {
		onrendered: function(canvas) {
			var url = canvas.toDataURL("image/png");
			var urls = [url, url, url, url, url, url];

			// wrap it up into the object that we need
			var cubemap = THREE.ImageUtils.loadTextureCube(urls);

			cubemap.format = THREE.RGBFormat;

			var shader = THREE.ShaderLib[ "cube" ];
			shader.uniforms[ "tCube" ].texture = cubemap;

			var reflectionMaterial = new THREE.MeshLambertMaterial({
				color: 0xcccccc,
				envMap: cubemap,
				reflectivity: 0.7
			});


			dod = new THREE.Mesh( new THREE.DodecahedronGeometry(100), reflectionMaterial );
			scene.add(dod);
		}
	});



	var pointLight = new THREE.PointLight(0xFF0000);
	scene.add(pointLight);

	var pointLight2 = new THREE.PointLight(0x0000FF);
	scene.add(pointLight2);

	var pointLight3 = new THREE.PointLight(0x00FF00);
	scene.add(pointLight3);

	var pointLight4 = new THREE.PointLight(0xFFFFFF);
	scene.add(pointLight4);


	function draw(t) {
		pointLight.position.set(300 * Math.sin(t / 3000), 50, 300 * Math.cos(t / 3000) );
		pointLight2.position.set(300 * Math.sin(3.1 + t / 3000), 50, 300 * Math.cos(3.1 +  t / 3000) );

		pointLight3.position.set(300 * Math.sin(-t / 3000), -50, 300 * Math.cos(-t / 3000) );
		pointLight4.position.set(300 * Math.sin(3.1 + -t / 3000), -50, 300 * Math.cos(3.1 +  -t / 3000) );

		dod && dod.rotateX(.001);
		dod && dod.rotateY(.0023);
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