import { createContext, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import Home from './features/auth/Home';
import Header from './features/auth/Header';
import Auth from './auth/Auth';
import './App.css';
import WordsDisplay from './features/levelSlice/WordsDisplay';
import Score from './features/score/Score';
import Settings from './features/levelSlice/Settings';
import LeaderBoard from './features/levelSlice/LeaderBoard';
import ExtraLvl from './features/s3/ExtraLvl';

export interface AuthContextType {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: undefined,
  setToken: () => {},
});

function App() {
  const [token, setToken] = useState<string | undefined>(undefined);
  return (
    <AuthContext.Provider value={{ token, setToken}}>
        <div>
          <Score/>
          <Header/>
          <Routes>
            <Route path='/' element={<Auth><Home/></Auth>}/>
            <Route path='/login' element={<LoginPage page={"Login"} />} />
            <Route path='/register' element={<LoginPage page={"Register"} />} />
            <Route path='/level1' element={<Auth><WordsDisplay key={1} level={1} name={'Food'}/></Auth>} />
            <Route path='/level2' element={<Auth><WordsDisplay key={2} level={2} name={'Food'}/></Auth>} />
            <Route path='/level3' element={<Auth><WordsDisplay key={3} level={3} name={'Food'}/></Auth>} />
            <Route path='/level4' element={<Auth><WordsDisplay key={4} level={4} name={'Food'}/></Auth>} />
            <Route path='/level5' element={<Auth><WordsDisplay key={5} level={5} name={'Food'}/></Auth>} />
            <Route path='/level6' element={<Auth><WordsDisplay key={6} level={6} name={'Body Parts'}/></Auth>} />
            <Route path='/extra' element={<Auth><ExtraLvl key={7}/></Auth>} />
            <Route path='/leaderboard' element={<Auth><LeaderBoard/></Auth>} />
            <Route path='/settings' element={<Auth><Settings/></Auth>} />
          </Routes>
        </div>
    </AuthContext.Provider>
  )
}

export default App;
