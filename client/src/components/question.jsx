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

const Question = ({question, setVal})  => {
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
    { questionArray[0].length > 2 ? <h1 class="sectionText">{questionArray[0]}</h1> : null
    }
    <h2 class="questionText">{questionArray[1]}</h2>
    

    {/* <h2>{localVal}</h2> */}
    

      <div class="range">
      <h3 class="lower">{questionArray[2]}</h3>
      <input
        type="range"
        class="slider"
        min="1"
        max="20"
        value={localVal}
        onChange={(e) => setVals(e.target.value)}
      />
    <h3 class = "higher">{questionArray[3]}</h3>
    </div>

   </div>
  );

}

export default Question;