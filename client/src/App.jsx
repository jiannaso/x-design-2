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
import qr from "./assets/qr.png"
import { colorToRgba } from "@react-spring/shared"
import Flower from "./components/flower"
import Garden from "./components/garden"
import Grid from "./components/grid"
import About from "./components/About"

const App = ()  => {
    // const isDesktop = this.state.isDesktop;
    // console.log(isDesktop);

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
    const [cohesion1, setCohesion1] = useState(false);
    const [cohesion2, setCohesion2] = useState(false);

    const [collab, setCollab] = useState(false);
    const [collab1, setCollab1] = useState(false);
    const [collab2, setCollab2] = useState(false);

    const [coexist, setCoexist] = useState(false);
    const [coexist1, setCoexist1] = useState(false);
    const [coexist2, setCoexist2] = useState(false);

    const [nickname, setNickname] = useState(false);

    const [displayedflowers, setDisplayedflowers] = useState(0);
    const [aboutVisible, setAboutVisible] = useState(false);
    
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
      one: one * 5,
      zero: Math.min(zero, 20),
      two: two * 5,
      three: three * 5,
      four,
      five: five * 5,
      six: six * 5,
      seven: seven * 5,
      eight: eight * 5,
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
        <h1 class="bigTitle">Hi CO-designer!</h1> 
        {/* <h1>Welcome to Harvard x Design </h1> */}
        {/* {window.innerWidth > 500 ? <h1> hello </h1> : null } */}
        <h2> create a community garden with Harvard x Design</h2>
        <h2> </h2>
        {/* <div> */}
        <button onClick={() => {
          setLandingVisible(false);
          setCohesion(true);
        }}
          > get planting </button>
        <button onClick={() => {
          setLandingVisible(false);
          setCanvasVisible(true);
        }}
          > see garden </button>
        <button onClick={() => {
          setLandingVisible(false);
          setAboutVisible(true);
        }}
          > about </button>
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
    <div style ={{display: "flex", flexDirection: "column", backgroundColor: "white", height: "105vh"} }>
      <Question question={questions[0]} setVal={updateZero} numQuestion={1}></Question>
      <div style={{backgroundColor: "white", height: "100px", display: "flex", marginTop: "0px", marginBottom: "20px"}}>
     <button class="nextQuestion" onClick={() => {
        setCohesion1(true);
        setCohesion(false)
      }}> next </button> 
      </div>
      </div>
        :
      null
    }

  {cohesion1 == true ?
    <div style ={{display: "flex", flexDirection: "column", backgroundColor: "white", height: "105vh"} }>
    <Question question={questions[1]} setVal={updateOne} numQuestion={2}></Question>
      <div style={{backgroundColor: "white", height: "100px", display: "flex", marginTop: "20px", marginBottom: "20px"}}>
      <button class="nextQuestion" onClick={() => {
        setCohesion2(true);
        setCohesion1(false)
      }}> next </button> 
      </div>
      </div>
        :
      null
    }

  {cohesion2 == true ?
    <div style ={{display: "flex", flexDirection: "column", backgroundColor: "white", height: "105vh"} }>
    <Question question={questions[2]} setVal={updateTwo} numQuestion={3}></Question>
      <div style={{backgroundColor: "white", height: "100px", display: "flex", marginTop: "20px", marginBottom: "20px"}}>
      <button class="nextQuestion" onClick={() => {
        setCollab(true);
        setCohesion2(false)
      }}> next </button> 
      </div>
      </div>
        :
      null
    }

    {collab == true ?
    <div style ={{display: "flex", flexDirection: "column", backgroundColor: "white", height: "105vh"} }>
    <Question question={questions[3]} setVal={updateThree} numQuestion={4}></Question>
      <div style={{backgroundColor: "white", height: "100px", display: "flex", marginTop: "20px", marginBottom: "20px"}}>
      <button class="nextQuestion" onClick={() => {
        setCollab1(true);
        setCollab(false);
      }}> next </button> 
      </div>
      </div>
        :
      null
    }

  {collab1 == true ?
    <div style ={{display: "flex", flexDirection: "column", backgroundColor: "white", height: "105vh"} }>
    <Question question={questions[4]} setVal={updateFour} numQuestion={5}></Question>
      <div style={{backgroundColor: "white", height: "100px", display: "flex", marginTop: "20px", marginBottom: "20px"}}>
      <button class="nextQuestion" onClick={() => {
        setCollab2(true);
        setCollab1(false);
      }}> next </button> 
      </div>
      </div>
        :
      null
    }

  {collab2 == true ?
    <div style ={{display: "flex", flexDirection: "column", backgroundColor: "white", height: "105vh"} }>
    <Question question={questions[5]} setVal={updateFive} numQuestion={6}></Question>
        <div style={{backgroundColor: "white", height: "100px", display: "flex", marginTop: "20px", marginBottom: "20px"}}>
        <button class="nextQuestion" onClick={() => {
          setCoexist(true);
          setCollab2(false);
        }}> next </button> 
        </div>
        </div>
          :
        null
      }

    {coexist == true ?
    <div style ={{display: "flex", flexDirection: "column", backgroundColor: "white", height: "105vh"} }>
    <Question question={questions[6]} setVal={updateSix} numQuestion={7}></Question>
        <div style={{backgroundColor: "white", height: "100px", display: "flex", marginTop: "20px", marginBottom: "20px"}}>
        <button class="nextQuestion" onClick={() => {
          setCoexist1(true);
          setCoexist(false);
        }}> next </button> 
        </div>
        </div>
          :
        null
      }

      {coexist1 == true ?
    <div style ={{display: "flex", flexDirection: "column", backgroundColor: "white", height: "105vh"} }>
    <Question question={questions[7]} setVal={updateSeven} numQuestion={8}></Question>
        <div style={{backgroundColor: "white", height: "100px", display: "flex", marginTop: "20px", marginBottom: "20px"}}>
        <button class="nextQuestion" onClick={() => {
          setCoexist2(true);
          setCoexist1(false);
        }}> next </button> 
        </div>
        </div>
          :
        null
      }

    {coexist2 == true ?
    <div style ={{display: "flex", flexDirection: "column", backgroundColor: "white", height: "105vh"} }>
    <Question question={questions[8]} setVal={updateEight} numQuestion={9}></Question>
        <div style={{backgroundColor: "white", height: "100px", display: "flex", marginTop: "20px", marginBottom: "20px"}}>
        <button class="nextQuestion" onClick={() => {
          setNickname(true);
          setCoexist2(false);
        }}> next </button> 
        </div>
        </div>
          :
        null
      }

