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

export const getWordsByLevel = async (level) => {
    try {
        const words = await db('words')
        .select('id', 'word', 'word_in_hebrew', 'word_in_russian', 'level')
        .where('level', level)
        return words
    } catch (error) {
        console.log(`Get all words: ${error}`);      
        throw new Error('Get all words Failed') 
    }
}

export const getUsersProgress = async () => {
    try {
        const results = db('users_total_progress')
        .select('email', 'score')
        .orderBy('score', 'desc')
        return results
    } catch (error) {
        console.log(`Get results: ${error}`);      
        throw new Error('Get results Failed') 
    }
}

export const addScoreByEmail = async ({ email, score }) => {
    try {
        await db('users_total_progress')
            .where({ email })
            .increment('score', score);
        return score
    } catch (error) {
        console.log(`Adding score: ${error}`);
        throw new Error('Adding score failed');
    }
};

export const resetProgressByEmail = async(email) => {
    try {
        await db('users_total_progress')
            .where({ email })
            .update({
                score: 0,
                progress: 1
            });
    } catch (error) {
        console.log(`Reset: ${error}`);
        throw new Error('Reset failed');
    }
}

export const changeLanguageByEmail = async({email, language}) => {
    try {
        await db('users')
            .where({ email })
            .update({language});
    } catch (error) {
        console.log(`changeLanguage: ${error}`);
        throw new Error('changeLanguage failed');
    }
}

export const getLanguageByEmail = async(email) => {
    try {
        const [language] = await db('users')
            .select('language')
            .where({ email })
        return language
    } catch (error) {
        console.log(`getLanguage: ${error}`);
        throw new Error('getLanguage failed');
    }
}

export const getUserScoreByName = async (email) => {
    try {
        const userProgress = await db('users_total_progress')
            .select('score')
            .where({ email })
            .first();

        if (!userProgress) {
            throw new Error('User progress not found');
        }

        const { score } = userProgress;
        return score;
    } catch (error) {
        console.log(`getScore: ${error}`);
        throw new Error('getScore failed');
    }
};

export const changeDifficultyByEmail = async({email, difficulty}) => {
    try {
        await db('users')
            .where({ email })
            .update({difficulty});
    } catch (error) {
        console.log(`changeDifficulty: ${error}`);
        throw new Error('change Difficulty failed');
    }
}

export const getDifficultyByEmail = async(email) => {
    try {
        const [difficulty1] = await db('users')
            .select('difficulty')
            .where({ email })
        const {difficulty} = difficulty1
        return difficulty
    } catch (error) {
        console.log(`getDifficulty: ${error}`);
        throw new Error('get Difficulty failed');
    }
}

export const addProgressByEmail = async (email) => {
    try {
        await db('users_total_progress')
            .where({ email })
            .increment('progress', 1);
    } catch (error) {
        console.log(`Adding progress: ${error}`);
        throw new Error('Adding progress failed');
    }
};

export const getUserProgressByEmail = async (email) => {
    try {
        const userProgress = await db('users_total_progress')
            .select('progress')
            .where({ email })
            .first();

        if (!userProgress) {
            throw new Error('User progress not found');
        }

        const { progress } = userProgress;
        return progress;
    } catch (error) {
        console.log(`getProgress: ${error}`);
        throw new Error('getProgress failed');
    }
};