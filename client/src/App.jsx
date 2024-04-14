import { Canvas, useFrame } from "@react-three/fiber"
import "./App.css"
import { useCallback, useEffect, useRef } from "react"
import { OrbitControls, MeshWobbleMaterial, useHelper, Text} from '@react-three/drei'
import { DirectionalLightHelper } from "three"
import { useControls } from "leva"
import React, { useState } from 'react';
// import initData from './data/data1.json';
import axios from 'axios';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref, DataSnapshot, onValue} from 'firebase/database';

const TorusKnotAvatar = ({ wobbleIntensity, thickness, color, posx, posy, posz, text }) => {
  const ref = useRef();
  console.log(posx);
  console.log(posy);
  // let pos = [posx, posy, 0]

   // Mapping the input values to the required ranges
   const mappedWobbleIntensity = 1 + (wobbleIntensity / 100) * 9; // Maps 0-100 to 1-10
   const mappedThickness = 0.1 + (thickness / 100) * 0.6; // Maps 0-100 to 0.1-0.7

   useFrame(() => {
    // posx+=.01*Math.random();
    // posy+=.01*Math.random();
    // ref.current.rotation.x += 0.01;
    // ref.current.rotation.y += 0.01;
    ref.current.position.set(posx, posy, posz);
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[.25, mappedThickness, 2000, 20]} />
      <MeshWobbleMaterial factor={mappedWobbleIntensity} color={color} speed={2} opacity={0.8} transparent={true}/>
      <Label posx={posx} posy={posy} posz={posz}  text = {text} color ={color}/>
    </mesh>
  );


}

const SphereAvatar = ({ wobbleIntensity, thickness, color, posx, posy, posz, text }) => {
  const ref = useRef();
  console.log(posx);
  console.log(posy);
  // let pos = [posx, posy, 0]

   // Mapping the input values to the required ranges
   const mappedWobbleIntensity = 1 + (wobbleIntensity / 100) * 9; // Maps 0-100 to 1-10
   const mappedThickness = 0.1 + (thickness / 100) * 0.6; // Maps 0-100 to 0.1-0.7

   useFrame(() => {
  //   // posx+=.01*Math.random();
  //   // posy+=.01*Math.random();
  //   // ref.current.rotation.x += 0.01;
  //   // ref.current.rotation.y += 0.01;
    ref.current.position.set(posx, posy, posz);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[mappedThickness, mappedThickness/2, 10, 100]} />
      <MeshWobbleMaterial factor={mappedWobbleIntensity} color={color} speed={1} opacity={0.8} transparent={true}/>
      <Label posx={posx} posy={posy} posz={posz}  text = {text} color ={color}/>
    </mesh>
  );


}

const Label = ({posx, posy, posz, text, color}) => {
  const offset = .75
  return (
    <Text position={[offset,offset,0]} fontSize={.2} color={color}>
    {text}
    </Text>
  )
}

const CubeAvatar = ({ wobbleIntensity, thickness, color, posx, posy, posz, text }) => {
  const ref = useRef();
  console.log(posx);
  console.log(posy);
  // let pos = [posx, posy, 0]

   // Mapping the input values to the required ranges
   const mappedWobbleIntensity = 1 + (wobbleIntensity / 100) * 9; // Maps 0-100 to 1-10
   const mappedThickness = 0.1 + (thickness / 100); // Maps 0-100 to 0.1-0.7

   useFrame(() => {
    // posx+=.01*Math.random();
    // posy+=.01*Math.random();
    // ref.current.rotation.x += 0.01;
    // ref.current.rotation.y += 0.01;
    ref.current.position.set(posx, posy-.5, posz);
  });

  const ref2 = useRef();
  console.log(posx);
  console.log(posy);
  // let pos = [posx, posy, 0]

   // Mapping the input values to the required ranges

   useFrame(() => {
    // posx+=.01*Math.random();
    // posy+=.01*Math.random();
    // ref.current.rotation.x += 0.01;
    // ref.current.rotation.y += 0.01;
    ref2.current.position.set(posx, posy, posz);
  });

  return (
    <>
        <mesh ref={ref}>
          <boxGeometry args={[mappedThickness, mappedThickness, mappedThickness]} />
          {/* <TorusGeometry args={[mappedThickness, mappedThickness, mappedThickness, 10]} /> */}
          <MeshWobbleMaterial factor={mappedWobbleIntensity} color={color} speed={2} opacity={.8} transparent={true} />
          <Label posx={posx} posy={posy} posz={posz}  text = {text} color ={color}/>
        </mesh>

        <mesh ref={ref2}>
          <sphereGeometry args={[mappedThickness/2, 32, 20]} />
          {/* <TorusGeometry args={[mappedThickness, mappedThickness, mappedThickness, 10]} /> */}
          <MeshWobbleMaterial factor={mappedWobbleIntensity} color={color} speed={2} opacity={.8} transparent={true} />
        </mesh>

        
       
    </>
  );


}

