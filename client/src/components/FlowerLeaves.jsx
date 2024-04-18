import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Leaf = ({ position, rotation, bevelSize, bevelThickness }) => {
    const leafShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.25, 0.25, 0.25, 0.75, 0, 1);
        shape.bezierCurveTo(-0.25, 0.75, -0.25, 0.25, 0, 0);
        return shape;
    }, []);

    const extrudeSettings = {
        steps: 2, 
        depth: 0.2,
        bevelEnabled: true,
        bevelThickness: 0.4 + bevelThickness * .8 / 100,
        bevelSize: 0.3 + bevelSize * .6/ 100,
        bevelOffset: 0.1,
        bevelSegments: 30
    };

    const leafGeometry = useMemo(() => new THREE.ExtrudeGeometry(leafShape, extrudeSettings), [leafShape, extrudeSettings]);
    const leafMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: 'green',
        side: THREE.DoubleSide,
    }), []);

    const leafRef = useRef();

    useFrame(() => {
        if (leafRef.current) {
            leafRef.current.rotation.y += 0.02; // Adjust rotation speed as needed
        }
    });

    return (
        <mesh ref={leafRef} position={position} rotation={rotation} geometry={leafGeometry} material={leafMaterial} />
    );
};

const FlowerLeaves = ({ posx=0, posy=0, posz=0, numLeaves = 12, bevelSize=0.3, bevelThickness=0.3}) => {
    const leaves = useMemo(() => {
        return Array.from({ length: numLeaves }, (_, i) => {
            const angle = (i / numLeaves) * Math.PI * 2;
            const x = Math.cos(angle) * 1.2; // Slightly outside the petal circle
            const z = Math.sin(angle) * 1.2;
            const rotation = [Math.PI / 1, angle, 3 + bevelSize / 100]; // Adjust rotation to face upwards
            return <Leaf key={i} position={[x + posx, 0.4, z + posz]} rotation={rotation} bevelSize={bevelSize} bevelThickness={bevelThickness}/>;
        });
    }, [numLeaves]);

    return <>{leaves}</>;
};

export default FlowerLeaves;
// DONE bevelsize - 0.3 to 0.9
// DONE bevelThickness - 0.1 to 0.9
// DONE const rotation 4th parameter can be mapped to only two numbers 3 and 4. it can be linked with bevelsize i think!
// DONE numpetals 1 to 15 :')
