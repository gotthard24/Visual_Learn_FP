import { Link, useNavigate } from "react-router-dom"
import {Button, Stack} from '@mui/material'
import { useContext } from "react"
import { AuthContext, AuthContextType } from "../../App"

const Header = () => {
    const { setToken} = useContext(AuthContext) as AuthContextType
    const navigate = useNavigate();

    const logoutHandler = () => {
        if (localStorage.getItem('refToken')){
            localStorage.removeItem('refToken')
            localStorage.removeItem('email')
            setToken(undefined)
            alert("Successfull logout")
            navigate('/login');
        } else {
            alert("You are not logged in")
        }
    }

    return (
        <Stack spacing={2} direction={'row'}>
            <Button component={Link} to="/words">
                Words
            </Button>
            <Button component={Link} to="/">
                Home
            </Button>
            <Button component={Link} to="/login">
                Login
            </Button>
            <Button component={Link} to="/register">
                Register
            </Button>
            <Button onClick={logoutHandler}>
                LogOut
            </Button>
        </Stack>
    )
}

export default Header