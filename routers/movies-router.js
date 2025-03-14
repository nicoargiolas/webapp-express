const express = require('express');
const moviesRouter = express.Router();

// importazione controller
const moviesController = require('../controllers/movies-controller');

// Importazione del middleware multer per upload file
const upload = require('../middlewares/multer');

// rotte
moviesRouter.get('/', moviesController.index);

moviesRouter.get('/:id', moviesController.show);

moviesRouter.post('/:id/reviews', moviesController.storeReview);

moviesRouter.post('/', upload.single('image'), moviesController.store);

module.exports = moviesRouter;