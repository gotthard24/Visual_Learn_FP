import {Button, Stack} from '@mui/material'
import { Link } from 'react-router-dom';

const Home = () => {
  const email = localStorage.getItem('email');

  return (
    <>
      <h1>Home</h1>
      <ul>
        <h2>Welcome {`${email}`} !</h2>
        <Stack spacing={2} direction={'row'}>
            <Button component={Link} to="/words">
                Level 1
            </Button>
        </Stack>
      </ul>
    </>
  );
};

export default Home;
