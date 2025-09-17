import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js"; //AGGIUNGE LIBRARIA ORBIT ON CLICK E ZOOM
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias:true});
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 155;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement); //AGGIUNGE CONTROLLI ORBIT ALLA SCENA
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 2);  //creo nuova geometria icosaedro
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
//scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({       //creata nuova mesh wireframe
    color:0xffffff,
    wireframe: true
})

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);     //mesh.add invece che scene.add lo rende wireMesh un child di mesh

const knotGeometry = new THREE.TorusKnotGeometry(10,3,100,16);
const knotMat = new THREE.MeshStandardMaterial({
    color: 0x40047c,             // purple
    emissive: 0x46165f,          // dark purple
    roughness: 0.337,            // from the slider
    metalness: 1,                // fully metallic
    ior: 1,                      // index of refraction
    reflectivity: 0.909,         // reflectivity value
    iridescence: 1,              // iridescence enabled
    iridescenceIOR: 1,           // iridescence IOR
    iridescenceThicknessRange: [100, 400], // creates color-shift effect
    clearcoat: 0.79,             // clearcoat layer
    clearcoatRoughness: 0.17,    // clearcoat roughness
    specularIntensity: 1,        // specular intensity
    specularColor: 0xfff700,     // yellow specular highlight
    flatShading: true,           // flat shading enabled
    wireframe: false,            // wireframe disabled
    side: THREE.FrontSide        // render only the front
});
const knot = new THREE.Mesh (knotGeometry, knotMat);
knot.scale.setScalar(0.9,0.9,0.9);
//scene.add(knot);

const wireKnotGeo = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const wireKnotMat = new THREE.MeshBasicMaterial({color: 0xff00a1, wireframe: true});
const wireKnot = new THREE.Mesh(wireKnotGeo, wireKnotMat);
knot.add(wireKnot);

const hemiLight = new THREE.HemisphereLight(0xadd8e6, 0xff0aa1);
scene.add(hemiLight);

const sun = new THREE.SpotLight(0xff00a1, 0xadd8e6);
sun.position.set (100, 2000, 100);
sun.castShadow = true;
//scene.add(sun);

const sun2 = new THREE.SpotLight(0x123456, 0x654321);
sun2.position.set (-100, -200, -200);
//sun2.setSize(0.1,0.1,0.1)
sun2.castShadow = true;
//scene.add(sun2);

const faccione = new GLTFLoader();

//faccione.load( 'assets/gengar.glb', function ( gltf ) {
//    gltf.scene.scale.set(0.5, 0.5, 0.5);                                // Adjust scale (X, Y, Z)
 //   gltf.scene.rotation.set(0,-90,0);
//	scene.add( gltf.scene );
//}, undefined, function ( error ) {
//	console.error( error );
//} );

const knotGeometrytwo = new THREE.TorusKnotGeometry(10,3,100,16);
const knotMattwo = new THREE.MeshStandardMaterial({color: 0xD9B99 });
const knottwo = new THREE.Mesh (knotGeometrytwo, knotMattwo);
knottwo.scale.setScalar(3,3,3);
//scene.add(knottwo);

// animazione rotazione sfera
function animate(t=0) {
    requestAnimationFrame(animate); 
    knottwo.rotation.y = t*0.0001;
    renderer.render(scene, camera);
    controls.update();
}
animate();



// LUCI DA STUDIO

function createStudioLights(scene) {
    // Hemisphere light for overall ambient fill (soft blue from top, white from bottom)
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Key light - main light source
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill light - to soften shadows
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
    fillLight.position.set(-500, 500, -500);
    scene.add(fillLight);

    // Back light - to highlight edges and create depth
    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(0, 500, -500);
    scene.add(backLight);

    // Optional point lights for extra highlights (like a studio setup)
    const pointLight1 = new THREE.PointLight(0xffffff, 0.2);
    pointLight1.position.set(200, 200, 200);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.2);
    pointLight2.position.set(-200, -200, 200);
    scene.add(pointLight2);
}



// INIZIA SCRIPT DI CHAT PER RANDOMIZZAZIONE

 const container = document.getElementById('canvas-container');
    

    
    camera.position.set(0, 1.9, 4);

    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.physicallyCorrectLights = true;
    container.appendChild(renderer.domElement);

   
    controls.target.set(0,1.4,0);
    controls.update();

    // luci
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(2,5,3);
    scene.add(dir);

    const loader = new GLTFLoader();


//gruppo che contiene testa e capelli per animarli insieme