const Scene = ({avatars, section}) => {

  console.log(avatars);

  
  if(avatars.length > 1) {
    for(var i=0; i<avatars.length; i++) {
      console.log(section);
      console.log(avatars[i].section);
      console.log((avatars[i].section) == 1);
      console.log((avatars[i].section) == 2);
      console.log((avatars[i].section) == 3);
      console.log((avatars[i].section) == section);
    };
    
  };

  const directionalLightRef = useRef()

  return (
    <>
      {/* <directionalLight position={[0, 0, 2]} intensity ={lightIntensity} ref={directionalLightRef} color = {lightColor}/> */}
      <directionalLight position={[0, 0, 2]} intensity ={.1} ref={directionalLightRef} color = {"white"}/>      <directionalLight position={[0, 0, 2]} intensity ={3} ref={directionalLightRef} color = {"white"}/>
      <directionalLight position={[0, 2, 0]} intensity ={.1} ref={directionalLightRef} color = {"white"}/>
      <directionalLight position={[2, 0, 0]} intensity ={.1} ref={directionalLightRef} color = {"white"}/>

      <ambientLight intensity={0.4} />

      {avatars.map((avatar, index) => (
                <mesh
                key={index}
                >
                  {(avatar.section == 1 && section == 1) || (avatar.section == 1 && section == 0) ? <TorusKnotAvatar wobbleIntensity={avatar.wobbleIntensity} thickness={avatar.thickness} color={avatar.color} posx={avatar.posx}  posy={avatar.posy} posz={avatar.posz} text = {avatar.text} /> : null }
                  {(avatar.section == 2 && section == 2) || (avatar.section == 1 && section == 0) ? <SphereAvatar wobbleIntensity={avatar.wobbleIntensity} thickness={avatar.thickness} color={avatar.color} posx={avatar.posx}  posy={avatar.posy} posz={avatar.posz} text = {avatar.text} /> : null }
                  {(avatar.section == 3 && section == 3) || (avatar.section == 1 && section == 0)? <CubeAvatar wobbleIntensity={avatar.wobbleIntensity} thickness={avatar.thickness} color={avatar.color} posx={avatar.posx}  posy={avatar.posy} posz={avatar.posz} text = {avatar.text} /> : null }

                  {/* <TorusKnotAvatar wobbleIntensity={avatar.wobbleIntensity} thickness={avatar.thickness} color={avatar.color} posx={avatar.posx}  posy={avatar.posy} posz={avatar.posz}/> */}
                </mesh>
            ))}

      <OrbitControls enableZoom = {true} autoRotate={false} autoRotateSpeed={1}/>
      </>
  )
}



