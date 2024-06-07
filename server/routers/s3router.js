import express from 'express'
import { _addWordRecord, _getImageByName, _getSignedUrl } from '../controllers/s3controller.js';

const routerS3 = express.Router();

routerS3.get('/getimg/:name', _getImageByName)
routerS3.get('/gettesturl', _getSignedUrl)
routerS3.post('/addurl', _addWordRecord)

export default routerS3;