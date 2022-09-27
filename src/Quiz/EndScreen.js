import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { QuizContext } from './Context'
import bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function EndScreen() {
    const { score,setScore, setGameState} = useContext(QuizContext)

  const moveToSetting = () => {
    setScore(0)
    setGameState("menu")
  }
  return (
    <div className='endScreen'>
        <h1>Your Score</h1>
        <h2 style={{"textAlign":"center"}}>{score}</h2>
        <NavLink to="/">
          <button className='btn btn-secondary'onClick={moveToSetting} >Retry</button>
        </NavLink>
    </div>
  )
}

export default EndScreen