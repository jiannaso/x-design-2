import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import vertexShader from '../shaders/vertexShader.glsl';
import fragmentShader from '../shaders/fragmentShader.glsl';
import { MathUtils } from 'three';
import { useElevation } from './ElevationContext';



const Blob = ({posx=0, posy=0, posz=0}) => {
  const mesh = useRef();
  const hover = useRef(false);

  const { elevation } = useElevation(); 

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.1,
      },
      u_time: {
        value: 0.1,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
    mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
    mesh.current.material.uniforms.u_intensity.value,
    hover.current ? 0.85 : 0.15,
    0.02
    );
  });



  return (
    <mesh
      ref={mesh}
      position={[posx,elevation+1,posz]}  
    >
      <icosahedronGeometry args={[1, 20]}  />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

export default Blob;
