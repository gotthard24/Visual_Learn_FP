import { db } from '../config/db.js'

export const register = async ({email, password}) => {
    try {
        const [user] = await db('users').insert({email, password}, [
            'id',
            'email',
        ]);
        return user
    } catch (error) {
        console.log(`Registration error: ${error}`);
        throw new Error('registration failed')
    }
}