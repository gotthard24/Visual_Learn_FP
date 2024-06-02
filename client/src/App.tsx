import { createContext, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import Home from './features/auth/Home';
import './App.css';
import Header from './features/auth/Header';

interface AuthContextType {
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
    <AuthContext.Provider value={{ token, setToken }}>
        <div>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage page={"Login"} />} />
            <Route path='/register' element={<LoginPage page={"Register"} />} />
          </Routes>
        </div>
    </AuthContext.Provider>
  );
}

export default App;
