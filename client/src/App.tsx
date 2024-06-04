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
            <Route path='/words' element={<Auth><WordsDisplay/></Auth>} />
            <Route path='/leaderboard' element={<Auth><LeaderBoard/></Auth>} />
            <Route path='/settings' element={<Auth><Settings/></Auth>} />
          </Routes>
        </div>
    </AuthContext.Provider>
  );
}

export default App;
