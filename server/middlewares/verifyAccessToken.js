import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN_EXPIRE } = process.env

export const verifyAccessToken = (req, res, next) => {
    const accessToken = req.cookies.token || req.headers['x-access-token'];
    const refreshToken = req.cookies.refreshToken || req.headers['x-refresh-token'];

    if (accessToken) {
        jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res.status(403).json({ msg: 'Forbidden' });
            }
            req.userid = decode.id;
            req.userEmail = decode.email;

            return next();
        });
    } else if (!refreshToken) {
        return res.status(401).json({ msg: 'Unauthorized' });
    } else {
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return res.status(403).json({ msg: 'Forbidden' });
            }

            const newAccessToken = jwt.sign(
                { id: decode.id, email: decode.email },
                ACCESS_TOKEN_SECRET,
                {
                    expiresIn: ACCESS_TOKEN_EXPIRE 
                }
            );

            const newRefreshToken = jwt.sign(
                { id: decode.id, email: decode.email },
                REFRESH_TOKEN_SECRET,
                {
                    expiresIn: REFRESH_TOKEN_EXPIRE 
                }
            );

            res.cookie('token', newAccessToken, {
                httpOnly: true,
                maxAge: ACCESS_TOKEN_EXPIRE * 1000 
            });

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: REFRESH_TOKEN_EXPIRE * 1000 
            });

            req.userid = decode.id;
            req.userEmail = decode.email;

            return next();
        });
    }
}
