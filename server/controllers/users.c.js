import { register } from "../models/users.m.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

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