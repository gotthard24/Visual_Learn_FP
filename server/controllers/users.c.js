import { register, login, getWords, getUsersProgress, addScoreByEmail, resetProgressByEmail, changeLanguageByEmail, getLanguageByEmail, getUserScoreByName} from "../models/users.m.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
dotenv.config()

const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE, REFRESH_TOKEN_SECRET} = process.env

export const _register = async(req, res) => {
    const {email, password} = req.body
    try {
        const lowerEmail = email.toLowerCase();

        const salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(password+'', salt)

        const newUser = await register({
            email: lowerEmail,
            password: hashPass,
        });
        res.json(newUser)
    } catch (error) {
        console.log(`_register => ${error}`);
        res.status(404).json({msg: 'registration failed'})
    }
}

export const _login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await login(email.toLowerCase())

        if(!user) return res.status(500).json({msg: 'Email not found'})

        const isMatch = bcrypt.compareSync(password+'', user.password)
        if(!isMatch) return res.status(500).json({msg: 'Wrong Password'})
        
        const expirationTime = Math.floor(Date.now() / 1000) + 1 * ACCESS_TOKEN_EXPIRE; // 1 minute
        const refExpirationTime = Math.floor(Date.now() / 1000) + 60 * ACCESS_TOKEN_EXPIRE * 24; // 1 day

        const accessToken = jwt.sign(
            {id: user.id, email: user.email},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: expirationTime
            }
        )

        const refToken = jwt.sign(
            {id: user.id, email: user.email},
            REFRESH_TOKEN_SECRET,
            {
                expiresIn: refExpirationTime
            }
        )

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: ACCESS_TOKEN_EXPIRE * 1000,
            path: '/',
            sameSite: 'Strict'
        });

        res.cookie("refToken", refToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: ACCESS_TOKEN_EXPIRE * 1000,
            path: '/',
            sameSite: 'Strict'
        });

        res.json({token: accessToken, refToken: refToken, email: user.email})
    } catch (error) {
        console.log(`_login => ${error}`);
        res.status(500).json({msg: 'login failed'})
    }
}

export const _getuser = async(req, res) => {
    const {email} = req.body
    console.log(email);
    try {
        const user = await login(email.toLowerCase())
        if(!user) return res.status(500).json({msg: 'Email not found'})
            console.log("user from get user", user);
        res.json(user)
    } catch (error) {
        console.log(`_getUser => ${error}`);
        res.status(404).json({msg: 'getting user failed'})
    }
}

export const _getWords = async(req, res) => {
    try {
        const words = await getWords()
        if(!words) return res.status(500).json({msg: 'Words not found'})
        res.json(words)
    } catch (error) {
        console.log(`_getWords => ${error}`);
        res.status(404).json({msg: 'getting words failed'})
    }
}

export const _getUsersProgress = async(req, res) => {
    try {
        const result = await getUsersProgress()
        if(!result) return res.status(500).json({msg: 'Results not found'})
        res.json(result)
    } catch (error) {
        console.log(`_getUsersProgress => ${error}`);
        res.status(404).json({msg: 'getting leaderBoard failed'})
    }
}

export const _addScoreByEmail = async (req, res) => {
    try {
        const { email, score } = req.body;

        if (!email || typeof score !== 'number') {
            return res.status(400).json({ msg: 'Invalid data provided' });
        }

        await addScoreByEmail({ email, score });
        res.status(200).json({ msg: 'Score added successfully', score });
    } catch (error) {
        console.log(`_addScoreByEmail => ${error}`);
        res.status(500).json({ msg: 'Adding score failed' });
    }
};

export const _resetProgressByEmail = async(req, res) => {
    try {
        const {email} = req.body

        if (!email) {
            return res.status(400).json({ msg: 'Invalid data provided' });
        }

        await resetProgressByEmail(email)
        res.status(200).json({ msg: 'Score reseted successfully' });
    } catch (error) {
        console.log(`_resetProgressByEmail => ${error}`);
        res.status(500).json({ msg: 'Reset score failed' });
    }
}

export const _changeLanguageByEmail = async(req, res) => {
    try {
        const {email, language} = req.body
        if(!email || (language !== 'english' && language !== 'russian' && language !== 'hebrew')){
            return res.status(400).json({ msg: 'Invalid data provided' });
        }
        await changeLanguageByEmail({email,language})
        res.status(200).json({ msg: 'Language changed successfully', language: language });
    } catch (error) {
        console.log(`_changeLanguageByEmail => ${error}`);
        res.status(500).json({ msg: 'Changing Lang failed' });
    }
}

export const _getLanguageByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: 'Invalid data provided' });
        }
        const language = await getLanguageByEmail(email);
        res.status(200).json({ msg: 'Language get successfully', language });
    } catch (error) {
        console.log(`_getLanguageByEmail => ${error}`);
        res.status(500).json({ msg: 'Getting Lang failed' });
    }
}

export const _getUserScoreByName = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: 'Invalid data provided' });
        }
        const score = await getUserScoreByName(email)
        res.status(200).json({ msg: 'Language get successfully', score });
    } catch (error) {
        console.log(`_getUserScorel => ${error}`);
        res.status(500).json({ msg: 'Getting SCORE failed' });
    }
}