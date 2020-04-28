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

function simpleParticle(dt) {
    // move all points in one direction
    // r_p = r_p + v_p * dt
    points.position.x += 20 * dt;
    points.position.y += 20 * dt;
    points.position.z += 20 * dt;
}

let time = 0.0;

// Render Loop
var render = function (now = 0.0) {
    requestAnimationFrame(render);
    const delta = time - now;
    time = now;

    // tests:
    switch (findGetParameter("example")) {
        case "0": simpleParticle(delta); break;
        case "1": break;
    }

    // Render the scene
    renderer.render(scene, camera);
};

render();
