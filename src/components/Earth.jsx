import React, { useRef, useLayoutEffect } from 'react';
import { Sphere, useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Earth = React.forwardRef((props, ref) => {
    const gl = useThree((state) => state.gl);
    const defaultRef = useRef();
    const earthGroup = ref || defaultRef;

    const [colorMap, cloudsMap, normalMap, detailMap] = useTexture([
        '/textures/earth_8k_day.jpg?v=3',
        '/textures/earth_8k_clouds.jpg?v=3',
        '/textures/earth_normal_map.png?v=2',
        '/textures/detail_noise_texture.png?v=2'
    ]);

    useLayoutEffect(() => {
        if (gl.capabilities.getMaxAnisotropy) {
            const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
            colorMap.anisotropy = maxAnisotropy;
            cloudsMap.anisotropy = maxAnisotropy;
            detailMap.anisotropy = maxAnisotropy;
        }
        // Tile the detail map for high-frequency detail when zoomed in
        detailMap.wrapS = detailMap.wrapT = THREE.RepeatWrapping;
        detailMap.repeat.set(500, 500);
    }, [colorMap, cloudsMap, detailMap, gl]);

    return (
        <group ref={earthGroup} {...props}>
            {/* Core Earth Sphere - Rotated for Calibration (Longitude only) */}
            <group rotation={[0, -Math.PI / 2, 0]}>
                <Sphere args={[1, 256, 256]}>
                    <meshStandardMaterial
                        map={colorMap}
                        normalMap={normalMap}
                        normalScale={[0.2, 0.2]}
                        roughness={0.5}
                        metalness={0.2}
                        bumpMap={detailMap}
                        bumpScale={0.02}
                    />
                </Sphere>

                {/* Atmosphere/Clouds */}
                <Sphere args={[1.01, 256, 256]}>
                    <meshStandardMaterial
                        map={cloudsMap}
                        transparent
                        opacity={0.4}
                        depthWrite={false}
                        side={2} // DoubleSide
                    />
                </Sphere>

                {/* Atmosphere Glow (Fresnel Shader) */}
                <mesh scale={[1.02, 1.02, 1.02]}>
                    <sphereGeometry args={[1, 256, 256]} />
                    <shaderMaterial
                        transparent
                        depthWrite={false}
                        side={THREE.BackSide}
                        blending={THREE.AdditiveBlending}
                        uniforms={{
                            color: { value: new THREE.Color('#4db5ff') },
                            coefficient: { value: 0.1 },
                            power: { value: 4.0 },
                        }}
                        vertexShader={`
                            varying vec3 vNormal;
                            void main() {
                                vNormal = normalize(normalMatrix * normal);
                                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                            }
                        `}
                        fragmentShader={`
                            uniform vec3 color;
                            uniform float coefficient;
                            uniform float power;
                            varying vec3 vNormal;
                            void main() {
                                float intensity = pow(coefficient - dot(vNormal, vec3(0.0, 0.0, 1.0)), power);
                                gl_FragColor = vec4(color, intensity);
                            }
                        `}
                    />
                </mesh>
            </group>

            {/* Markers are children of the group, not the rotated sphere */}
            {props.children}
        </group>
    );
});

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

// Helper to calculate 3D position from Lat/Lon
function getPositionFromLatLon(lat, lon, radius = 1) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));

    return [x, y, z];
}
