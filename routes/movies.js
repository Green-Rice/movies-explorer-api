const movies = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const validationURL = require('../validation/urlValidation');

movies.get('/movies', getMovies);

movies.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationURL),
    trailerLink: Joi.string().required().custom(validationURL),
    thumbnail: Joi.string().required().custom(validationURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

movies.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = movies;
