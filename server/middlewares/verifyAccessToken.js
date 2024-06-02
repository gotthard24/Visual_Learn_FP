import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const {ACCESS_TOKEN_SECRET} = process.env

export const verifyAccessToken = (req, res, next) => {
    const accessToken = req.cookies.token || req.headers['x-access-token']

    if(!accessToken) return res.status(401).json({msg: 'unauthorized'})

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decode) =>{
        if(err){
            return res.status(403).json({msg: 'forbidden'});
        } 
        req.userid = decode.id;
        req.userEmail = decode.email;

        next();
    })
}