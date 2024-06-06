import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } = process.env
const expirationTime = Math.floor(Date.now() / 1000) + 1 * ACCESS_TOKEN_EXPIRE; // 1 minute
const refExpirationTime = Math.floor(Date.now() / 1000) + 60 * ACCESS_TOKEN_EXPIRE * 24; // 1 day

export const verifyAccessToken = (req, res, next) => {
    // console.log('cookies',req.cookies);
    const accessToken = req.cookies.token || req.headers['x-access-token'];
    const refreshToken = req.headers['x-refresh-token'];
    // console.log('initial refToken',refreshToken);
    console.log('Pidr');

    if (accessToken) {
        console.log('i am inside if');
        console.log('Access token');
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decode) => {
            console.log("I am inside verify");
            if (err) {
                return res.status(403).json({ msg: 'Forbidden 1' });
            }
            req.userid = decode.id;
            req.userEmail = decode.email;
            return next();
        });
    } else if (!refreshToken) {
        console.log('i am inside else if');
        console.log('cookies',req.cookies);
        console.log('access',accessToken);
        console.log('refresh',refreshToken);
        return res.status(401).json({ msg: 'Unauthorized Q' });
    } else {
        console.log('Refresh token');
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res.status(403).json({ msg: 'Forbidden 2' });
            }
            console.log('doshel');
            const newAccessToken = jwt.sign(
                { id: decode.id, email: decode.email },
                ACCESS_TOKEN_SECRET,
                {
                    expiresIn: expirationTime
                }
            );

            const newRefreshToken = jwt.sign(
                { id: decode.id, email: decode.email },
                REFRESH_TOKEN_SECRET,
                {
                    expiresIn: refExpirationTime
                }
            );

            res.cookie('token', newAccessToken, {
                httpOnly: true,
                maxAge: ACCESS_TOKEN_EXPIRE * 1000 
            });

            res.cookie('refToken', newRefreshToken, {
                httpOnly: true,
                maxAge: REFRESH_TOKEN_EXPIRE * 1000 * 60 * 24
            });

            req.userid = decode.id;
            req.userEmail = decode.email;

            return next();
        });
    }
}
