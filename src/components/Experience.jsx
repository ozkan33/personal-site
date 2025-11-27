import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Stars, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { Earth } from './Earth';
import { Overlay } from './Overlay';

// Helper to calculate 3D position from Lat/Lon
function getPositionFromLatLon(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));

    return [x, y, z];
}

function Marker({ lat, lon, color = 'red' }) {
    const position = getPositionFromLatLon(lat, lon, 1.005); // Closer to surface
    return (
        <mesh position={position} lookAt={() => new THREE.Vector3(0, 0, 0)}>
            <ringGeometry args={[0.02, 0.03, 32]} />
            <meshBasicMaterial color={color} side={THREE.DoubleSide} toneMapped={false} />
            <pointLight color={color} intensity={1} distance={0.2} />
        </mesh>
    );
}

function SceneController({ earthRef }) {
    const scroll = useScroll();

    // Helper to get quaternion for a target lat/lon
    const getTargetQuaternion = (lat, lon) => {
        const pos = getPositionFromLatLon(lat, lon, 1);
        const targetVec = new THREE.Vector3(pos[0], pos[1], pos[2]).normalize();
        const cameraVec = new THREE.Vector3(0, 0, 1); // Camera is at +Z
        const q = new THREE.Quaternion();
        q.setFromUnitVectors(targetVec, cameraVec);
        return q;
    };

    const spaceQuat = new THREE.Quaternion(); // Identity (0,0,0)
    const izmirQuat = getTargetQuaternion(38.42, 27.14);
    const minneapolisQuat = getTargetQuaternion(44.97, -93.26);

    useFrame((state, delta) => {
        const offset = scroll.offset;
        let dist = 5;
        const currentQuat = new THREE.Quaternion();

        if (offset < 0.5) {
            // Transition 0 -> 0.5 (Space -> Izmir)
            const t = offset * 2;
            const ease = 1 - Math.pow(1 - t, 3);

            currentQuat.slerpQuaternions(spaceQuat, izmirQuat, ease);
            dist = THREE.MathUtils.lerp(5, 2.5, ease); // Stop at 2.5 to maintain quality
        } else {
            // Transition 0.5 -> 1 (Izmir -> Minneapolis)
            const t = (offset - 0.5) * 2;
            const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

            currentQuat.slerpQuaternions(izmirQuat, minneapolisQuat, ease);
            dist = THREE.MathUtils.lerp(2.5, 2.5, ease);
        }

        if (earthRef.current) {
            // Smoothly interpolate current rotation to target quaternion
            earthRef.current.quaternion.slerp(currentQuat, 4 * delta);
        }

        state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, dist, 4, delta);
    });

    return null;
}

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <mesh><boxGeometry /><meshBasicMaterial color="red" /></mesh>;
        }

        return this.props.children;
    }
}

export function Experience() {
    const earthRef = useRef();

    return (
        <Canvas dpr={2} camera={{ position: [0, 0, 5], fov: 45 }}>
            <color attach="background" args={['#050505']} />
            <ambientLight intensity={0.5} />
            <hemisphereLight skyColor="#ffffff" groundColor="#000000" intensity={0.5} />
            <directionalLight position={[5, 3, 5]} intensity={4.0} castShadow />
            <spotLight position={[-5, 5, 5]} intensity={2} angle={0.5} penumbra={1} color="#4db5ff" />
            {/* <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4db5ff" /> */}

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <React.Suspense fallback={null}>
                <ScrollControls pages={3} damping={0.25}>
                    <SceneController earthRef={earthRef} />
                    <ErrorBoundary>
                        <Earth ref={earthRef} position={[0, 0, 0]}>
                            <Marker lat={38.42} lon={27.14} color="#00ff00" />
                            <Marker lat={44.97} lon={-93.26} color="#00ff00" />
                        </Earth>
                    </ErrorBoundary>
                    <Overlay />
                </ScrollControls>
            </React.Suspense>
        </Canvas>
    );
}