const avatarGroup = new THREE.Group();
scene.add(avatarGroup);



    // carica la testa
    let head = null;
    loader.load('./assets/testa.glb', (g) => {
      head = g.scene;
      head.traverse(n => { if (n.isMesh) { n.castShadow = true; n.receiveShadow = true; } });
      // opzionale: scalatura/posizionamento
      head.position.set(0,0,0);
      avatarGroup.add(head);
      // scene.add(head);
    }, undefined, (e)=>console.error('Errore caricamento head', e));

    // array per capelli
    const hairList = []; // {name, object}
    const hairNames = ['Anime','Pink','Miao']; // etichette
    const hairFiles = ['./assets/1_anime.glb',
        './assets/2_pink.glb',
        './assets/3_orecchie.glb',
        './assets/5_catmask.glb',
        './assets/6_zepeto.glb',
    './assets/7_wind.glb',
    './assets/8_fiocco.glb',
    './assets/9_wet.glb',
     './assets/9_wet.glb',
    
    ];

    // carica tutti i capelli (invisibili all'inizio)
    const hairRoot = new THREE.Group();
    scene.add(hairRoot);
    avatarGroup.add(hairRoot);
    avatarGroup.add(head);

    Promise.all(hairFiles.map((f, i) => new Promise((res, rej) => {
      loader.load(f, (g) => {
        const node = g.scene;
        node.name = 'hair_' + i;
        node.visible = false;
        // posiziona/scala se necessario
        node.position.set(0,0,0);
        hairRoot.add(node);
        hairList.push({name: hairNames[i]||('Hair '+i), obj: node});
        res();
      }, undefined, (err)=>{ console.warn('hair load err', f, err); res(); });
    }))).then(()=> {
      // popola select
      const select = document.getElementById('hairSelect');
      hairList.forEach((h, idx) => {
        const opt = document.createElement('option');
        opt.value = idx; opt.textContent = h.name;
        select.appendChild(opt);
      });
    });

    // funzioni per mostrare un hair
    let currentIndex = -1;
    function showHair(idx) {
      if (currentIndex === idx) return;
      hairList.forEach((h, i) => h.obj.visible = (i === idx));
      currentIndex = idx;
      const select = document.getElementById('hairSelect');
      select.value = idx;
    }

    // randomize
    document.getElementById('random').addEventListener('click', () => {
      if (hairList.length === 0) return;
      const r = Math.floor(Math.random() * hairList.length);
      showHair(r);
    });

    // select change
    // document.getElementById('hairSelect').addEventListener('change', (ev) => {
   //   showHair(parseInt(ev.target.value));
   // });

    // colorizza capelli: cambia baseColor se il materiale è MeshStandardMaterial/Principled
    function randomColor() {
      return new THREE.Color(Math.random(), Math.random(), Math.random());
    }
    document.getElementById('colorize').addEventListener('click', () => {
      if (currentIndex < 0) return;
      const hair = hairList[currentIndex].obj;
      hair.traverse(n => {
        if (n.isMesh && n.material) {
          // se è ArrayMaterial -> iterare
          if (Array.isArray(n.material)) {
            n.material.forEach(m => { if (m.color) m.color.copy(randomColor()); m.needsUpdate=true; });
          } else {
            if (n.material.color) n.material.color.copy(randomColor());
            n.material.needsUpdate = true;
          }
        }
      });
    });

let t = 0 ;

//FLOAT CONTINUO DELLA TESTA

function animateAvatarGroup() {
  requestAnimationFrame(animateAvatarGroup);

  t += 0.02; // velocità globale del movimento

   if (avatarGroup) {
    // vertical floating (up/down)
    avatarGroup.position.y = 
        0.03 * Math.sin(t * 0.8) + 0.015 * Math.sin(t * 1.5);

    // gentle side-to-side (left/right)
    avatarGroup.position.x = 
        0.02 * Math.sin(t * 0.9);

    // rotation tilts
    avatarGroup.rotation.x = 
        0.03 * Math.sin(t * 0.5) + 0.02 * Math.sin(t * 0.9); // front/back tilt
    avatarGroup.rotation.y = 
        0.02 * Math.sin(t * 0.6) + 0.015 * Math.sin(t * 1.2); // left/right rotation
    avatarGroup.rotation.z = 
        0.01 * Math.sin(t * 0.4); // subtle roll for extra natural feeling
  }


  if (controls) controls.update();
  renderer.render(scene, camera);
}

animateAvatarGroup();


    // render loop
   

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
