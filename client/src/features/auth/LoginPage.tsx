import { useState, useContext, ChangeEvent, MouseEvent } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { AuthContext } from "../../App";
import { AuthContextType } from "../../App";
import { DEPLOY_DOMAIN } from "../../hosts/options";

interface LoginPageProps {
  page: "Login" | "Register";
}

const LoginPage = ({ page }: LoginPageProps) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { setToken} = useContext(AuthContext) as AuthContextType;

  const navigate = useNavigate();

  const loginregister = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(`${DEPLOY_DOMAIN}/users/login`);
    if (page === "Login") {
      try {
        const response = await axios.post(`${DEPLOY_DOMAIN}/users/login`, {
          email, password
        }, { withCredentials: true });
        if (response.status === 200) {
            setMessage('')
            console.log(response.data);
            setToken(response.data.token);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('refToken', response.data.refToken);
            navigate('/');
        }
      } catch (error) {
        setToken(undefined);
        console.log(error);

        if (axios.isAxiosError(error) && error.response) {
            setMessage(error.response.data.msg || 'Login failed');
          } else {
            setMessage('An error occurred during login');
          }
      }
    } else {
      try {
        const response = await axios.post(`${DEPLOY_DOMAIN}/users/register`, {
          email, password
        }, { withCredentials: true });
        if (response.status === 200) {
            setMessage('')
            console.log(response.data.msg);
            navigate('/login');
        }
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
            setMessage(error.response.data.msg || 'Register failed');
          } else {
            setMessage('An error occurred during register');
          }
      }
    }
  }

  return (
    <>
      <h1>{page}</h1>
      <Box component={'form'} sx={{ m: 1 }} noValidate autoComplete="off">
        <TextField
          InputProps={{ style: { color: 'white' } }}
          sx={{ m: 1 }}
          InputLabelProps={{ style: { color: 'white' } }}
          id="email"
          type="email"
          label="Enter your email"
          variant="outlined"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        <TextField
          InputProps={{ style: { color: 'white' } }}
          sx={{ m: 1 }}
          InputLabelProps={{ style: { color: 'white' } }}
          id="password"
          type="password"
          label="Enter your password"
          variant="outlined"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={loginregister}>
        {page}
      </Button>
        <div>
            {message}
        </div>
    </>
  );
}

export default LoginPage;
