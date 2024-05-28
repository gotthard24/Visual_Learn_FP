import express from 'express'
import { _register} from '../controllers/users.c.js'

const router = express.Router();

router.post('/register', _register)

export default router