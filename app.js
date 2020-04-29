// ------------------------------------------------
// SETUP
// ------------------------------------------------

function findGetParameter(parameterName) {
    return new URL(location).searchParams.get(parameterName);
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------
var example_num = findGetParameter("example");
var numParticles = 1000;
var particles = [];
switch(example_num)
{
    case "0": simpleParticle_velo_init(); break;
    case "1": simpleParticle_accel_init(); break;
    default: case "2": simpleParticle_spring_init(); break;
}

function simpleParticle_velo_init() {
    for (var i = 0; i < numParticles; i++) {
        // create cube
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
        cube.position.x = THREE.MathUtils.randFloatSpread(2000);
        cube.position.y = THREE.MathUtils.randFloatSpread(2000);
        cube.position.z = THREE.MathUtils.randFloatSpread(2000);
    
        // save additional info
        var particle = {
            cubeObject: cube,
            position: cube.position,
            velocity: {x: 20, y: 20, z: 20},
            acceleration: {x: 0, y: 0, z: 0}
        };
        particles.push(particle);
    
        // add cube to scene
        scene.add(cube);
    }
}
function simpleParticle_accel_init() {
    for (var i = 0; i < numParticles; i++) {
        // create cube
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
        cube.position.x = THREE.MathUtils.randFloatSpread(2000);
        cube.position.y = THREE.MathUtils.randFloatSpread(2000);
        cube.position.z = THREE.MathUtils.randFloatSpread(2000);
    
        // save additional info
        var particle = {
            cubeObject: cube,
            position: cube.position,
            velocity: {x: 20, y: 20, z: 20},
            acceleration: {x: 0, y: -9.81, z: 0}
        };
        particles.push(particle);
    
        // add cube to scene
        scene.add(cube);
    }
}
function simpleParticle_spring_init() {
    numParticles = 3;
    for (var i = 0; i < numParticles; i++) {
        // create cube
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
        cube.position.x = (i * 3) - 3;
        cube.position.y = 0;
        cube.position.z = 0;
    
        // save additional info
        var particle = {
            cubeObject: cube,
            position: cube.position,
            velocity: {x: 0, y: 0, z: 0},
            acceleration: {x: 0, y: 0, z: 0}
        };
        particles.push(particle);
    
        // add cube to scene
        scene.add(cube);
    }
}

// clock for time
var clock = new THREE.Clock();

function simpleParticle_velo() {
    // get delta time
    var dt = clock.getDelta();

    for(p of particles)
    {
        // update pos: x_p = x_p + dt * v_p
        p.position.x = p.position.x + dt * p.velocity.x;
        p.position.y = p.position.y + dt * p.velocity.y;
        p.position.z = p.position.z + dt * p.velocity.z;
    }
}

function simpleParticle_accel() {
    // get delta time
    var dt = clock.getDelta();

    for(p of particles)
    {
        // update pos: x_p = x_p + dt * v_p
        p.position.x = p.position.x + dt * p.velocity.x;
        p.position.y = p.position.y + dt * p.velocity.y;
        p.position.z = p.position.z + dt * p.velocity.z;

        // update velo: v_p = v_p + dt * a_p
        p.velocity.x = p.velocity.x + dt * p.acceleration.x;
        p.velocity.y = p.velocity.y + dt * p.acceleration.y;
        p.velocity.z = p.velocity.z + dt * p.acceleration.z;
    }
}

var min_dist = 1.5;
function simpleParticle_spring() {
    // get delta time
    var dt = clock.getDelta();

    for(var i = 0; i < numParticles; i++)
    {
        var p = particles[i];
        if(i < numParticles - 1)
        {
            var q = particles[i + 1];
            var d = Math.sqrt(Math.pow(q.position.x - p.position.x, 2) + Math.pow(q.position.y - p.position.y, 2) + Math.pow(q.position.z - p.position.z, 2));
            var ks_term = 0.5 * ((d / min_dist) - 1);
            p.acceleration.x = (ks_term + 0.8 * (((q.velocity.x - p.velocity.x) * (q.position.x - p.position.x)) / (min_dist * d))) * ((q.position.x - p.position.x) / d);
            p.acceleration.y = (ks_term + 0.8 * (((q.velocity.y - p.velocity.y) * (q.position.y - p.position.y)) / (min_dist * d))) * ((q.position.y - p.position.y) / d);
            p.acceleration.z = (ks_term + 0.8 * (((q.velocity.z - p.velocity.z) * (q.position.z - p.position.z)) / (min_dist * d))) * ((q.position.z - p.position.z) / d);
        }

        // update pos: x_p = x_p + dt * v_p
        p.position.x = p.position.x + dt * p.velocity.x;
        p.position.y = p.position.y + dt * p.velocity.y;
        p.position.z = p.position.z + dt * p.velocity.z;

        // update velo: v_p = v_p + dt * a_p
        p.velocity.x = p.velocity.x + dt * p.acceleration.x;
        p.velocity.y = p.velocity.y + dt * p.acceleration.y;
        p.velocity.z = p.velocity.z + dt * p.acceleration.z;
    }
}


// Render Loop
var render = function() {
    requestAnimationFrame( render );

    // examples:
    switch(example_num)
    {
        case "0": simpleParticle_velo(); break;
        case "1": simpleParticle_accel(); break;
        default: case "2": simpleParticle_spring(); break;
    }

    // Render the scene
    renderer.render(scene, camera);
};

render();
