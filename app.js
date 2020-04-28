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

// create random vertices
var vertices = [];
for (var i = 0; i < 10000; i++) {
    var x = THREE.MathUtils.randFloatSpread(2000);
    var y = THREE.MathUtils.randFloatSpread(2000);
    var z = THREE.MathUtils.randFloatSpread(2000);
    vertices.push(x, y, z);
}

// add points to scene
var geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
var material = new THREE.PointsMaterial({ color: 0x888888 });
var points = new THREE.Points(geometry, material);
scene.add(points);

// clock for time
var clock = new THREE.Clock();

function simpleParticle_velo() {
    // get delta time
    var dt = clock.getDelta();

    // move all points in one direction
    // r_p = r_p + v_p * dt
    points.position.x = points.position.x + 20 * dt;
    points.position.y = points.position.y + 20 * dt;
    points.position.z = points.position.z + 20 * dt;
}

function simpleParticle_accel() {
    // get delta time
    var dt = clock.getDelta();

    // move all points in one direction
    // r_p = r_p + v_p * dt + a_p * dt^2
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