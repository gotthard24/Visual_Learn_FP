import { db } from '../config/db.js'

export const addWordRecord = async (wordData) => {
    try {
        await db('words_s3').insert(wordData);
    } catch (error) {
        console.error('Adding s3 data failed:', error);
        throw new Error('Adding s3 data failed');
    }
};

export const getImageByName = async(name) => {
    try {
        const image = await db('words_s3')
            .select('id', 'word', 'word_heb', 'word_rus','url', 'level')
            .where("word", name)
            .first()
        return image
    } catch (error) {
        console.error('Getting s3 data failed:', error);
        throw new Error('Getting s3 data failed');
    }
}