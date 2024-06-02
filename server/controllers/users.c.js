import { register, login } from "../models/users.m.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"
dotenv.config()

const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE} = process.env

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

        if(!user) return res.json(500).json({msg: 'Email not found'})

        const isMatch = bcrypt.compareSync(password+'', user.password)
        if(!isMatch) return res.status(500).json({msg: 'Wrong Password'})
        
        
        const accessToken = jwt.sign(
            {id: user.id, email: user.email},
            ACCESS_TOKEN_SECRET,
            {
                expiresIn: 24 * ACCESS_TOKEN_EXPIRE * 60 * 1000
            }
        )

        res.cookie("token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * ACCESS_TOKEN_EXPIRE * 60 * 1000,
            path: '/',
            sameSite: 'Strict'
        });

        res.json({token: accessToken, email: user.email})
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