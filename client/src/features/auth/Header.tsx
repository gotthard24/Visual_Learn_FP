import { Link, useNavigate } from "react-router-dom"
import { Button, Stack } from '@mui/material'
import { useContext } from "react"
import { AuthContext, AuthContextType } from "../../App"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../app/store"
import { setStoreScore } from "../levelSlice/levelSlice"

const Header = () => {
    const { token, setToken } = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const logoutHandler = () => {
        if (localStorage.getItem('refToken')) {
            localStorage.removeItem('email')
            localStorage.removeItem('refToken')
            setToken(undefined)
            dispatch(setStoreScore(0))
            alert("Successfull logout")
            navigate('/login');
        } else {
            alert("You are not logged in")
        }
    }

    return (
        <div className="header-container">
            <Stack spacing={2} direction={'row'} className="header-buttons">
                {token ? (
                    <>
                        <Button component={Link} to="/">
                            Play
                        </Button>
                        <Button component={Link} to="/leaderboard">
                            LeaderBoard
                        </Button>
                        <Button component={Link} to="/settings">
                            Setting
                        </Button>
                        <Button onClick={logoutHandler}>
                            LogOut
                        </Button>
                    </>
                ) : (
                    <>
                        <Button component={Link} to="/login">
                            Login
                        </Button>
                        <Button component={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
            </Stack>
        </div>
    )
}

export default Header
