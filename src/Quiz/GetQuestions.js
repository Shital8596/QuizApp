import React, { useContext, useEffect, useState } from 'react'
import useAxios from '../hooks/useAxios'
import { NavLink } from 'react-router-dom';
import { QuizContext } from './Context';
import {Box} from "@mui/system"
import {CircularProgress} from "@mui/material"
import bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import useSound from 'use-sound'
import correct from '../assets/correct-ans.mp3'
import wrong from '../assets/wrong-ans.mp3'
import click from '../assets/click.mp3'


const getRandomInt = (max) =>{
    return Math.floor(Math.random() * Math.floor(max))    
}

function GetQuestions() {
    const {category, score, setScore, setGameState} = useContext(QuizContext)
    const [options, setOptions] = useState([])
    const [questionIndex, setQuestionIndex] = useState(0);
    const [optionChosen, setOptionChosen] = useState('')
    const [correctAns] = useSound(correct)
    const [wrongAns] = useSound(wrong)
    const [btnClick] = useSound(click)
  
    
    let apiUrl = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`

    const {response, error, loading} = useAxios({ url : apiUrl})

    useEffect(() => {
        if(response?.results.length){
            const question = response.results[questionIndex]
            let answers = [...question.incorrect_answers]
            answers.splice(
                getRandomInt(question.incorrect_answers.length),
                0,
                question.correct_answer
            )
            setOptions(answers)
        }
    },[response,questionIndex])


    if(loading){
        return(
            <Box mt={8}>
                <CircularProgress style={{ color: "yellow" }}/>
            </Box>
        )
    }

    if(error){
        return (
            <h1>Something Went Wrong</h1>
        )
    }

    function changeBg (e) {
        let a = e.target.id
    
        setOptionChosen(e.target.value)
        
        if(response?.results[questionIndex].correct_answer === e.target.value){
          correctAns();
          document.getElementById(a).className = "ans correct"
        }else if(response?.results[questionIndex].correct_answer !== e.target.value){
          wrongAns();
          document.getElementById(a).className = "ans wrong"
        }else{
          document.getElementById(a).className = "ans"
        }
        if(response?.results[questionIndex].correct_answer === e.target.value){
            setScore(score + 1)
          }
      }


    const nextQuestion = () =>{
      btnClick()
        let buttons = document.querySelectorAll(".ans");
        for(let btn of buttons){
          btn.className = "ans"
        }
        setQuestionIndex(cur => cur + 1)
      }
    
      const lastQuestion = (e) => {
        btnClick()
        setQuestionIndex(prev => prev - 1)
      }

      const finishQuiz = () => {
        if(response?.results[questionIndex].correct_answer === optionChosen){
          setScore(score + 1)
        }
        setGameState("endScreen")
      }

      const GoToSetting = () => {
        setGameState("menu")
      }

  return (
    <div className='main'>

      <div className='BackBtnDiv'>
        <NavLink to="/">
          <button onClick={GoToSetting} >Go to Setting</button>
        </NavLink>
        </div>

        <div className='childContainer'>
        <span  className='text-warning mb-4'>Que. {questionIndex+1}/10</span>
        <h1 className='question' > {(response?.results[questionIndex]) ?  response?.results[questionIndex]?.question : <h2>No Questions available</h2>}</h1>
        <div className='answers'>
            {
            options.map((data, id) => <button id={id} value={data} onClick={changeBg} className="ans" key={id}>{data}</button>)
            }
        </div>
        <div>
            {
                (questionIndex === response?.results.length-1) ? (
                  <NavLink to="/endScreen">
                    <button className='finishBtn' onClick={finishQuiz}>Finish Quiz</button>
                  </NavLink>
                ) : (
                    (questionIndex === 0) ?
                        <div className='btnDiv'>
                            <button id='back' className='nextBtn btn btn-secondary mx-2 btn-sm' disabled onClick={lastQuestion}>Back</button>
                            <button id='next' className='nextBtn btn btn-secondary btn-sm' onClick={nextQuestion}>Next</button>
                        </div>
                        : 
                    <div className='btnDiv'>
                        <button id='back' className='nextBtn btn btn-secondary mx-2 btn-sm' onClick={lastQuestion}>Back</button>
                        {/* <audio id='audio' src='../../public/assets/pop.mp3'/>  */}
                        <button id='next' className='nextBtn btn btn-secondary btn-sm' onClick={nextQuestion}>Next</button>
                    </div>
                )
          }
          </div>
        </div>
    </div>
  )
}

export default GetQuestions