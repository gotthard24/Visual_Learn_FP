import {Button, Stack} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { getUserProgress, getUserScore } from '../levelSlice/levelSlice';

const Home = () => {
  const email = localStorage.getItem('email');
  const progress = useSelector((state: RootState) => state.levelReducer.progress)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    initProgress()
    if(email) dispatch(getUserScore(email))
  }, []);

  const initProgress = async() => {
    if(email) await dispatch(getUserProgress(email))
  }

  return (
    <>
      <h2>Welcome, {`${email}`} !</h2>
      <ul>
        <h3>Chapter 1: Food</h3>
        <Stack spacing={2} direction={'row'}>
            <Button component={Link} to="/level1">
                Level 1
            </Button>
            <Button component={Link} to="/level2" disabled={progress < 2}>
                Level 2
            </Button>
            <Button component={Link} to="/level3" disabled={progress < 3}>
                Level 3
            </Button>
            <Button component={Link} to="/level4" disabled={progress < 4}>
                Level 4
            </Button>
            <Button component={Link} to="/level5" disabled={progress < 5}>
                Level 5
            </Button>
        </Stack>
        <h3>Chapter 2: Body</h3>
        <Stack spacing={2} direction={'row'}>
            <Button component={Link} to="/level6" disabled={progress < 6}>
                Level 6
            </Button>
        </Stack>
        <h3>Chapter 3: Extra</h3>
        <Stack spacing={2} direction={'row'}>
            <Button component={Link} to="/extra">
                Extra lvl
            </Button>
        </Stack>
      </ul>
    </>
  );
};

export default Home;
