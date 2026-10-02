import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export function initScene(canvas) {
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) {
    console.warn('WebGL not supported');
    return () => {};
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  
  const dpr = Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 2, 9);
  
  // Resizing
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  });
  resizeObserver.observe(canvas.parentElement || document.body);

  // Lighting
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.0);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);
  
  const fillLight = new THREE.HemisphereLight(0xffffff, 0xF5F5F5, 0.6);
  scene.add(fillLight);

  const deskGroup = new THREE.Group();
  scene.add(deskGroup);

  // 1. Flat orange ellipse (backing shape)
  const ellipseGeo = new THREE.CylinderGeometry(3.5, 3.5, 0.1, 64);
  const ellipseMat = new THREE.MeshPhysicalMaterial({
    color: 0xF4560E,
    roughness: 0.2,
    emissive: 0xF4560E,
    emissiveIntensity: 0.1, // D-02: Keep orange vivid
  });
  const ellipse = new THREE.Mesh(ellipseGeo, ellipseMat);
  ellipse.rotation.x = Math.PI / 2;
  ellipse.position.set(0, 0, -2);
  deskGroup.add(ellipse);

  // Glow under ellipse (Sprite or Plane)
  const glowGeo = new THREE.PlaneGeometry(8, 8);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xF4560E,
    transparent: true,
    opacity: 0.35,
    depthWrite: false,
    map: createRadialGradient()
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set(0, 0, -2.1);
  deskGroup.add(glow);

  // 2. Mechanical Keyboard
  const kbGroup = new THREE.Group();
  kbGroup.position.set(0, -0.5, 1);
  deskGroup.add(kbGroup);
  
  const kbCaseGeo = new RoundedBoxGeometry(4.2, 0.2, 1.6, 4, 0.1);
  const inkMat = new THREE.MeshPhysicalMaterial({ color: 0xF5F5F5, roughness: 0.4, clearcoat: 0.1 });
  const kbCase = new THREE.Mesh(kbCaseGeo, inkMat);
  kbGroup.add(kbCase);
  
  const rows = 5;
  const cols = 14;
  const keyCount = rows * cols;
  const keyGeo = new RoundedBoxGeometry(0.24, 0.15, 0.24, 2, 0.05);
  const keyMat = new THREE.MeshPhysicalMaterial({ color: 0x0A0A0A, roughness: 0.5 }); // Cream
  const keysInstanced = new THREE.InstancedMesh(keyGeo, keyMat, keyCount);
  
  const dummy = new THREE.Object3D();
  const keyStates = new Float32Array(keyCount);
  const keyTargetY = new Float32Array(keyCount);
  
  // Simple layout mapping
  const keyCodes = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = (c - cols / 2 + 0.5) * 0.28;
      const z = (r - rows / 2 + 0.5) * 0.28;
      dummy.position.set(x, 0.15, z);
      dummy.updateMatrix();
      keysInstanced.setMatrixAt(idx, dummy.matrix);
      
      // Color some keys orange (Esc, Enter)
      if ((r === 0 && c === 0) || (r === 2 && c === cols - 1) || (r === 4 && c === Math.floor(cols/2))) {
        keysInstanced.setColorAt(idx, new THREE.Color(0xF4560E));
      } else {
        keysInstanced.setColorAt(idx, new THREE.Color(0x0A0A0A));
      }
      
      keyTargetY[idx] = 0.15;
      keyStates[idx] = 0.15;
      keyCodes.push(`Key${String.fromCharCode(65 + (idx % 26))}`); // Rough mockup
      idx++;
    }
  }
  kbGroup.add(keysInstanced);

  // 3. Mouse
  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(2.8, -0.5, 1);
  deskGroup.add(mouseGroup);
  
  const mouseBodyGeo = new THREE.CapsuleGeometry(0.3, 0.5, 16, 32);
  const mouseBodyMat = new THREE.MeshPhysicalMaterial({ color: 0xF5F5F5, roughness: 0.15, clearcoat: 1.0 });
  const mouseBody = new THREE.Mesh(mouseBodyGeo, mouseBodyMat);
  mouseBody.rotation.x = Math.PI / 2;
  mouseGroup.add(mouseBody);
  
  const wheelGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0xF4560E, roughness: 0.4 });
  const wheel = new THREE.Mesh(wheelGeo, wheelMat);
  wheel.position.set(0, 0.15, -0.2);
  wheel.rotation.z = Math.PI / 2;
  mouseGroup.add(wheel);

  // 4. Laptop
  const laptopGroup = new THREE.Group();
  laptopGroup.position.set(-2, 0, -0.5);
  laptopGroup.rotation.y = 0.3;
  deskGroup.add(laptopGroup);
  
  const baseGeo = new RoundedBoxGeometry(2.5, 0.1, 1.8, 4, 0.05);
  const laptopMat = new THREE.MeshStandardMaterial({ color: 0x0A0A0A, roughness: 0.3 });
  const laptopBase = new THREE.Mesh(baseGeo, laptopMat);
  laptopGroup.add(laptopBase);
  
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, 0.05, -0.9); // Hinge
  laptopGroup.add(lidGroup);
  
  const lidGeo = new RoundedBoxGeometry(2.5, 0.08, 1.8, 4, 0.05);
  const lidMesh = new THREE.Mesh(lidGeo, laptopMat);
  lidMesh.position.set(0, 0, 0.9);
  lidGroup.add(lidMesh);
  
  const screenGeo = new THREE.PlaneGeometry(2.3, 1.5);
  
  // Screen canvas texture
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512;
  screenCanvas.height = 256;
  const sCtx = screenCanvas.getContext('2d');
  const screenTex = new THREE.CanvasTexture(screenCanvas);
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 0.041, 0.9);
  screen.rotation.x = -Math.PI / 2;
  lidGroup.add(screen);
  
  // State for choreography
  let scrollProgress = 0;
  let time = 0;
  let isVisible = true;
  let animationId = null;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let isMouseDown = false;
  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;

  // Draw Screen
  function drawScreen() {
    sCtx.fillStyle = '#0F0F0F';
    sCtx.fillRect(0, 0, 512, 256);
    sCtx.fillStyle = '#F4560E';
    
    // Abstract bars "typing"
    const lineCount = 5;
    for (let i = 0; i < lineCount; i++) {
      const w = 50 + Math.sin(time * 2 + i) * 30 + Math.random() * 20;
      sCtx.fillRect(40, 40 + i * 30, w, 15);
    }
    sCtx.fillStyle = '#FBF5EE';
    for (let i = 0; i < 3; i++) {
      const w = 100 + Math.cos(time * 1.5 + i) * 50;
      sCtx.fillRect(150, 40 + i * 30, w, 15);
    }
    screenTex.needsUpdate = true;
  }

  // Events
  const onScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    
    const delta = window.scrollY - lastScrollY;
    scrollVelocity = delta;
    wheel.rotation.x += delta * 0.05; // Spin mouse wheel
    lastScrollY = window.scrollY;
    
    // Keyboard ripple
    triggerRipple();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  const onMouseMove = (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  const onMouseDown = () => { isMouseDown = true; };
  const onMouseUp = () => { isMouseDown = false; };
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mouseup', onMouseUp);

  const onKeyDown = (e) => {
    const code = e.code;
    const matchIdx = keyCodes.findIndex(k => k === code) !== -1 ? keyCodes.findIndex(k => k === code) : Math.floor(Math.random() * keyCount);
    if (matchIdx >= 0 && matchIdx < keyCount) {
      keyTargetY[matchIdx] = 0.05; // Depress
      setTimeout(() => { keyTargetY[matchIdx] = 0.15; }, 100);
    }
  };
  window.addEventListener('keydown', onKeyDown);

  const onVisibility = () => {
    isVisible = !document.hidden;
    if (isVisible && !animationId) animate();
  };
  document.addEventListener('visibilitychange', onVisibility);

  function triggerRipple() {
    for (let i = 0; i < keyCount; i++) {
      const delay = (i % cols) * 20;
      setTimeout(() => {
        keyTargetY[i] = 0.10;
        setTimeout(() => { keyTargetY[i] = 0.15; }, 100);
      }, delay);
    }
  }

  function createRadialGradient() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }

  function animate() {
    if (!isVisible) {
      animationId = null;
      return;
    }
    animationId = requestAnimationFrame(animate);
    time += 0.016;

    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;

    // Mouse movement
    mouseGroup.position.x = 2.8 + mouseX * 1.5;
    mouseGroup.position.z = 1 + mouseY * 1.5;
    if (isMouseDown) {
      mouseBody.rotation.y = 0.05; // slight tilt on click
    } else {
      mouseBody.rotation.y = 0;
    }

    // Keyboard keys physics
    keysInstanced.instanceMatrix.needsUpdate = true;
    for (let i = 0; i < keyCount; i++) {
      keyStates[i] += (keyTargetY[i] - keyStates[i]) * 0.3;
      const c = i % cols;
      const r = Math.floor(i / cols);
      const x = (c - cols / 2 + 0.5) * 0.28;
      const z = (r - rows / 2 + 0.5) * 0.28;
      dummy.position.set(x, keyStates[i], z);
      dummy.updateMatrix();
      keysInstanced.setMatrixAt(i, dummy.matrix);
    }

    drawScreen();

    // Scroll Choreography
    // Intro -> Hero
    const aboutEnd = 0.28;
    const skillsEnd = 0.42;
    const workEnd = 0.62;
    const learningEnd = 0.78;

    if (scrollProgress < aboutEnd) {
      // Hero: Idle float, laptop closed slightly
      deskGroup.position.lerp(new THREE.Vector3(1, -0.5, 0), 0.1);
      deskGroup.rotation.y = THREE.MathUtils.lerp(deskGroup.rotation.y, -0.15 + mouseX * 0.05, 0.1);
      deskGroup.rotation.x = THREE.MathUtils.lerp(deskGroup.rotation.x, 0.2 + mouseY * 0.05, 0.1);
      lidGroup.rotation.x = THREE.MathUtils.lerp(lidGroup.rotation.x, Math.PI * 0.6, 0.1); // ~110 degrees
      ellipseMat.opacity = 1;
      deskGroup.scale.lerp(new THREE.Vector3(1,1,1), 0.1);
    } else if (scrollProgress < skillsEnd) {
      // About: Camera dollies to laptop
      deskGroup.position.lerp(new THREE.Vector3(2, -0.5, 2), 0.05);
      deskGroup.rotation.y = THREE.MathUtils.lerp(deskGroup.rotation.y, 0, 0.05);
      lidGroup.rotation.x = THREE.MathUtils.lerp(lidGroup.rotation.x, Math.PI * 0.7, 0.05);
    } else if (scrollProgress < workEnd) {
      // Work: Recede and dim
      deskGroup.position.lerp(new THREE.Vector3(0, 0, -4), 0.05);
      ellipseMat.opacity = THREE.MathUtils.lerp(ellipseMat.opacity, 0.3, 0.05);
      deskGroup.scale.lerp(new THREE.Vector3(0.8,0.8,0.8), 0.05);
    } else if (scrollProgress < learningEnd) {
      // Learning
      deskGroup.position.lerp(new THREE.Vector3(-1.5, -0.5, 0), 0.05);
      ellipseMat.opacity = THREE.MathUtils.lerp(ellipseMat.opacity, 1, 0.05);
      deskGroup.scale.lerp(new THREE.Vector3(1,1,1), 0.05);
    } else {
      // Contact
      deskGroup.position.lerp(new THREE.Vector3(0, 0, 1), 0.05);
      deskGroup.rotation.y = THREE.MathUtils.lerp(deskGroup.rotation.y, 0, 0.05);
      deskGroup.rotation.x = THREE.MathUtils.lerp(deskGroup.rotation.x, 0.1, 0.05);
    }

    renderer.render(scene, camera);
  }

  animate();

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    cancelAnimationFrame(animationId);
    animationId = null;
  });
  canvas.addEventListener('webglcontextrestored', () => {
    animate();
  });

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('visibilitychange', onVisibility);
    resizeObserver.disconnect();
    
    // Dispose resources
    ellipseGeo.dispose();
    ellipseMat.dispose();
    glowGeo.dispose();
    glowMat.dispose();
    kbCaseGeo.dispose();
    inkMat.dispose();
    keyGeo.dispose();
    keyMat.dispose();
    mouseBodyGeo.dispose();
    mouseBodyMat.dispose();
    wheelGeo.dispose();
    wheelMat.dispose();
    baseGeo.dispose();
    laptopMat.dispose();
    lidGeo.dispose();
    screenGeo.dispose();
    screenMat.dispose();
    screenTex.dispose();
    renderer.dispose();
  };
}
