
import React,{useContext} from 'react'
import { QuizContext } from './Context'
import { NavLink } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import {Box} from "@mui/system"
import {CircularProgress} from "@mui/material"
import SelectField from './SelectField'

function Setting() {
    const {response, error, loading} = useAxios({ url : "https://opentdb.com/api_category.php"})

    const {setGameState} = useContext(QuizContext)

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

    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <div className='menuDiv'>
        <h1 className='mb-5 text-warning text-uppercase '>Do you want to give a quiz ? </h1>
        <div className='mb-5'>Then, Let's start. Select category and start the quiz</div>
        <form onSubmit={handleSubmit}>
            <SelectField options={response?.trivia_categories} label="Category"/>
            <NavLink to="/quiz">
                <button className="btn btn-primary mt-4 btn-lg " id='btn' onClick={() => {setGameState("quiz")}}>Start Quiz</button>
            </NavLink>
        </form>
    </div>
  )
}

export default Setting