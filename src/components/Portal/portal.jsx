import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BufferAttribute, Color, AdditiveBlending, DynamicDrawUsage } from "three";
import './portal.scss'
import { useRef, useMemo } from "react";
import { attribute } from "three/tsl";

function PortalRing({ radius, color, speed, positionZ }) {
    const ringRef = useRef()
    const particlesRef = useRef()
        const count = 700
        const {positions, basePositions, phases, amplitudes} = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const basePositions = new Float32Array(count * 3)
        const phases = new Float32Array(count)
        const amplitudes = new Float32Array(count)
        for(let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2
            const variation = (Math.random() + Math.random() + Math.random() - 1.5) * 0.16
            const particlesRadius = radius + variation
            const x = Math.cos(angle) * particlesRadius
            const y = Math.sin(angle) * particlesRadius
            const z = (Math.random() - 0.5) * 0.18
            const index = i * 3
            positions[index] = x
            positions[index + 1] = y
            positions[index + 2] = z
            basePositions[index] = x
            basePositions[index + 1] = y
            basePositions[index + 2] = z
            phases[i] = Math.random() * Math.PI * 2
            amplitudes[i] = 0.003 + Math.random() * 0.018
        }
        return {positions, basePositions, phases, amplitudes}
    }, [radius])
    useFrame((state, delta) => {
        if(ringRef.current) {
        ringRef.current.rotation.z += delta * speed
        }
        if(particlesRef.current) {
            particlesRef.current.rotation.z -= delta * speed
            const material = particlesRef.current.material
            material.opacity = 0.65 + Math.sin(state.clock.elapsedTime * 3 + positionZ) * 0.15
        }
    })
    return (
        <group position={[0, 0, positionZ]}>
            <mesh ref={ringRef}>
                <torusGeometry args={[radius, 0.06, 8, 128]}/>
                <meshBasicMaterial color={new Color(color).multiplyScalar(1.2)} transparent opacity={0.65} toneMapped={false}/>
            </mesh>
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} onUpdate={(attribute) => {attribute.setUsage(DynamicDrawUsage)}}/>
                </bufferGeometry>
                <pointsMaterial
                    color={color}
                    size={0.018}
                    sizeAttenuation
                    transparent
                    opacity={0.85}
                    depthWrite={false}
                    blending={AdditiveBlending}
                    toneMapped={false}        
                />
            </points>
        </group>
    )
}

function CameraAnimation() {
    const progress = useRef(0)
    useFrame((state, delta) => {
        progress.current = Math.min(progress.current + delta / 6, 1)
        const startZ = 5
        const endZ = -23
        const easedProgress = progress.current ** 2
        state.camera.position.z = startZ + (endZ - startZ) * easedProgress
    })
    return null
}

function PortalParticles() {
    const particlesRef = useRef()
    const positions = useMemo(() => {
        const count = 400
        const positions = new Float32Array(count * 6)
        for(let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2
            const radius = 1.8 + Math.random() * 2.5
            const z = -Math.random() * 25
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            positions[i * 6] = x
            positions[i * 6 + 1] = y
            positions[i * 6 + 2] = z

            positions[i * 6 + 3] = x
            positions[i * 6 + 4] = y
            positions[i * 6 + 5] = z - 0.1
        }
        return positions
    }, [])
    useFrame((state, delta) => {
        if(!particlesRef.current) return
        particlesRef.current.rotation.z += delta * 0.03
        const geometry = particlesRef.current.geometry
        const attribute = geometry.attributes.position
        const progress = Math.min(
            Math.max((5 - state.camera.position.z) / 28, 0), 1
        )
        const length = 0.1 + progress * 1.5
        const speed = 0.5 + progress * 5
        for(let i = 0; i < attribute.count; i += 2) {
            let z = attribute.getZ(i)
            z += speed * delta
            if(z > state.camera.position.z - 1) {
                z = state.camera.position.z - 25
            }
            attribute.setZ(i, z)
            attribute.setZ(i + 1, z - length)
        }
        attribute.needsUpdate = true
    })
    return (
        <lineSegments ref={particlesRef}>
            <bufferGeometry>
                <primitive attach="attributes-position" object={new BufferAttribute(positions, 3)}/>
            </bufferGeometry>
            <lineBasicMaterial
                color={new Color("#a855f7").multiplyScalar(2.5)}
                transparent
                opacity={0.9}
                depthWrite={false}
                toneMapped={false}
            />
        </lineSegments>
    )
}

function Portal() {
    return (
        <section className="portal">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <CameraAnimation/>
                {Array.from({ length: 15 }, (_, index) => (
                    <PortalRing
                        key={index}
                        radius={1.5}
                        color={index % 2 === 0 ? "#a855f7" : "#7c3aed"}
                        speed={index % 2 === 0 ? 0.3 : -0.3}
                        positionZ={-index * 1.5}
                    />
                ))}
                <PortalParticles/>
                <EffectComposer>
                    <Bloom intensity={1} luminanceThreshold={0.8} luminanceSmoothing={0.3} mipmapBlur/>
                </EffectComposer>
            </Canvas>
        </section>
    )
}

export default Portal