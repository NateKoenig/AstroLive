//
// #AstroLive Web Application
// Nate Koenig, May 18
//
// Astro data taken from https://www.nasa.gov/astronauts/biographies/active



//TODO: API stuff (fetch info from website that we make / or find one online)


// Global variables
var planet, astronaut, radius, scene, camera, renderer;

// Set scene
radius = 5;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 20;

// Set rendering
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Set controls
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.update();

// Generates planet given a radius
function planet(r) {
	var planetGeometry = new THREE.SphereGeometry( r, 32, 32 );
	var planetMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	planet = new THREE.Mesh( planetGeometry, planetMaterial );
	planet.position.set( 0, 0, 0 );
	scene.add( planet );
}

// Generates astronaut at a random location
function astro() {
	var astroGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	var astroMaterial = new THREE.MeshBasicMaterial( { color: 0xf5fffa} );
	astronaut = new THREE.Mesh ( astroGeometry, astroMaterial );
	astronaut.position.set( 0, 6, 0 );
	scene.add( astronaut );
}

// Animation / actual running of project
const animate = function () {
	requestAnimationFrame( animate );

	controls.update();

	planet.rotation.x += 0.01;
	planet.rotation.y += 0.01;

	renderer.render( scene, camera );
}

// Driver
function init() {
	planet(radius);
	astro();
	animate();
}

init();
