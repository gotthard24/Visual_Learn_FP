import { Link } from "react-router-dom"
import {Button, Stack} from '@mui/material'

const Header = () => {
    return (
        <Stack spacing={2} direction={'row'}>
            <Button component={Link} to="/">
                Home
            </Button>
            <Button component={Link} to="/login">
                Login
            </Button>
            <Button component={Link} to="/register">
                Register
            </Button>
        </Stack>
    )
}

export default Header