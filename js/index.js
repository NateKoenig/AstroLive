//
// #AstroLive Web Application
// Nate Koenig, May 18
//
// Astro data taken from https://en.wikipedia.org/wiki/NASA_Astronaut_Corps#:~:text=ranks%20and%20positions-,Astronauts,(Group%2016)%20or%20later.



//TODO: API stuff (fetch info from website that we make / or find one online)
var wrapAPIKey = "key goes here";


// Global variables
var planet, astronaut, radius, scene, camera, renderer;

// Track number of astronauts
var curAstros;
var numAstros = 48; // as of May 19, 2021

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

// Fetches astronauts from wrapapi, update text + add astronauts when appropriate
// TODO: FIX--------------------------------------------------------------------------------------------------------
function fetchAstros() {
	$.ajax({
		url: "https://wrapapi.com/use/nako48/wiki/astro/0.0.2?wrapAPIKey=rIJ903B7HBgAJ756wzYMm5MBrfW96REQ",
		method: "POST",
		data: {
			"wrapAPIKey": wrapAPIKey
		}
	}).done(function(data) {
		if (data.success) {
			numAstros = data["data"]["#totalAstros"];
		}
		if (curAstros != numAstros) {
			growAstros();
		}
	});
}

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
	// FIX: Make random position -------------------------------------------------
	var astroGeometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	var astroMaterial = new THREE.MeshBasicMaterial( { color: 0xf5fffa} );
	astronaut = new THREE.Mesh ( astroGeometry, astroMaterial );
	astronaut.position.set( 0, 6, 0 );
	scene.add( astronaut );
}

// Adds n number of astronauts
function growAstros(n) {
	for (var i = 0; i < n; i++) {
		scene.add(astro());
	}
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
	// Make planet
	planet(radius);

	// Update number of astronauts
	fetchAstros();

	// Create animation
	animate();
}

init();
