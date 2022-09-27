import './App.css';
import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EndScreen from './Quiz/EndScreen';
import { QuizContext } from './Quiz/Context';
import Setting from './Quiz/Setting';
import GetQuestions from './Quiz/GetQuestions';


function App() {

  const [gameState, setGameState] = useState("menu")
  const [category, setCategory] = useState(9)
  const [difficulty, setDifficulty] = useState("easy")
  const [score, setScore] = useState(0)
  return (
    <BrowserRouter>
      <div className="App">
      {gameState === "quiz" && <div className='showScore'>{score}/10</div>}
    
        <QuizContext.Provider value={{gameState, setGameState, score, setScore, category, setCategory, difficulty, setDifficulty}}>
        <Routes>
          <Route path="/" exact element={<Setting/>}/>
          <Route path="/quiz"  element={<GetQuestions/>}/>
          <Route path="/endScreen"  element={<EndScreen/>}/>
          </Routes>
          </QuizContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;