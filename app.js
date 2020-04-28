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
var numParticles = 1000;
var particles = [];
for (var i = 0; i < numParticles; i++) {
    // create cube
    var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
    cube.position.x = THREE.MathUtils.randFloatSpread(2000);;
    cube.position.y = THREE.MathUtils.randFloatSpread(2000);;
    cube.position.z = THREE.MathUtils.randFloatSpread(2000);;

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

var min_dist = 50;
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

            p.acceleration.x = 0.05 * ((d / min_dist) - 1) * ((q.position.x - p.position.x) / d);
            p.acceleration.y = 0.05 * ((d / min_dist) - 1) * ((q.position.y - p.position.y) / d);
            p.acceleration.z = 0.05 * ((d / min_dist) - 1) * ((q.position.z - p.position.z) / d);
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
    switch(findGetParameter("example"))
    {
        case "0": simpleParticle_velo(); break;
        case "1": simpleParticle_accel(); break;
        default: case "2": simpleParticle_spring(); break;
    }    

    // Render the scene
    renderer.render(scene, camera);
};

render();