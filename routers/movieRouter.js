import express from 'express';

const router = express.Router();

import { index, show } from '../controllers/movieController.js';

//Routes for movies

//index
//localhost:3000/movies
router.get('/', index);

//show
//localhost:3000/movies/:id
router.get('/:id', show);

//destroy
//localhost:3000/movies/:id
// router.delete('/:id', destroy);

export default router;