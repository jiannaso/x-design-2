import { Canvas, useFrame } from "@react-three/fiber"
import "./App.css"
import { useCallback, useEffect, useRef } from "react"
import { OrbitControls, MeshWobbleMaterial, useHelper, Text} from '@react-three/drei'
import { DirectionalLightHelper } from "three"
import { useControls } from "leva"
import React, { useState } from 'react';
// import initData from './data/data1.json';
import initQuestions from './data/questions.json';
import axios from 'axios';
import {db} from './firebase';
import {uid} from 'uid';
import {set, ref, DataSnapshot, onValue, update} from 'firebase/database';
import Question from "./components/question";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import myFont from './fonts/fixed.json'
import { extend } from '@react-three/fiber'
extend({ TextGeometry })
import scrollText from "./assets/text.gif"
import { colorToRgba } from "@react-spring/shared"



const TorusKnotAvatar = ({ wobbleIntensity, thickness, color, posx, posy, posz, text }) => {
  const ref = useRef();
  console.log(posx);
  console.log(posy);
  // let pos = [posx, posy, 0]

   // Mapping the input values to the required ranges
   const mappedWobbleIntensity = 1 + (wobbleIntensity / 100) * 9; // Maps 0-100 to 1-10
   const mappedThickness = 0.1 + (thickness / 100) * 0.6; // Maps 0-100 to 0.1-0.7

   useFrame(() => {
    // posx+=.01*(Math.random()-.5);
    // posy+=.01*(Math.random()-.5);
    // ref.current.rotation.x += 0.01;
    // ref.current.rotation.y += 0.01;
    ref.current.position.set(posx, posy, posz);
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[.25, mappedThickness, 2000, 20]} />
      <MeshWobbleMaterial factor={mappedWobbleIntensity} color={color} speed={2} opacity={0.8} transparent={false}/>
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
      <MeshWobbleMaterial factor={mappedWobbleIntensity} color={color} speed={1} opacity={0.8} transparent={false}/>
      <Label posx={posx} posy={posy} posz={posz}  text = {text} color ={color}/>
    </mesh>
  );


}

