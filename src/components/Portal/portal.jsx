import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BufferAttribute, Color, AdditiveBlending, DoubleSide } from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { plasmaVertexShader, plasmaFragmentShader } from "./plasmaShader.js";
import { useRef, useMemo } from "react";
import './portal.scss'


function PortalRing({ radius, color, speed, positionZ }) {
    const materialRef = useRef()
    const uniforms = useMemo(() => ({
        uTime: {value: 0},
        uColor: {value: new Color(color)} 
    }), [color])
    useFrame((state, delta) => {
        if(!materialRef.current) return
        materialRef.current.uniforms.uTime.value += delta
    })
    return (
        <mesh position={[0, 0, positionZ]} scale={radius / 1.5}>
            <ringGeometry args={[1.28, 1.72, 256, 16]}/>
            <shaderMaterial
                ref={materialRef}
                uniforms={uniforms}
                vertexShader={plasmaVertexShader}
                fragmentShader={plasmaFragmentShader}
                transparent
                side={DoubleSide}
                blending={AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
            />
        </mesh>
    )
}

function CameraAnimation({ progressRef }) {
    useFrame((state, delta) => {
        progressRef.current = Math.min(progressRef.current + delta / 6, 1)
        const progress = progressRef.current
        const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
        const startZ = 5
        const endZ = -23
        state.camera.position.z = startZ + (endZ - startZ) * easedProgress
    })
    return null
}

function PortalScene() {
    const progressRef = useRef(0)
    return (
        <>
            <CameraAnimation progressRef={progressRef}/>
            {Array.from({length: 15}, (_, index) => (
                <PortalRing
                    key={index}
                    radius={1.5}
                    color={index % 2 === 0 ? "#a855f7" : "#7c3aed"}
                    speed={index % 2 === 0 ? 0.3 : -0.3}
                    positionZ={-index * 1.5} 
                />
            ))}
            <PortalParticles progressRef={progressRef}/>
            <TerminalOutline progressRef={progressRef} />
            <EffectComposer>
                <Bloom
                    intensity={1}
                    luminanceThreshold={0.8}
                    luminanceSmoothing={0.3}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    )
}


function PortalParticles({ progressRef }) {
    const particlesRef = useRef();
    const materialRef = useRef();
    const transitionTimeRef = useRef(0);
    const startPositionsRef = useRef(null);
    const startRotationRef = useRef(0);
    const {
        positions,
        colors,
        speeds,
        lengths,
        targets
    } = useMemo(() => {
        const count = 400;
        const positions = new Float32Array(count * 6);
        const colors = new Float32Array(count * 6);
        const speeds = new Float32Array(count);
        const lengths = new Float32Array(count);
        const targets = new Float32Array(count * 6);
        const width = 3.6;
        const height = 2.1;
        const terminalZ = -25;
        const perimeter = 2 * (width + height);
        const baseColor = new Color("#a855f7");
        function pointOnRectangle(distance) {
            let d = distance % perimeter;
            if (d < width) {
                return [-width / 2 + d, height / 2];
            }
            d -= width;
            if (d < height) {
                return [width / 2, height / 2 - d];
            }
            d -= height;
            if (d < width) {
            return [width / 2 - d, -height / 2];
        }
        d -= width;
        return [-width / 2, -height / 2 + d];
        }
        for (let i = 0; i < count; i++) {
            const index = i * 6;
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.8 + Math.random() * 2.5;
            const z = -Math.random() * 25;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            positions[index] = x;
            positions[index + 1] = y;
            positions[index + 2] = z;
            positions[index + 3] = x;
            positions[index + 4] = y;
            positions[index + 5] = z - 0.1;
            speeds[i] = 0.7 + Math.random() * 0.6;
            lengths[i] = 0.6 + Math.random() * 0.8;
            const intensity = 0.5 + Math.random() * 1.5;
            const color = baseColor.clone()
                .multiplyScalar(intensity);
            colors[index] = color.r;
            colors[index + 1] = color.g;
            colors[index + 2] = color.b;
            colors[index + 3] = color.r * 0.15;
            colors[index + 4] = color.g * 0.15;
            colors[index + 5] = color.b * 0.15;
            const startDistance = (i / count) * perimeter;
            const endDistance = ((i + 1) / count) * perimeter;
            const [x1, y1] = pointOnRectangle(startDistance);
            const [x2, y2] = pointOnRectangle(endDistance);
            targets[index] = x1;
            targets[index + 1] = y1;
            targets[index + 2] = terminalZ;
            targets[index + 3] = x2;
            targets[index + 4] = y2;
            targets[index + 5] = terminalZ;
        }
        return {
            positions,
            colors,
            speeds,
            lengths,
            targets
        };
    }, []);
    useFrame((state, delta) => {
        if (!particlesRef.current) return;
        const attribute = particlesRef.current.geometry.attributes.position;
        const progress = progressRef.current;
        // Phase 1 : traversée du tunnel
        if (progress < 0.92) {
            const baseSpeed = 0.5 + progress * 7;
            const baseLength = 0.1 + progress * 1.8;
            particlesRef.current.rotation.z += delta * 0.01;
            for (let i = 0; i < speeds.length; i++) {
                const index = i * 2;
                let z = attribute.getZ(index);
                z += baseSpeed * speeds[i] * delta;
                if (z > state.camera.position.z - 1) {
                    z = state.camera.position.z - 25;
                }
                const length = baseLength * lengths[i];
                attribute.setZ(index, z);
                attribute.setZ(index + 1, z - length);
            }
            attribute.needsUpdate = true;
            return;
        }
        // Phase 2 : début de la convergence
        if (startPositionsRef.current === null) {
            startPositionsRef.current =
            new Float32Array(attribute.array);
            startRotationRef.current =
            particlesRef.current.rotation.z;
        }
        const duration = 0.65;
        transitionTimeRef.current = Math.min(
            transitionTimeRef.current + delta,
            duration
        );
        const t = transitionTimeRef.current / duration;
        // Interpolation fluide
        const eased = t * t * (3 - 2 * t);
        // Les particules se redressent progressivement
        particlesRef.current.rotation.z =
        startRotationRef.current * (1 - eased);
        const startPositions = startPositionsRef.current;
        for (let i = 0; i < positions.length; i++) {
            attribute.array[i] =
            startPositions[i] +
            (targets[i] - startPositions[i]) * eased;
        }
        // Fusion uniquement à la toute fin
        const fusionStart = 0.45;
        const fusion = Math.min(Math.max((t - fusionStart) / (1 - fusionStart), 0),1);
        if (materialRef.current) {
            materialRef.current.opacity = 0.9 * (1 - fusion);
        }
        attribute.needsUpdate = true;
    });
        return (
            <lineSegments ref={particlesRef}>
                <bufferGeometry>
                    <primitive
                        attach="attributes-position"
                        object={new BufferAttribute(positions, 3)}
                    />
                    <primitive
                        attach="attributes-color"
                        object={new BufferAttribute(colors, 3)}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    ref={materialRef}
                    vertexColors
                    transparent
                    opacity={0.9}
                    depthWrite={false}
                    toneMapped={false}
                />
            </lineSegments>
        );
}

function TerminalOutline({ progressRef }) {
    const lineRef = useRef();
    const materialRef = useRef();
    const opacityRef = useRef(0);
    const line = useMemo(() => {
        const width = 3.6;
        const height = 2.1;
        const z = -25;
        const geometry = new LineGeometry();
        geometry.setPositions([
            -width / 2, height / 2, z,
            width / 2, height / 2, z,
            width / 2, -height / 2, z,
            -width / 2, -height / 2, z,
            -width / 2, height / 2, z
        ]);
        const material = new LineMaterial({
            color: "#a855f7",
            linewidth: 4,
            worldUnits: false,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            toneMapped: false
        });
        return new Line2(geometry, material);
    }, []);
    const transitionTimeRef = useRef(0);
    useFrame((state, delta) => {
        if (progressRef.current < 0.92) return;
            const duration = 0.65;
            transitionTimeRef.current = Math.min(transitionTimeRef.current + delta, duration);
            const t = transitionTimeRef.current / duration;
            // Le contour apparaît pendant la fusion finale
            const fusionStart = 0.45;
            const fusion = Math.min(
            Math.max((t - fusionStart) / (1 - fusionStart), 0), 1);
            const eased = fusion * fusion * (3 - 2 * fusion);
            line.material.opacity = eased;
            line.material.resolution.set(
                state.size.width,
                state.size.height);
    });
    return <primitive object={line} />;
}

function Portal() {
    return (
        <section className="portal">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <PortalScene/>
            </Canvas>
        </section>
    )
}

export default Portal