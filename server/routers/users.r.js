import express from 'express'
import { _getuser, _login, _register} from '../controllers/users.c.js'

const router = express.Router();

router.post('/register', _register)
router.post('/login', _login)
router.post('/user', _getuser)

export default router