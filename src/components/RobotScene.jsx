import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const RobotScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const robotRef = useRef(null);
  const robotPartsRef = useRef({});
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 1, 100);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Create Robot
    const robot = new THREE.Group();
    robotRef.current = robot;
    const parts = {};

    // Robot Head (more rounded)
    const headGeometry = new THREE.BoxGeometry(2.5, 2.2, 2.2, 2, 2, 2);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0x1e40af,
      emissiveIntensity: 0.1
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 4;
    head.castShadow = true;
    robot.add(head);
    parts.head = head;

    // Face Panel
    const facePanelGeometry = new THREE.PlaneGeometry(2, 1.5);
    const facePanelMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x00ffff,
      emissiveIntensity: 0.3
    });
    const facePanel = new THREE.Mesh(facePanelGeometry, facePanelMaterial);
    facePanel.position.set(0, 4, 1.11);
    robot.add(facePanel);
    parts.facePanel = facePanel;

    // Robot Eyes (more realistic)
    const eyeGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.9,
      metalness: 0.8,
      roughness: 0.2
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.5, 4.2, 1.2);
    robot.add(leftEye);
    parts.leftEye = leftEye;

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.5, 4.2, 1.2);
    robot.add(rightEye);
    parts.rightEye = rightEye;

    // Eye pupils
    const pupilGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.5, 4.2, 1.35);
    robot.add(leftPupil);
    parts.leftPupil = leftPupil;

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.5, 4.2, 1.35);
    robot.add(rightPupil);
    parts.rightPupil = rightPupil;

    // Antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16);
    const antennaMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x6366f1,
      metalness: 0.8,
      roughness: 0.2
    });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(0, 5.3, 0);
    robot.add(antenna);
    parts.antenna = antenna;

    const antennaTopGeometry = new THREE.SphereGeometry(0.25, 32, 32);
    const antennaTopMaterial = new THREE.MeshStandardMaterial({
      color: 0xff00ff,
      emissive: 0xff00ff,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.3
    });
    const antennaTop = new THREE.Mesh(antennaTopGeometry, antennaTopMaterial);
    antennaTop.position.set(0, 5.9, 0);
    robot.add(antennaTop);
    parts.antennaTop = antennaTop;

    // Neck joint
    const neckGeometry = new THREE.CylinderGeometry(0.5, 0.6, 0.6, 16);
    const neckMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.1
    });
    const neck = new THREE.Mesh(neckGeometry, neckMaterial);
    neck.position.y = 2.8;
    robot.add(neck);

    // Robot Body (more detailed)
    const bodyGeometry = new THREE.BoxGeometry(3, 3.5, 2, 2, 2, 2);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      metalness: 0.7,
      roughness: 0.3
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    robot.add(body);
    parts.body = body;

    // Chest Arc Reactor / Display
    const screenGeometry = new THREE.CircleGeometry(0.8, 32);
    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.7,
      metalness: 0.5,
      roughness: 0.2
    });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 0.8, 1.01);
    robot.add(screen);
    parts.screen = screen;

    // Add glowing ring around screen
    const ringGeometry = new THREE.RingGeometry(0.8, 0.95, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(0, 0.8, 1.02);
    robot.add(ring);
    parts.ring = ring;

    // Shoulder joints
    const shoulderGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const shoulderMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.1
    });
    
    const leftShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
    leftShoulder.position.set(-1.8, 1.5, 0);
    robot.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeometry, shoulderMaterial);
    rightShoulder.position.set(1.8, 1.5, 0);
    robot.add(rightShoulder);

    // Robot Arms (upper and lower)
    const upperArmGeometry = new THREE.CylinderGeometry(0.35, 0.35, 2, 16);
    const armMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3b82f6,
      metalness: 0.7,
      roughness: 0.3
    });
    
    const leftUpperArm = new THREE.Mesh(upperArmGeometry, armMaterial);
    leftUpperArm.position.set(-1.8, 0.5, 0);
    robot.add(leftUpperArm);
    parts.leftUpperArm = leftUpperArm;

    const rightUpperArm = new THREE.Mesh(upperArmGeometry, armMaterial);
    rightUpperArm.position.set(1.8, 0.5, 0);
    robot.add(rightUpperArm);
    parts.rightUpperArm = rightUpperArm;

    // Elbow joints
    const elbowGeometry = new THREE.SphereGeometry(0.35, 32, 32);
    
    const leftElbow = new THREE.Mesh(elbowGeometry, shoulderMaterial);
    leftElbow.position.set(-1.8, -0.5, 0);
    robot.add(leftElbow);

    const rightElbow = new THREE.Mesh(elbowGeometry, shoulderMaterial);
    rightElbow.position.set(1.8, -0.5, 0);
    robot.add(rightElbow);

    // Lower arms
    const lowerArmGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 16);
    
    const leftLowerArm = new THREE.Mesh(lowerArmGeometry, armMaterial);
    leftLowerArm.position.set(-1.8, -1.3, 0);
    robot.add(leftLowerArm);
    parts.leftLowerArm = leftLowerArm;

    const rightLowerArm = new THREE.Mesh(lowerArmGeometry, armMaterial);
    rightLowerArm.position.set(1.8, -1.3, 0);
    robot.add(rightLowerArm);
    parts.rightLowerArm = rightLowerArm;

    // Robot Hands
    const handGeometry = new THREE.SphereGeometry(0.45, 32, 32);
    const handMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.1
    });
    
    const leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-1.8, -2.1, 0);
    robot.add(leftHand);
    parts.leftHand = leftHand;

    const rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(1.8, -2.1, 0);
    robot.add(rightHand);
    parts.rightHand = rightHand;

    // Hip/Waist
    const waistGeometry = new THREE.CylinderGeometry(0.8, 1, 0.5, 16);
    const waist = new THREE.Mesh(waistGeometry, neckMaterial);
    waist.position.y = -1.25;
    robot.add(waist);

    // Robot Legs (upper)
    const upperLegGeometry = new THREE.CylinderGeometry(0.45, 0.45, 2.5, 16);
    
    const leftUpperLeg = new THREE.Mesh(upperLegGeometry, armMaterial);
    leftUpperLeg.position.set(-0.7, -2.75, 0);
    robot.add(leftUpperLeg);
    parts.leftUpperLeg = leftUpperLeg;

    const rightUpperLeg = new THREE.Mesh(upperLegGeometry, armMaterial);
    rightUpperLeg.position.set(0.7, -2.75, 0);
    robot.add(rightUpperLeg);
    parts.rightUpperLeg = rightUpperLeg;

    // Knee joints
    const kneeGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    
    const leftKnee = new THREE.Mesh(kneeGeometry, shoulderMaterial);
    leftKnee.position.set(-0.7, -4, 0);
    robot.add(leftKnee);

    const rightKnee = new THREE.Mesh(kneeGeometry, shoulderMaterial);
    rightKnee.position.set(0.7, -4, 0);
    robot.add(rightKnee);

    // Lower legs
    const lowerLegGeometry = new THREE.CylinderGeometry(0.4, 0.35, 2, 16);
    
    const leftLowerLeg = new THREE.Mesh(lowerLegGeometry, armMaterial);
    leftLowerLeg.position.set(-0.7, -5, 0);
    robot.add(leftLowerLeg);
    parts.leftLowerLeg = leftLowerLeg;

    const rightLowerLeg = new THREE.Mesh(lowerLegGeometry, armMaterial);
    rightLowerLeg.position.set(0.7, -5, 0);
    robot.add(rightLowerLeg);
    parts.rightLowerLeg = rightLowerLeg;

    // Robot Feet
    const footGeometry = new THREE.BoxGeometry(0.8, 0.4, 1.2, 2, 2, 2);
    
    const leftFoot = new THREE.Mesh(footGeometry, handMaterial);
    leftFoot.position.set(-0.7, -6.2, 0.2);
    robot.add(leftFoot);
    parts.leftFoot = leftFoot;

    const rightFoot = new THREE.Mesh(footGeometry, handMaterial);
    rightFoot.position.set(0.7, -6.2, 0.2);
    robot.add(rightFoot);
    parts.rightFoot = rightFoot;

    // Position robot initially off to the side
    robot.position.set(-12, 0, 0);
    scene.add(robot);
    robotPartsRef.current = parts;

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Floating geometric shapes
    const shapes = [];
    const shapeGeometries = [
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1),
      new THREE.IcosahedronGeometry(1),
      new THREE.TorusGeometry(1, 0.4, 16, 100),
      new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16)
    ];

    for (let i = 0; i < 20; i++) {
      const geometry = shapeGeometries[Math.floor(Math.random() * shapeGeometries.length)];
      const material = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0x00ffff : 0xff00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
        metalness: 0.8,
        roughness: 0.2
      });
      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 40 - 10
      );
      shape.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      };
      shape.userData.floatSpeed = Math.random() * 0.02 + 0.01;
      shape.userData.floatOffset = Math.random() * Math.PI * 2;
      shapes.push(shape);
      scene.add(shape);
    }

    // Add large rotating torus/donut in background
    const mainTorusGeometry = new THREE.TorusGeometry(8, 2, 30, 200);
    const mainTorusMaterial = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
      metalness: 0.9,
      roughness: 0.1
    });
    const mainTorus = new THREE.Mesh(mainTorusGeometry, mainTorusMaterial);
    mainTorus.position.set(20, 0, -20);
    scene.add(mainTorus);

    // Add another morphing torus
    const torus2Geometry = new THREE.TorusGeometry(6, 1.5, 30, 200);
    const torus2Material = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      metalness: 0.9,
      roughness: 0.1
    });
    const torus2 = new THREE.Mesh(torus2Geometry, torus2Material);
    torus2.position.set(-20, 10, -25);
    scene.add(torus2);

    // Animation state
    let time = 0;
    let currentSection = 0;
    const smoothing = 0.08; // Increased smoothing for less jittery movement

    // Store initial positions
    const initialPositions = {
      leftUpperArm: { x: -1.8, y: 0.5, z: 0 },
      rightUpperArm: { x: 1.8, y: 0.5, z: 0 },
      leftLowerArm: { x: -1.8, y: -1.3, z: 0 },
      rightLowerArm: { x: 1.8, y: -1.3, z: 0 },
      leftHand: { x: -1.8, y: -2.1, z: 0 },
      rightHand: { x: 1.8, y: -2.1, z: 0 },
      leftUpperLeg: { x: -0.7, y: -2.75, z: 0 },
      rightUpperLeg: { x: 0.7, y: -2.75, z: 0 },
      leftLowerLeg: { x: -0.7, y: -5, z: 0 },
      rightLowerLeg: { x: 0.7, y: -5, z: 0 },
      leftFoot: { x: -0.7, y: -6.2, z: 0.2 },
      rightFoot: { x: 0.7, y: -6.2, z: 0.2 }
    };

    // Target rotations for smooth interpolation
    const targetRotations = {
      leftUpperArm: 0,
      rightUpperArm: 0,
      leftLowerArm: 0,
      rightLowerArm: 0,
      leftUpperLeg: 0,
      rightUpperLeg: 0,
      leftLowerLeg: 0,
      rightLowerLeg: 0,
      head: { x: 0, y: 0, z: 0 }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate particles
      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      // Animate floating shapes
      shapes.forEach((shape, i) => {
        shape.rotation.x += shape.userData.rotationSpeed.x;
        shape.rotation.y += shape.userData.rotationSpeed.y;
        shape.rotation.z += shape.userData.rotationSpeed.z;
        shape.position.y += Math.sin(time + shape.userData.floatOffset) * shape.userData.floatSpeed;
      });

      // Animate main torus/donut - morphing effect
      mainTorus.rotation.x += 0.005;
      mainTorus.rotation.y += 0.008;
      mainTorus.rotation.z += 0.003;
      
      // Morphing scale effect
      const scale = 1 + Math.sin(time * 0.5) * 0.1;
      mainTorus.scale.set(scale, scale, scale);
      
      // Color shift
      mainTorus.material.color.setHSL((time * 0.05) % 1, 0.7, 0.5);

      // Animate second torus
      torus2.rotation.x -= 0.003;
      torus2.rotation.y -= 0.006;
      torus2.rotation.z -= 0.004;
      
      const scale2 = 1 + Math.sin(time * 0.3 + 2) * 0.15;
      torus2.scale.set(scale2, scale2, scale2);
      
      torus2.material.color.setHSL((time * 0.03 + 0.5) % 1, 0.8, 0.5);

      // Animate robot based on scroll
      if (robotRef.current && robotPartsRef.current) {
        const progress = scrollProgress;
        const parts = robotPartsRef.current;
        
        // Calculate which section we're in (0-5 for 6 sections)
        const section = Math.floor(progress * 5.99);
        
        // Robot position follows scroll smoothly
        const targetY = 15 - (progress * 30); // Move from top to bottom
        // Horizontal movement: start left, move right, then back to center
        const targetX = -15 + (progress * 25); // Move from left (-15) to right (10) as you scroll
        
        robot.position.y += (targetY - robot.position.y) * smoothing;
        robot.position.x += (targetX - robot.position.x) * smoothing;

        // Smooth body rotation
        const targetBodyRotation = Math.sin(progress * Math.PI) * 0.1;
        robot.rotation.y += (targetBodyRotation - robot.rotation.y) * smoothing;

        // Reset positions to initial before applying new animations
        Object.keys(initialPositions).forEach(key => {
          if (parts[key]) {
            const initial = initialPositions[key];
            parts[key].position.x += (initial.x - parts[key].position.x) * 0.1;
            parts[key].position.y += (initial.y - parts[key].position.y) * 0.1;
            parts[key].position.z += (initial.z - parts[key].position.z) * 0.1;
          }
        });

        // Idle animations - subtle
        targetRotations.head.y = Math.sin(time * 1.5) * 0.15;
        targetRotations.head.x = Math.sin(time * 1.2) * 0.08;
        
        parts.head.rotation.y += (targetRotations.head.y - parts.head.rotation.y) * 0.1;
        parts.head.rotation.x += (targetRotations.head.x - parts.head.rotation.x) * 0.1;

        // Eye blink effect - smoother
        const blinkTime = Math.sin(time * 2);
        const targetBlinkScale = blinkTime > 0.97 ? 0.1 : 1;
        parts.leftEye.scale.y += (targetBlinkScale - parts.leftEye.scale.y) * 0.3;
        parts.rightEye.scale.y += (targetBlinkScale - parts.rightEye.scale.y) * 0.3;
        parts.leftPupil.scale.y = parts.leftEye.scale.y;
        parts.rightPupil.scale.y = parts.rightEye.scale.y;

        // Screen glow pulse
        const targetScreenIntensity = 0.5 + Math.sin(time * 2) * 0.2;
        parts.screen.material.emissiveIntensity += (targetScreenIntensity - parts.screen.material.emissiveIntensity) * 0.1;

        // Antenna animation
        const targetAntennaIntensity = 0.6 + Math.sin(time * 3) * 0.3;
        parts.antennaTop.material.emissiveIntensity += (targetAntennaIntensity - parts.antennaTop.material.emissiveIntensity) * 0.1;

        // Ring rotation
        parts.ring.rotation.z += 0.02;

        // Walking animation when scrolling - smoother
        const scrollSpeed = Math.abs(progress - (robot.userData.lastProgress || 0));
        if (scrollSpeed > 0.0005) {
          const walkCycle = time * 8;
          targetRotations.leftUpperLeg = Math.sin(walkCycle) * 0.2;
          targetRotations.rightUpperLeg = -Math.sin(walkCycle) * 0.2;
          targetRotations.leftLowerLeg = Math.max(0, Math.sin(walkCycle) * 0.3);
          targetRotations.rightLowerLeg = Math.max(0, -Math.sin(walkCycle) * 0.3);
        } else {
          targetRotations.leftUpperLeg = 0;
          targetRotations.rightUpperLeg = 0;
          targetRotations.leftLowerLeg = 0;
          targetRotations.rightLowerLeg = 0;
        }
        
        parts.leftUpperLeg.rotation.x += (targetRotations.leftUpperLeg - parts.leftUpperLeg.rotation.x) * 0.15;
        parts.rightUpperLeg.rotation.x += (targetRotations.rightUpperLeg - parts.rightUpperLeg.rotation.x) * 0.15;
        parts.leftLowerLeg.rotation.x += (targetRotations.leftLowerLeg - parts.leftLowerLeg.rotation.x) * 0.15;
        parts.rightLowerLeg.rotation.x += (targetRotations.rightLowerLeg - parts.rightLowerLeg.rotation.x) * 0.15;
        
        robot.userData.lastProgress = progress;

        // Different poses for different sections - smooth transitions
        if (section !== currentSection) {
          currentSection = section;
        }

        // Reset arm rotations for new pose
        const baseArmRotation = Math.sin(time) * 0.05; // Subtle breathing

        switch(currentSection) {
          case 0: // Hero - Waving
            targetRotations.rightUpperArm = -1.2 + Math.sin(time * 3) * 0.4;
            targetRotations.rightLowerArm = -0.3 + Math.sin(time * 3) * 0.3;
            targetRotations.leftUpperArm = 0.2 + baseArmRotation;
            targetRotations.leftLowerArm = 0;
            
            parts.rightHand.position.y = -2.1 + Math.sin(time * 3) * 0.2;
            break;
            
          case 1: // Automations - Pointing
            targetRotations.rightUpperArm = -1.3;
            targetRotations.rightLowerArm = -0.8;
            targetRotations.leftUpperArm = 0.3;
            targetRotations.leftLowerArm = 0.3;
            
            parts.facePanel.material.emissiveIntensity = 0.5 + Math.sin(time * 4) * 0.2;
            break;
            
          case 2: // Lead Engagement - Thinking
            targetRotations.rightUpperArm = 1.5;
            targetRotations.rightLowerArm = 1.8;
            targetRotations.leftUpperArm = 0.3;
            targetRotations.leftLowerArm = 0;
            
            parts.rightHand.position.y = 3.5;
            parts.rightHand.position.z = 0.8;
            targetRotations.head.x = 0.2;
            break;
            
          case 3: // AI Chatbots - Talking
            targetRotations.leftUpperArm = 0.5 + Math.sin(time * 5) * 0.2;
            targetRotations.rightUpperArm = -0.5 - Math.sin(time * 5) * 0.2;
            targetRotations.leftLowerArm = 0.3;
            targetRotations.rightLowerArm = 0.3;
            
            targetRotations.head.y = Math.sin(time * 6) * 0.25;
            parts.screen.material.emissiveIntensity = 0.7 + Math.sin(time * 8) * 0.3;
            break;
            
          case 4: // AI Calling - Gesturing
            targetRotations.leftUpperArm = 0.8 + Math.sin(time * 2) * 0.3;
            targetRotations.rightUpperArm = -0.8 - Math.sin(time * 2) * 0.3;
            targetRotations.leftLowerArm = 0.5;
            targetRotations.rightLowerArm = 0.5;
            break;
            
          case 5: // Blockchain - Celebrating
            targetRotations.leftUpperArm = 2.5;
            targetRotations.rightUpperArm = -2.5;
            targetRotations.leftLowerArm = -1;
            targetRotations.rightLowerArm = -1;
            
            const bounce = Math.sin(time * 4) * 0.15;
            robot.position.y += bounce;
            
            parts.leftHand.position.y = -1.5;
            parts.rightHand.position.y = -1.5;
            break;
        }

        // Apply smooth arm rotations
        parts.leftUpperArm.rotation.z = 0.2;
        parts.rightUpperArm.rotation.z = -0.2;
        
        parts.leftUpperArm.rotation.x += (targetRotations.leftUpperArm - parts.leftUpperArm.rotation.x) * 0.1;
        parts.rightUpperArm.rotation.x += (targetRotations.rightUpperArm - parts.rightUpperArm.rotation.x) * 0.1;
        parts.leftLowerArm.rotation.x += (targetRotations.leftLowerArm - parts.leftLowerArm.rotation.x) * 0.1;
        parts.rightLowerArm.rotation.x += (targetRotations.rightLowerArm - parts.rightLowerArm.rotation.x) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [scrollProgress]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default RobotScene;
