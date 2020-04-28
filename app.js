// ------------------------------------------------
// SETUP
// ------------------------------------------------

function findGetParameter(parameterName) {
    return new URL(location).searchParams.get(parameterName);
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------



// create random particles
var particles = [];
for (var i = 0; i < 1000; i++) {
    // rand pos
    var x = THREE.MathUtils.randFloatSpread(2000);
    var y = THREE.MathUtils.randFloatSpread(2000);
    var z = THREE.MathUtils.randFloatSpread(2000);

    // create cube
    var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    // save additional info
    var particle = {
        cubeObject: cube,
        position:  cube.position,
        velocity: {x: 20, y: 20, z: 20},
        acceleration: {x: 0, y: -9.81, z: 0}
    };
    particles.push(particle);

    // add cube to scene
    scene.add(cube);
}

// clock for time
var clock = new THREE.Clock();

function simpleParticle_velo() {
    // get delta time
    var dt = clock.getDelta();

    // move all points in one direction
    // r_p = r_p + dt * v_p
    for(p of particles)
    {
        // update pos
        p.position.x = p.position.x + dt * p.velocity.x;
        p.position.y = p.position.y + dt * p.velocity.y;
        p.position.z = p.position.z + dt * p.velocity.z;
    }
}

function simpleParticle_accel() {
    // get delta time
    var dt = clock.getDelta();

    // move all points in one direction
    // v_p = v_p + dt * a_p
    // r_p = r_p + dt * v_p
    for(p of particles)
    {
        // update pos
        p.position.x = p.position.x + dt * p.velocity.x;
        p.position.y = p.position.y + dt * p.velocity.y;
        p.position.z = p.position.z + dt * p.velocity.z;

        // update velo
        p.velocity.x = p.velocity.x + dt * p.acceleration.x;
        p.velocity.y = p.velocity.y + dt * p.acceleration.y;
        p.velocity.z = p.velocity.z + dt * p.acceleration.z;
    }
}

// Render Loop
var render = function() {
    requestAnimationFrame( render );

    // examples:
    switch(findGetParameter("example"))
    {
        case "0": simpleParticle_velo(); break;
        case "1": simpleParticle_accel(); break;
    }    

    // Render the scene
    renderer.render(scene, camera);
};

render();