const Label = ({posx, posy, posz, text, color}) => {
  const offset = .75
  const font = new FontLoader().parse(myFont);
  console.log('color' + color);
  const colorInput = 'hsl(' + color * 360 / 100 + ', 100%, 100%)'
  return (
    <mesh position={[offset, offset,0]}>
    <textGeometry args={[text, {font, size:.2, height: .05}]}/>
    <meshLambertMaterial attach='material' color={"black"}/>    
    </mesh>
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
          <MeshWobbleMaterial factor={mappedWobbleIntensity} color={color} speed={2} opacity={.8} transparent={false} />
          <Label posx={posx} posy={posy} posz={posz}  text = {text} color ={color}/>
        </mesh>

        <mesh ref={ref2}>
          <sphereGeometry args={[mappedThickness/2, 32, 20]} />
          {/* <TorusGeometry args={[mappedThickness, mappedThickness, mappedThickness, 10]} /> */}
          <MeshWobbleMaterial factor={mappedWobbleIntensity} color={color} speed={2} opacity={.8} transparent={false} />
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
      <directionalLight position={[0, 0, 10]} intensity ={.1} ref={directionalLightRef} color = {"white"}/>      <directionalLight position={[0, 0, 2]} intensity ={3} ref={directionalLightRef} color = {"white"}/>
      <directionalLight position={[0, 10, 0]} intensity ={.1} ref={directionalLightRef} color = {"white"}/>
      <directionalLight position={[10, 0, 0]} intensity ={.1} ref={directionalLightRef} color = {"white"}/>

      <ambientLight intensity={0.4} />

      {avatars.map((avatar, index) => (
                <mesh
                key={index}
                >
                  {avatar.section > 0 ? <TorusKnotAvatar wobbleIntensity={avatar.wobbleIntensity} thickness={avatar.thickness} color={avatar.color} posx={avatar.posx}  posy={avatar.posy} posz={avatar.posz} text = {avatar.text} /> : null }
                  {/* {avatar.section == 2 ? <SphereAvatar wobbleIntensity={avatar.wobbleIntensity} thickness={avatar.thickness} color={avatar.color} posx={avatar.posx}  posy={avatar.posy} posz={avatar.posz} text = {avatar.text} /> : null }
                  {avatar.section == 3 ? <CubeAvatar wobbleIntensity={avatar.wobbleIntensity} thickness={avatar.thickness} color={avatar.color} posx={avatar.posx}  posy={avatar.posy} posz={avatar.posz} text = {avatar.text} /> : null } */}

                  {/* <TorusKnotAvatar wobbleIntensity={avatar.wobbleIntensity} thickness={avatar.thickness} color={avatar.color} posx={avatar.posx}  posy={avatar.posy} posz={avatar.posz}/> */}
                </mesh>
            ))}

      <OrbitControls enableZoom = {true} autoRotate={false} autoRotateSpeed={.5}/>
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
    const [questionsVisible, setQuestionsVisible] = useState(false);
    const [newAvatar, setNewAvatar] = useState({});
    const [canvasVisible, setCanvasVisible] = useState(false);
    const [avatarVisible, setAvatarVisible] = useState(false);
    const [text, setText] = useState("");
    const [landingVisible, setLandingVisible] = useState(true);
    const [questions, setQuestions] = useState(initQuestions);
    const [cohesion, setCohesion] = useState(false);
    const [collab, setCollab] = useState(false);
    const [coexist, setCoexist] = useState(false);
    const [nickname, setNickname] = useState(false);
    
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

  const updateSection = (value) => {
    setSection(value);
    console.log("section" + value);
  }

  const updateWobble = (value) => {
    setWobbleIntensity(value);
    console.log("wobble" + value);
  }

  const updateThickness = (value) => {
    setThickness(value);
    console.log("thickness" + value);
  }

  const updateColor = (value) => {
    setColor(value);
    console.log("color" + value);
  }

  const writeDb = () => {
    const uuid = uid();
    set(ref(db, `avatars/` + `/${uuid}`), {
      wobbleIntensity,
      thickness,
      color: color * 256 / 100,
      section,
      posx: (Math.random()-.5)*10,
      posy: (Math.random()-.5)*10,
      posz: (Math.random()-.5)*10,
      text: text
    });
  }
  
  return (
  <div style={{ width: "100vw", height: "100vh" }}>

    {/* SCREEN1: landing */}

    {landingVisible == true ?
    <div class = "background">
    
    <div class="centered">
    <div class="scroll">
    <img class="image" src={scrollText}/>
      </div> 
      <div class="landing"> 
        <h1 class="bigTitle"> Hi CO designer </h1> 
        {/* <h1>Welcome to Harvard x Design </h1> */}
        <h2> Create a community garden with Harvard x Design</h2>
        <h2> </h2>
        <button onClick={() => {
          setLandingVisible(false);
          setCohesion(true);
        }}
          > Get planting </button>
      </div>
      <div class="scroll">
    <img class="image" src={scrollText}/>
      </div> 
    </div>
    
    </div>
    : null
    }


    {/* SCREEN2: all questions */}
    {cohesion == true ?
    <div style ={{display: "flex", flexDirection: "column"} }>
      <Question question={questions[0]} setVal={updateSection}></Question>
      <Question question={questions[1]} setVal={updateWobble}></Question>
      <button class="nextQuestion" onClick={() => {
        setCollab(true);
        setCohesion(false)
      }}> next </button> 
      </div>
        :
      null
    }

    {collab == true ?
    <div style ={{display: "flex", flexDirection: "column"} }>
      <Question question={questions[2]} setVal={updateSection}></Question>
      <Question question={questions[3]} setVal={updateWobble}></Question>
      <button class="nextQuestion" onClick={() => {
        setCoexist(true);
        setCollab(false);
      }}> next </button> 
      </div>
        :
      null
    }

    {coexist == true ?
      <div style ={{display: "flex", flexDirection: "column"} }>
        <Question question={questions[4]} setVal={updateSection}></Question>
        <Question question={questions[5]} setVal={updateWobble}></Question>
        <button class="nextQuestion" onClick={() => {
          setNickname(true);
          setCoexist(false);
        }}> next </button> 
        </div>
          :
        null
      }

{nickname == true ?
<div class = "question">
      <div style ={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"} }>
        <h1 class = "sectionText"> Community</h1>
    <h2>How can we refer to you by?</h2>
    <h3>Remember this will be visible for everyone at the conference</h3>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
        <button class="nextQuestion" onClick={() => {
        setNewAvatar({section: section, wobbleIntensity: wobbleIntensity, thickness: thickness, color: color, posx: 0, posy:0, posz: 0, text: text});
        // JSON.stringify(avatars);
        setNickname(false);
        setAvatarVisible(true);
        writeDb();
      }}> generate</button>
        </div>
        </div>
          :
        null
      }
        
  {/* SCREEN3: solo avatar */}
   { avatarVisible == true ?
   <div>
   
   <div style ={{display: "flex"}}>
   <Canvas style={{ background: "white", width: "100vw", height: "100vh"}} camera={{ position: [-5, 12, 13], fov: 10}}>
       <directionalLight position={[0, 0, 2]} intensity ={3} color = {"white"}/>
         <ambientLight intensity={0.4} />
         {/* <OrbitControls /> */}
         <TorusKnotAvatar wobbleIntensity={newAvatar.wobbleIntensity} thickness={newAvatar.thickness} color={newAvatar.color} posx={newAvatar.posx}  posy={newAvatar.posy} posz={newAvatar.posz} text = {newAvatar.text} />
         {/* {newAvatar.section == 2 ? <SphereAvatar wobbleIntensity={newAvatar.wobbleIntensity} thickness={newAvatar.thickness} color={newAvatar.color} posx={newAvatar.posx}  posy={newAvatar.posy} posz={newAvatar.posz} text = {newAvatar.text}/> : null}
         {newAvatar.section == 3 ? <CubeAvatar wobbleIntensity={newAvatar.wobbleIntensity} thickness={newAvatar.thickness} color={newAvatar.color} posx={newAvatar.posx}  posy={newAvatar.posy} posz={newAvatar.posz} text = {newAvatar.text}/> : null} */}
         <OrbitControls enableZoom = {true}/>
       </Canvas>
       
     </div>
     <button class="floating" onClick={() => {
       // console.log(wobbleIntensity);
       setQuestionsVisible(false);
       setCanvasVisible(true);
       setAvatarVisible(false);
     }}> see all </button>
    </div>
    : null}

    {/* SCREEN4: all avatars*/}
    {canvasVisible == true ? 
    <div>
    
      <div style ={{display: "flex"}}>
          <Canvas style={{ background: "white", width: "100vw", height: "100vh"}} camera={{ position: [-5, 12, 13], fov: 50}}>
            <Scene avatars={avatars} section={0}/>
          </Canvas>
        </div>
        <button class="floating" onClick={() => {
        setQuestionsVisible(false);
        setLandingVisible(true);
        setCanvasVisible(false)
        setAvatarVisible(false);
      }}> again </button>
    
    </div>
    : null
    }
  </div>
  );

}

export default App;


