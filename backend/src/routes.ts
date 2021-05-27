import OrphanagesController from './controllers/OrphanagesController'


import{Router} from 'express';

import multer from 'multer';

import configUploads from './config/upload';


const routes = Router();
const upload = multer(configUploads);


routes.get('/orphanages', OrphanagesController.index);


routes.get('/orphanages/:id',OrphanagesController.show);


routes.post('/orphanages', upload.array('images'), OrphanagesController.create );


export default routes;