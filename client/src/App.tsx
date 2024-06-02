import { createContext, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import Home from './features/auth/Home';
import Header from './features/auth/Header';
import Auth from './auth/Auth';
import './App.css';

export interface AuthContextType {
  token: string | undefined;
  refToken: string | undefined;
  setToken: (token: string | undefined) => void;
  setRefToken: (refToken: string | undefined) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: undefined,
  setToken: () => {},
  refToken: undefined,
  setRefToken: () => {},
});

function App() {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [refToken, setRefToken] = useState<string | undefined>(undefined);

  return (
    <AuthContext.Provider value={{ token, setToken, refToken, setRefToken }}>
        <div>
          <Header/>
          <Routes>
            <Route path='/' element={<Auth><Home/></Auth>}/>
            <Route path='/login' element={<LoginPage page={"Login"} />} />
            <Route path='/register' element={<LoginPage page={"Register"} />} />
          </Routes>
        </div>
    </AuthContext.Provider>
  );
}

export default App;
