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
import Flower from "./components/flower"
import Garden from "./components/garden"
import Grid from "./components/grid"

const App = ()  => {

    // just a default state for the TorusKnotAvatar controls
    const [zero, setZero] = useState(10);
    const [one, setOne] = useState(10);
    const [two, setTwo] = useState(10);
    const [three, setThree] = useState(10);
    const [four, setFour] = useState(10);
    const [five, setFive] = useState(10);
    const [six, setSix] = useState(10);
    const [seven, setSeven] = useState(10);
    const [eight, setEight] = useState(10);


    const [avatars, setAvatars] = useState([]);


    const [questionsVisible, setQuestionsVisible] = useState(false);
    const [newAvatar, setNewAvatar] = useState(
    {three: 50, one: 50, zero: 50, two: 50, posx: 0, posy:0, posz: 0, text: "text"});
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
          objects.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
          });
          setAvatars(objects);
        }
      }
    })
  }, [avatars]);

  

  const updateZero = (value) => {
    setZero(value);
    console.log("zero" + value);
  }

  const updateOne = (value) => {
    setOne(value);
    console.log("one" + value);
  }

  const updateTwo = (value) => {
    setTwo(value);
    console.log("two" + value);
  }

  const updateThree = (value) => {
    setThree(value);
    console.log("three" + value);
  }

  const updateFour = (value) => {
    setFour(value);
    console.log("four" + value);
  }

  const updateFive = (value) => {
    setFive(value);
    console.log("five" + value);
  }

  const updateSix = (value) => {
    setSix(value);
    console.log("six" + value);
  }

  const updateSeven = (value) => {
    setSeven(value);
    console.log("seven" + value);
  }

  const updateEight = (value) => {
    setEight(value);
    console.log("eight" + value);
  }

  
  const writeDb = () => {
    const uuid = uid();
    set(ref(db, `avatars/` + `/${uuid}`), {
      one,
      zero,
      two,
      three,
      four,
      five,
      six,
      seven,
      eight,
      posx: (Math.random()-.5)*20,
      posy: (Math.random()-.5)*40,
      posz: (Math.random()-.5)*20,
      text: text,
      date: Date()
    });
  }
  
  return (
  <div style={{ width: "100vw", height: "100vh" }}>

    {/* SCREEN1: landing */}

    {landingVisible == true ?
    <div class = "background">
    <div class="scroll">
    <img class="image" src={scrollText}/>
      </div> 
    <div class="centered">
      <div class="landing"> 
        <h1 class="bigTitle">hi CO designer</h1> 
        {/* <h1>Welcome to Harvard x Design </h1> */}
        <h2> create a community garden with Harvard x Design</h2>
        <h2> </h2>
        <button onClick={() => {
          setLandingVisible(false);
          setCohesion(true);
        }}
          > get planting </button>
      </div>
      
    </div>
    <div class="scroll">
    <img class="image" src={scrollText}/>
      </div> 
    
    </div>
    : null
    }


    {/* SCREEN2: all questions */}
    {cohesion == true ?
    <div style ={{display: "flex", flexDirection: "column"} }>
      <Question question={questions[0]} setVal={updateZero}></Question>
      <Question question={questions[1]} setVal={updateOne}></Question>
      <Question question={questions[2]} setVal={updateTwo}></Question>
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
      <Question question={questions[3]} setVal={updateThree}></Question>
      <Question question={questions[4]} setVal={updateFour}></Question>
      <Question question={questions[5]} setVal={updateFive}></Question>
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
        <Question question={questions[6]} setVal={updateSix}></Question>
        <Question question={questions[7]} setVal={updateSeven}></Question>
        <Question question={questions[8]} setVal={updateEight}></Question>
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
        setNewAvatar({three: three, one: one, zero: zero, two: two, posx: 0, posy:0, posz: 0, text: text});
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
   
    <Flower text={text} zero={zero} one={one} two={two} three={three} four={four} five={five} six={six} seven={seven} eight={eight}/>
       
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
    <div class="darkBg">
    
      <Grid avatars={avatars.slice(0, 15)}/>

        {/* <button class="floating" onClick={() => {
        setQuestionsVisible(false);
        setLandingVisible(true);
        setCanvasVisible(false)
        setAvatarVisible(false);
      }}> again </button> */}
    
    </div>
    : null
    }
  </div>
  );

}

export default App;


