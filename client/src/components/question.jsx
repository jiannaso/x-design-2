import { Canvas, useFrame } from "@react-three/fiber"
// import "./App.css"
import { useCallback, useEffect, useRef } from "react"
import { OrbitControls, MeshWobbleMaterial, useHelper, Text} from '@react-three/drei'
import { DirectionalLightHelper } from "three"
import { useControls } from "leva"
import React, { useState } from 'react';
// import initData from './data/data1.json';
import axios from 'axios';
// import {db} from './firebase';
// import {uid} from 'uid';
// import {set, ref, DataSnapshot, onValue} from 'firebase/database';
import './questions.css';

const Question = ({question, setVal, numQuestion})  => {
    // console.log(Object.values(question)[0].ask);
    let questionArray = Object.values(question);
    // console.log(val);
    const [localVal, setLocalVal] = useState(10);


    const setVals = (value) => {
        setVal(value);
        setLocalVal(value);
        console.log(value);
    }
    
  return (
   <div class="question">
        {/* { window.innerWidth > 500 ? 
        <div class="big-question">
          { questionArray[0].length > 2 ? <h1 class="sectionText">{questionArray[0]}</h1> : null
    }
    <h4 class = "question-number">{numQuestion}</h4> 
    <h2 class="questionText">{questionArray[1]}</h2> 
    </div>
    : */}
    <div class="small-question">
      { questionArray[0].length > 2 ? <h1 class="sectionText">{questionArray[0]}</h1> : null
    }
    <div class = "question-number-text">
      <h4 class = "question-number">{numQuestion}</h4> 
      <div class = "vertical-text">
        <h2 class="questionText">{questionArray[1]}</h2> 
      </div>
    </div>
    </div>
        {/* } */}
    

    {/* <h2>{localVal}</h2> */}
    
    {/* window.innerWidth > 1450 */}
    {/* { window.innerWidth > 500 ? 
      <div class="range">
      <div class = "question-vert"> 
    <input
      type="range"
      class="slider"
      min="1"
      max="20"
      value={localVal}
      onChange={(e) => setVals(e.target.value)}
    />
    <div class = "labels-small">
    <h3 class="lower">{questionArray[2]}</h3>
    <h3 class = "higher">{questionArray[3]}</h3>
    </div>
    <h3 class="" style={{color: "gray", marginTop: "10px", fontFamily: "ABeeZee"}}>slide along the scale</h3>
    </div>
    
  </div> */}
    {/* : */}
    <div class="range">
      <div class = "question-vert"> 
    <input
      type="range"
      class="slider"
      min="1"
      max="20"
      value={localVal}
      onChange={(e) => setVals(e.target.value)}
    />
    <div class = "labels-small">
    <h3 class="lower">{questionArray[2]}</h3>
    <h3 class = "higher">{questionArray[3]}</h3>
    </div>
    <h3 class="" style={{color: "gray", marginTop: "10px", fontFamily: "ABeeZee"}}>slide along the scale</h3>

    </div>
    
  </div>
    {/* } */}
   </div>
  );

}

export default Question;