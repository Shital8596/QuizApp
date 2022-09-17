import React,{useContext} from 'react'
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
        <button className='btn btn-secondary' onClick={moveToSetting}>Retry</button>
    </div>
  )
}

export default EndScreen