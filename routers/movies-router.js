const express = require('express');
const moviesRouter = express.Router();

// importazione controller
const moviesController = require('../controllers/movies-controller');

// rotte
moviesRouter.get('/', moviesController.index);

moviesRouter.get('/:id', moviesController.show);

module.exports = moviesRouter;