const Movies = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  Movies.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params.movieId).orFail(new NotFoundError('Фильм не найден.'))
    .then((movie) => {
      if (String(req.user._id) === String(movie.owner)) {
        Movies.findByIdAndRemove(req.params.movieId)
          .then((deletedMovie) => res.send(deletedMovie))
          .catch(next);
      } else {
        next(new ForbiddenError('У вас нет прав на удаление'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