const App = ()  => {

    // just a default state for the TorusKnotAvatar controls
    const [wobbleIntensity, setWobbleIntensity] = useState(50);
    const [thickness, setThickness] = useState(50);
    const [color, setColor] = useState("#ff00ff");
    const [section, setSection] = useState(1);
    const [avatars, setAvatars] = useState([]);
    const [questionsVisible, setQuestionsVisible] = useState(true);
    const [newAvatar, setNewAvatar] = useState({});
    const [canvasVisible, setCanvasVisible] = useState(false);
    const [avatarVisible, setAvatarVisible] = useState(false);


    const sliderStyle = {
    width: '200px', 
    margin: '10px 0', //vertical spacing
  };



  useEffect(() => {
    onValue(ref(db, `avatars/`), DataSnapshot => {
      const data = DataSnapshot.val();
      if(data !== null) {
        console.log(Object.values(data));
        let objects = Object.values(data);
        console.log(objects[0]);
        if(objects.length > avatars.length) {
          setAvatars(Object.values(data));
        }
      }
    })
  }, [avatars]);

  const writeDb = () => {
    const uuid = uid();
    set(ref(db, `avatars/` + `/${uuid}`), {
      wobbleIntensity,
      thickness,
      color,
      section,
      posx: (Math.random()-.5)*10,
      posy: (Math.random()-.5)*10,
      posz: (Math.random()-.5)*10,
      text: "hello"
    });
  }
  
  return (
  <div style={{ width: "100vw", height: "100vh" }}>
    {questionsVisible == true ?
    <div style ={{display: "flex", flexDirection: "column"} }>

  <div>

    <label>Section {section}</label>
      <input
        type="range"
        min="1"
        max="3"
        value={section}
        onChange={(e) => setSection(e.target.value)}
        style={sliderStyle}
      />
      </div>

      <div>
      <label>Wobble Intensity: {wobbleIntensity}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={wobbleIntensity}
        onChange={(e) => setWobbleIntensity(e.target.value)}
        style={sliderStyle}
      />
      </div>

      <div>
      <label>Thickness: {thickness}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={thickness}
        onChange={(e) => setThickness(e.target.value)}
      />
      </div>

      <div>
      <label>Color:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      </div>

      <div>
      <button onClick={() => {
        setNewAvatar({section: section, wobbleIntensity: wobbleIntensity, thickness: thickness, color: color, posx: 0, posy:0, posz: 0, text: 'hello'});
        JSON.stringify(avatars);
        setQuestionsVisible(false);
        setAvatarVisible(true);
        setCanvasVisible(false);
        writeDb();
      }}> generate</button>
      </div>
        
      </div>

    
    : 
    null
  }



  {canvasVisible == true ? 
  <div>
  <button onClick={() => {
      // console.log(wobbleIntensity);
      setQuestionsVisible(true)
      setCanvasVisible(false)
      setAvatarVisible(false);
    }}> again </button>
    <div style ={{display: "flex"}}>
        <Canvas style={{ background: "black", width: "100vw", height: "100vh"}} camera={{ position: [-5, 12, 13], fov: 50}}>
          <Scene avatars={avatars} section={1}/>
        </Canvas>
      </div>
  
  </div>
  : null
   }

   { avatarVisible == true ?
   <div>
   <button onClick={() => {
       // console.log(wobbleIntensity);
       setQuestionsVisible(false);
       setCanvasVisible(true);
       setAvatarVisible(false);
     }}> see all </button>
   <div style ={{display: "flex"}}>
   <Canvas style={{ background: "black", width: "100vw", height: "100vh"}} camera={{ position: [-5, 12, 13], fov: 10}}>
       <directionalLight position={[0, 0, 2]} intensity ={3} color = {"white"}/>
         <ambientLight intensity={0.4} />
         {/* <OrbitControls /> */}
         {newAvatar.section == 1 ? <TorusKnotAvatar wobbleIntensity={newAvatar.wobbleIntensity} thickness={newAvatar.thickness} color={newAvatar.color} posx={newAvatar.posx}  posy={newAvatar.posy} posz={newAvatar.posz} text = {newAvatar.text} /> : null}
         {newAvatar.section == 2 ? <SphereAvatar wobbleIntensity={newAvatar.wobbleIntensity} thickness={newAvatar.thickness} color={newAvatar.color} posx={newAvatar.posx}  posy={newAvatar.posy} posz={newAvatar.posz} text = {newAvatar.text}/> : null}
         {newAvatar.section == 3 ? <CubeAvatar wobbleIntensity={newAvatar.wobbleIntensity} thickness={newAvatar.thickness} color={newAvatar.color} posx={newAvatar.posx}  posy={newAvatar.posy} posz={newAvatar.posz} text = {newAvatar.text}/> : null}
 
       </Canvas>
     </div>
    </div>
    : null}
  </div>
  );

}

export default App;