{nickname == true ?
<div style={{backgroundColor: "white", height: "100vh", width: "100vw", overflow: "hidden"}}>
<div class = "question" >
      <div style ={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"} }>
        <h1 class = "sectionText"> CO-mmunity</h1>
    
    {/* <h3>Remember this will be visible for everyone at the conference</h3> */}
    <div class = "question-number-text">
      <h4 class = "question-number">10</h4> 
      <div class = "vertical-text">
        <h2 class="questionText">What do you want to name your flower?</h2>
      </div>
    </div>
    {/* </div> */}

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <h3 class="" style={{color: "gray", marginTop: "10px", fontFamily: "ABeeZee"}}>nickname here</h3>

        <button class="nextQuestion" onClick={() => {
        // JSON.stringify(avatars);
        setNickname(false);
        setAvatarVisible(true);
        writeDb();
      }}> generate</button>
        </div>
        </div>
        </div>

          :
        null
      }
        
  {/* SCREEN3: solo avatar */}
   { avatarVisible == true ?
   <div class="darkBg" style={{display: "flex", flexDirection: "column", backgroundColor: "black", overflow: "hidden", height: "100vh"}}>
   <h3 style={{color: "white" , marginTop: "70px"}}> Welcome to our garden, {text.length > 1 ? text : "friend"}!</h3>
    {/* <h3 style={{color: "white"}}> </h3> */}


     <button  style={{color: "white", margin: "auto"}} onClick={() => {
       // console.log(wobbleIntensity);
       setQuestionsVisible(false);
       setCanvasVisible(true);
       setAvatarVisible(false);
     }}> visit the garden </button>
    <Flower text={text} zero={zero} one={one * 5} two={two * 5} three={three * 5} four={four} five={five * 5} six={six * 5} seven={seven * 5} eight={eight * 5}/>
    {/* <h1 class = "sectionText" style={{color: "white"}}> Hi {text}</h1> */}
    <button class="floating" onClick={() => {
       setAvatarVisible(false);
       setAboutVisible(true);
     }} style={{ top: "40px", right: "40px", left: "auto" }}> about </button>
    
    </div>
    : null}

    {/* SCREEN4: all avatars*/}
    {canvasVisible == true ? 
    
    <div class="darkBg" style = {{backgroundColor: "black"}}>
            {window.innerWidth > 500 ?

      <img class="image" style = {{height: "100px", position: "fixed", top: "50px", left: "50px", zIndex: "1"}} src={qr}/> :
      null 
            }
      <div style={{display: "flex", flexDirection: "column", backgroundColor: "black", padding: "50px",}}>
      <h1 style={{color: "white"}}> CO-garden</h1>
      <h3 style={{color: "white", marginBottom: "0px"}}> Recently planted</h3>


      <div style={{display: "flex", flexDirection: "row", margin: "auto", justifyContent: "center", alignContent: "center"}}>
      <button class="view-flowers" onClick={() => {
        if(displayedflowers > 0) {
          let prev = displayedflowers - 1;
          setDisplayedflowers(prev);
        }
      }}>←</button>

      <h3 style={{color: "gray", margin: "auto"}}>{1+15*(displayedflowers)} - {15*(displayedflowers+1)} of {avatars.length} flowers</h3>

      <button class="view-flowers" onClick={() => {
        if(displayedflowers < avatars.length / 15 - 1) {
          let next = displayedflowers + 1;
          setDisplayedflowers(next);
        }
      }}>→</button>
      </div>

        <button class="floating" onClick={() => {
        setQuestionsVisible(false);
        setLandingVisible(true);
        setCanvasVisible(false)
        setAvatarVisible(false);
      }}> plant another </button>
      </div>

      {window.innerWidth > 500 ?
            <Grid avatars={avatars.slice(15*displayedflowers, 15*(displayedflowers+1))} vw={"20vw"} vh={"33vh"} />

      :
      <Grid avatars={avatars.slice(15*displayedflowers, 15*(displayedflowers+1))}  vw={"50vw"} vh={"33vh"}/>

      }
   
      <button class="floating" onClick={() => {
        setCanvasVisible(false);
        setAboutVisible(true);
      }} style={{ top: "40px", right: "40px", left: "auto" }}> about </button>

      {/* <button class="floating" onClick={() => {
        // setQuestionsVisible(false);
        // setLandingVisible(true);
        setCanvasVisible(false);
        setCanvasVisible(true);
      }}> refresh </button>
     */}
    </div>
    : null
    }

    {/* SCREEN5: about page */}
    {aboutVisible == true ?
    <About onBack={() => {
      setAboutVisible(false);
      setLandingVisible(true);
    }} />
    : null
    }
  </div>
  );

}

export default App;


