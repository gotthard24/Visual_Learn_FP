import dotenv from 'dotenv';
import AWS from 'aws-sdk';
import { addWordRecord, getImageByName } from '../models/s3model.js';
dotenv.config();

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

export const _addWordRecord = async (req, res) => {
    try {    
        const params = {
            Bucket: 'visual-english-fp',
            Key: 'photo_5407056443900816425_y.jpg',
        };
        
        const url = await new Promise((resolve, reject) => {
            s3.getSignedUrl('getObject', params, (err, url) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(url);
                }
            });
        });
        
        const wordData = {
            word: req.body.word,
            word_heb: req.body.word_heb,
            word_rus: req.body.word_rus,
            url: url,
            level: req.body.level,
        };

        await addWordRecord(wordData);

        res.status(201).json({ msg: 's3 url successfully added' });
    } catch (error) {
        console.error('s3 url add failed:', error);
        res.status(500).json({ error: 's3 url add failed' });
    }
};

export const _getImageByName = async(req, res) => {
    const name = req.params.name
    try {
        const image = await getImageByName(name)
        // console.log(image);
        // console.log('name', name);
        if(!image) return res.status(500).json({msg: 'Image not found'})
        res.json(image)
    } catch (error) {
        console.log(`_getImage => ${error}`);
        res.status(404).json({msg: 'getting image failed'})
    }
}

export const _getSignedUrl = async(req, res) => {
    try {    
        const params = {
            Bucket: 'visual-english-fp',
            Key: 'photo_5407056443900816425_y.jpg',
        };
        
        const url = await new Promise((resolve, reject) => {
            s3.getSignedUrl('getObject', params, (err, url) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(url);
                }
            });
        });

        res.status(201).json({ msg: 's3 url successfully added', url });
    } catch (error) {
        console.error('s3 SIGNED url add failed:', error);
        res.status(500).json({ error: 's3 SIGNED url add failed' });
    }
}