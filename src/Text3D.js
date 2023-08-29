import * as THREE from 'three';
import '../style.css';
import './viewFixing.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// constants 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
// let textName = "Default Text";
// window.addEventListener("load",()=>{
//     textName = window.prompt("Please Enter your GF name:") == "" && "Single"
// })

window.addEventListener("resize",()=>{
    
    // Update the sizes
    sizes.height = window.innerHeight;
    sizes.width = window.innerWidth;

    // Update camera and projection matrics
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    
    // Update Renderer
    renderer.setSize(sizes.width, sizes.height);

})


const canvas = document.querySelector(".webgl");
// Scene
const scene = new THREE.Scene();


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);


// Orbit Controls
const controls = new OrbitControls(camera, canvas);


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/textures/matcaps/4.png');



// Font Loader
const fontLoader = new FontLoader();
const material = new THREE.MeshMatcapMaterial({ matcap: texture});

fontLoader.load('/fonts/helvetiker_regular.typeface.json',async (font)=>{
    

    const textGeometry = new TextGeometry("3D TEXT",
    {
        font:font,
        size: 0.6,
        height:0.3
    });
    
    
    
    const text = new THREE.Mesh(textGeometry,material);
    text.position.z = 0.4;
    
    /** To center the text */

    // geometry.computeBoundingBox();
    // console.log(geometry.boundingBox.max)
    // geometry.translate(
    //     - (geometry.boundingBox.max.x * 0.5),
    //     - (geometry.boundingBox.max.y * 0.5),
    //     - (geometry.boundingBox.max.z * 0.5)
    // )

    textGeometry.center();
    scene.add(text)
})
const donutGeometry = new THREE.TorusGeometry(0.3,0.2,15,40)

console.time("donut")

for(let i=0; i<100; i++){
    const donut = new THREE.Mesh(donutGeometry, material);

    donut.position.set(
        (Math.random() - 0.5) * 10 ,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    )

    donut.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    )

    const scale = (Math.random() * 3 )/ 3
    donut.scale.set(
        scale, scale, scale
    )

    scene.add(donut)

}

console.timeEnd("donut")






// Geometry
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00f000 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

const clock = new THREE.Clock()
const animation = ()=>{

    const time = clock.getElapsedTime() * 0.6
    camera.position.x = 6 * (Math.sin(time)) + Math.cos(time);
    camera.position.z = 6 * (Math.cos(time)) + Math.sin(time);

    controls.update()
    window.requestAnimationFrame(animation);
    renderer.render(scene,camera);
}

animation();





renderer.render(scene, camera)
