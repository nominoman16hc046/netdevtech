import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import './ThreeBackground.css'

function ParticleField({ count = 8000 }) {
  const points = useRef()
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * 60
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(360)
      
      positions[i * 3] = distance * Math.sin(theta) * Math.cos(phi)
      positions[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi)
      positions[i * 3 + 2] = distance * Math.cos(theta)
    }
    
    return positions
  }, [count])
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (points.current) {
      points.current.rotation.x = time * 0.05
      points.current.rotation.y = time * 0.075
      points.current.rotation.z = time * 0.02
    }
  })
  
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#6366f1"
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function MorphingSphere() {
  const mesh = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = time * 0.2
      mesh.current.rotation.y = time * 0.3
      mesh.current.position.y = Math.sin(time * 0.5) * 1.5
      mesh.current.position.x = Math.cos(time * 0.3) * 2
    }
  })
  
  return (
    <mesh ref={mesh} position={[5, 0, -3]}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

function GeometricShapes() {
  const group = useRef()
  const torus = useRef()
  const octahedron = useRef()
  const icosahedron = useRef()
  const cone = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (group.current) {
      group.current.rotation.y = time * 0.08
    }
    
    if (torus.current) {
      torus.current.rotation.x = time * 0.4
      torus.current.rotation.y = time * 0.3
      torus.current.position.z = Math.sin(time * 0.3) * 2
    }
    
    if (octahedron.current) {
      octahedron.current.rotation.x = time * 0.25
      octahedron.current.rotation.z = time * 0.35
      octahedron.current.position.y = Math.cos(time * 0.4) * 2
    }
    
    if (icosahedron.current) {
      icosahedron.current.rotation.x = time * 0.15
      icosahedron.current.rotation.y = time * 0.25
    }
    
    if (cone.current) {
      cone.current.rotation.z = time * 0.2
      cone.current.position.x = Math.sin(time * 0.6) * 3
    }
  })
  
  return (
    <group ref={group}>
      {/* Torus Knot */}
      <mesh ref={torus} position={[-7, 3, -6]}>
        <torusKnotGeometry args={[2, 0.5, 100, 16]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.4}
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Octahedron */}
      <mesh ref={octahedron} position={[-3, -4, -8]}>
        <octahedronGeometry args={[2.5]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.4}
          emissive="#06b6d4"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Icosahedron */}
      <mesh ref={icosahedron} position={[7, -2, -10]}>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial
          color="#ec4899"
          wireframe
          transparent
          opacity={0.4}
          emissive="#ec4899"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Cone */}
      <mesh ref={cone} position={[0, 5, -12]}>
        <coneGeometry args={[1.5, 3, 8]} />
        <meshStandardMaterial
          color="#f59e0b"
          wireframe
          transparent
          opacity={0.3}
          emissive="#f59e0b"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Additional floating shapes */}
      <mesh position={[-5, -5, -10]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#10b981"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      
      <mesh position={[5, 6, -14]} rotation={[0.3, 0.8, 0]}>
        <tetrahedronGeometry args={[1.8]} />
        <meshStandardMaterial
          color="#f59e0b"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      
      {/* Dodecahedron */}
      <mesh position={[-8, 0, -15]} rotation={[0.2, 0.3, 0.4]}>
        <dodecahedronGeometry args={[1.5]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

function AnimatedLights() {
  const light1 = useRef()
  const light2 = useRef()
  const light3 = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (light1.current) {
      light1.current.position.x = Math.sin(time * 0.5) * 12
      light1.current.position.z = Math.cos(time * 0.5) * 12
      light1.current.intensity = Math.sin(time * 0.8) * 0.5 + 1.5
    }
    
    if (light2.current) {
      light2.current.position.x = Math.cos(time * 0.3) * 12
      light2.current.position.z = Math.sin(time * 0.3) * 12
      light2.current.intensity = Math.cos(time * 0.6) * 0.5 + 1.5
    }
    
    if (light3.current) {
      light3.current.position.x = Math.sin(time * 0.4) * 8
      light3.current.position.y = Math.cos(time * 0.4) * 8
      light3.current.intensity = Math.sin(time * 0.7) * 0.3 + 1
    }
  })
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight ref={light1} position={[10, 10, 10]} intensity={1.5} color="#6366f1" distance={30} />
      <pointLight ref={light2} position={[-10, -10, -10]} intensity={1.5} color="#ec4899" distance={30} />
      <pointLight ref={light3} position={[0, 10, 5]} intensity={1} color="#8b5cf6" distance={25} />
      <pointLight position={[8, -8, -5]} intensity={0.8} color="#06b6d4" distance={20} />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#f59e0b" />
    </>
  )
}

function ThreeBackground({ scrollY }) {
  return (
    <div className="three-background">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 75 }}
        style={{ background: 'radial-gradient(circle at center, #0f0f23 0%, #000000 100%)' }}
      >
        <AnimatedLights />
        <ParticleField />
        <MorphingSphere />
        <GeometricShapes />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  )
}

export default ThreeBackground
