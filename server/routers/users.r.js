import express from 'express'
import { _addScoreByEmail, _changeLanguageByEmail, _getLanguageByEmail, _getUsersProgress, _getWords, _getuser, _login, _register, _resetProgressByEmail} from '../controllers/users.c.js'
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

router.post('/register', _register)
router.post('/login', _login)
router.post('/user', verifyAccessToken, _getuser)
router.post('/userlng', _getLanguageByEmail)
router.put('/addscore', _addScoreByEmail)
router.put('/resetscore', _resetProgressByEmail)
router.put('/changeln', _changeLanguageByEmail)
router.get('/words', _getWords)
router.get('/leaderboard', _getUsersProgress)
router.get('/verify', verifyAccessToken, (req, res) => {
    res.sendStatus(200);
})

export default router