import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls";
import { ImprovedNoise } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/math/ImprovedNoise';
import { Line2 } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/lines/Line2";
import { LineMaterial } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/lines/LineMaterial";
import { LineGeometry } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/lines/LineGeometry";
import { EffectComposer } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const perlin = new ImprovedNoise();
let v3 = new THREE.Vector3();

// Setup scena
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 5000);
camera.position.set(5, 2, 5).setLength(12);

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);

// Controlli orbitali
let controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;
controls.minDistance = 1;
controls.maxDistance = 15;

// Resize handler
window.addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

// Generazione curve neurali
let curvePts = new Array(200).fill().map(p => {
    return new THREE.Vector3().randomDirection();
});
let curve = new THREE.CatmullRomCurve3(curvePts, true);
let pts = curve.getSpacedPoints(200);
pts.shift();
curve = new THREE.CatmullRomCurve3(pts, true);
pts = curve.getSpacedPoints(10000);
pts.forEach(p => {p.setLength(4)});

// Applica deformazione per forma cerebrale
pts.forEach(p => {
    deform(p);
});

// Converti punti per LineGeometry
let fPts = [];
pts.forEach(p => {fPts.push(p.x, p.y, p.z)});

// Materiale per linee neurali con effetti
let globalUniforms = {
    time: {value: 0},
    bloom: {value: 0}
}

let lineGeometry = new LineGeometry();
lineGeometry.setPositions(fPts);

let lineMaterial = new LineMaterial({
    color: "magenta",
    worldUnits: true,
    linewidth: 0.0375,
    alphaToCoverage: true,
    onBeforeCompile: shader => {
        shader.uniforms.time = globalUniforms.time;
        shader.uniforms.bloom = globalUniforms.bloom;
        // Shader personalizzati per effetti flow
    }
});

lineMaterial.resolution.set(innerWidth, innerHeight);
let neuralLines = new Line2(lineGeometry, lineMaterial);
neuralLines.computeLineDistances();
scene.add(neuralLines);

// Sfera trasparente wireframe
let sphereGeometry = new THREE.IcosahedronGeometry(1, 70);
for (let i = 0; i < sphereGeometry.attributes.position.count; i++) {
    v3.fromBufferAttribute(sphereGeometry.attributes.position, i);
    deform(v3);
    sphereGeometry.attributes.position.setXYZ(i, v3.x, v3.y, v3.z);
}

let sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x7f00ff,
    wireframe: true,
    transparent: true,
    onBeforeCompile: shader => {
        shader.uniforms.bloom = globalUniforms.bloom;
        shader.uniforms.time = globalUniforms.time;
        // Shader per effetti noise sulla superficie
    }
});

let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Particelle scintillanti (sinapsi)
let LINK_COUNT = 50;
let linkPts = [];
for (let i = 0; i < LINK_COUNT; i++) {
    let pS = new THREE.Vector3().randomDirection();
    let pE = new THREE.Vector3().randomDirection();
    let division = 100;
    for (let j = 0; j < division; j++) {
        let v1 = new THREE.Vector3().lerpVectors(pS, pE, j / division);
        let v2 = new THREE.Vector3().lerpVectors(pS, pE, (j + 1) / division);
        deform(v1, true);
        deform(v2, true);
        linkPts.push(v1, v2);
    }
}

let linkGeometry = new THREE.BufferGeometry().setFromPoints(linkPts);
let linkMaterial = new THREE.LineDashedMaterial({
    color: 0xffff00,
    onBeforeCompile: shader => {
        shader.uniforms.time = globalUniforms.time;
        shader.uniforms.bloom = globalUniforms.bloom;
        // Shader per effetti pulsanti delle scintille
    }
});

let sparkles = new THREE.LineSegments(linkGeometry, linkMaterial);
sparkles.computeLineDistances();
scene.add(sparkles);

// Setup post-processing per effetti bloom
const params = {
    exposure: 1,
    bloomStrength: 7,
    bloomThreshold: 0,
    bloomRadius: 0
};

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

const finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
        uniforms: {
            baseTexture: {value: null},
            bloomTexture: {value: bloomComposer.renderTarget2.texture}
        },
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        defines: {}
    }), 'baseTexture'
);
finalPass.needsSwap = true;

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(finalPass);

// Loop animazione
let clock = new THREE.Clock();

// Nascondi messaggio di loading
document.getElementById('info').style.visibility = "hidden";
document.getElementById('writing').style.visibility = "visible";

renderer.setAnimationLoop(() => {
    let t = clock.getElapsedTime();
    
    controls.update();
    
    globalUniforms.time.value = t;
    
    // Render con bloom
    globalUniforms.bloom.value = 1;
    bloomComposer.render();
    
    // Render finale
    globalUniforms.bloom.value = 0;
    finalComposer.render();
});

// Funzione di deformazione per forma cerebrale
function deform(p, useLength) {
    let mainR = 5;
    
    v3.copy(p).normalize();
    let len = p.length();
    
    let ns = perlin.noise(v3.x * 3, v3.y * 3, v3.z * 3);
    ns = Math.pow(Math.abs(ns), 0.5) * 0.25;
    
    let r = smoothstep(0.125, 0, Math.abs(v3.x)) - ns;
    p.setLength(mainR - Math.pow(r, 2) * 1);
    p.y *= 1 - 0.5 * smoothstep(0, -mainR, p.y);
    p.y *= 0.75;
    p.x *= 0.75;
    p.y *= 1 - 0.125 * smoothstep(mainR * 0.25, -mainR, p.z);
    p.x *= 1 - 0.125 * smoothstep(mainR * 0.25, -mainR, p.z);
    
    if (useLength) {
        p.multiplyScalar(len);
    }
}

function smoothstep(min, max, value) {
    var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
    return x*x*(3 - 2*x);
}
