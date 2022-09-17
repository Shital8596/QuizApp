import './App.css';
import { createContext, useState } from 'react';
import EndScreen from './Quiz/EndScreen';
import { QuizContext } from './Quiz/Context';
import SelectField from './Quiz/SelectField';
import Setting from './Quiz/Setting';
import GetQuestions from './Quiz/GetQuestions';


function App() {

  const [gameState, setGameState] = useState("menu")
  const [category, setCategory] = useState(9)
  const [difficulty, setDifficulty] = useState("easy")
  const [score, setScore] = useState(0)
  return (
    <div className="App">
    {gameState === "quiz" && <div className='showScore'>{score}/10</div>}
    <QuizContext.Provider value={{gameState, setGameState, score, setScore, category, setCategory, difficulty, setDifficulty}}>
      {gameState === "menu" && <Setting/>}
      {gameState === "quiz" && <GetQuestions/>}
      {gameState === "endScreen" && <EndScreen/>}
      </QuizContext.Provider>
    </div>
  );
}

export default App;