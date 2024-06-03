import { db } from '../config/db.js'

export const register = async ({email, password}) => {
    try {
        const [user] = await db('users').insert({email, password}, [
            'id',
            'email',
        ]);
        
        await db('users_total_progress').insert({
            email: user.email
        });

        
        await db('progress_by_levels').insert({
            email: user.email,
            level: 1 
        });
        
        return user
    } catch (error) {
        console.log(`Registration error: ${error}`);
        throw new Error('registration failed')
    }
}

export const login = async (email) => {
    try {
        const user = db('users')
        .select('id', 'email', 'password')
        .where({email})
        .first()
        return user || null
    } catch (error) {
        console.log(`Login Error: ${error}`);      
        throw new Error('Login Failed') 
    }
}

export const getWords = async (email) => {
    try {
        const words = db('words')
        .select('id', 'word', 'word_in_hebrew', 'word_in_russian', 'level')
        return words
    } catch (error) {
        console.log(`Get all words: ${error}`);      
        throw new Error('Get all words Failed') 
    }
}