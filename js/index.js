//
// #AstroLive Web Application
// Nate Koenig, May 18
//



//TODO: API stuff (fetch info from website that we make / or find one online)





// Set scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Set rendering
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Create planet and set camera position
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

camera.position.z = 5;

// Set controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.update();

// Animation / actual running of project
const animate = function () {
	requestAnimationFrame( animate );

	controls.update();

	sphere.rotation.x += 0.01;
	sphere.rotation.y += 0.01;

	renderer.render( scene, camera );
}

// Run the project
animate();