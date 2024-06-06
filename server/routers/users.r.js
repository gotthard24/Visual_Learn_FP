import express from 'express'
import { _addProgressByEmail, _addScoreByEmail, _changeDifficultyByEmail, _changeLanguageByEmail, _getDifficultyByEmail, _getLanguageByEmail, _getUserProgressByEmail, _getUserScoreByName, _getUsersProgress, _getWordsByLevel, _getuser, _login, _register, _resetProgressByEmail} from '../controllers/users.c.js'
import { verifyAccessToken } from '../middlewares/verifyAccessToken.js';

const router = express.Router();

router.post('/register', _register)
router.post('/login', _login)
router.post('/user', verifyAccessToken, _getuser)
router.post('/userlng', _getLanguageByEmail)
router.post('/userprogress', _getUserProgressByEmail)
router.post('/userdiff', _getDifficultyByEmail)
router.post('/userscore', _getUserScoreByName)
router.put('/addscore', _addScoreByEmail)
router.put('/addprogress', _addProgressByEmail)
router.put('/resetscore', _resetProgressByEmail)
router.put('/changeln', _changeLanguageByEmail)
router.put('/changediff', _changeDifficultyByEmail)
router.get('/words/:level', _getWordsByLevel)
router.get('/leaderboard', _getUsersProgress)
router.get('/verify', verifyAccessToken, (req, res) => {
    res.sendStatus(200);
})

export default router