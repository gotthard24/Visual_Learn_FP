import express from 'express'
import { _getWords, _getuser, _login, _register} from '../controllers/users.c.js'
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

router.post('/register', _register)
router.post('/login', _login)
router.post('/user', verifyAccessToken, _getuser)
router.get('/words', _getWords)
router.get('/verify', verifyAccessToken, (req, res) => {
    res.sendStatus(200);
})

export default router