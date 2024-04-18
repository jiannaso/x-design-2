import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { DirectionalLightHelper } from 'three';
import Stipe from './Stipe.jsx'; 
// import './App.css'; 
import FlowerLeaves from './FlowerLeaves.jsx';
import FlowerCap from './FlowerCap.jsx';
import Blob from './Blob.jsx';
import { ElevationProvider } from './ElevationContext.jsx';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import myFont from '../fonts/fixed.json'



const Scene = () => {

  const directionalLightRef = useRef(null);
//   const { lightColor, lightIntensity } = useControls({
//     lightColor: "white",
//     lightIntensity: {
//     value: 0.5,
//     min: 0,
//     max: 70,
//     step: 0.4,
//     }
//   });

 
  useEffect(() => {
    if (directionalLightRef.current) {
      const helper = new DirectionalLightHelper(directionalLightRef.current, 0.5, "white");
      directionalLightRef.current.parent.add(helper);
      return () => directionalLightRef.current.parent.remove(helper);
    }
  }); 
  return (
    <>
      <directionalLight position={[6, 18, 2]} intensity={0.5} ref={directionalLightRef} color={"white"}/>
      <ambientLight intensity={0.5}/>
    </>
  );
};

// const RotatingGroup = () => {
//   const groupRef = useRef();
//   useFrame(() => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += 0.001; 
//       groupRef.current.rotation.x += 0.001; 
//     }
//   });

const RotatingGroup = ({text, zero, one, two, three, four, five, six, seven, eight}) => {
  const groupRef = useRef();

  useEffect(() => {
    if (groupRef.current) {
    //   groupRef.current.rotation.x += Math.PI / 6; 
    }
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += -0.003;  
    }
  });

//   const {v0,v1,v2,v3,v4,v5,v6,v7,v8} = useControls({
//     // color: '#ffffff',
//     v0: {
//       value: 5,
//       min: 0,
//       max: 20,
//       step: 1,
//     },
//     v1: {
//       value: 50,
//       min: 0,
//       max: 100,
//       step: 1,
//     },
//     v2: {
//       value: 10,
//       min: 0,
//       max: 100,
//       step: 1,
//     },

//     v3: {
//       value: 50,
//       min: 0,
//       max: 100,
//       step: 1,
//     },
//     v4: {
//       value: 5,
//       min: 0,
//       max: 15,
//       step: 1,
//     },
//     v5: {
//       value: 50,
//       min: 0,
//       max: 100,
//       step: 1,
//     },
//     v6: {
//       value: 50,
//       min: 0,
//       max: 100,
//       step: 1,
//     },
//     v7: {
//       value: 50,
//       min: 0,
//       max: 100,
//       step: 1,
//     },
//     v8: {
//       value: 50,
//       min: 0,
//       max: 100,
//       step: 1,
//     },
//   });

  const Label = ({posx, posy, posz, text}) => {
    const offset = .75;
    const font = new FontLoader().parse(myFont);
    // console.log('color' + color);

    return (
      <mesh position={[posx+offset, posy+offset,posz]}>
      <textGeometry args={[text, {font, size:.5, depth: .05}]}/>
      <meshLambertMaterial attach='material' color={"black"}/>    
      </mesh>
    )
  }

  return (
    <group ref={groupRef}>
      <Scene />
      <Label posx={2} posy={6} posz={0} text={text}/>
      <Stipe noise={seven} base={eight}/>
      <FlowerLeaves numLeaves={four} bevelSize={five} bevelThickness={six}/>
      <FlowerCap numPetals={zero} petalRotation={one} bevelThickness={two} bevelSize={three}/> 
      <Blob />
    </group>
  );
};

const Flower = ({text, zero, one, two, three, four, five, six, seven, eight}) => {
  

  return (
    <ElevationProvider>
    <div className="App" >
      <div className = "CanvasContainer">
      <Canvas style={{ background: "white", width: "100vw", height: "100vh"}} camera={{ position: [-5, 12, 13], fov: 50}}>
        <ambientLight intensity={0.2}/>
        <directionalLight position={[.5,.5,.5]} intensity={20} color={"pink"}/>
        <RotatingGroup text={text} zero={zero} one={one} two={two} three={three} four={four} five={five} six={six} seven={seven} eight={eight}/>
        {/* <OrbitControls/> */}
      </Canvas>
      </div>
    </div>
    </ElevationProvider>
  );
}

export default Flower;