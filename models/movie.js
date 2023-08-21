const { Schema, model } = require('mongoose');
const validator = require('validator');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле country обязательно для заполениня'],
    },
    director: {
      type: String,
      required: [true, 'Поле director обязательно для заполениня'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле duration обязательно для заполениня'],
    },
    year: {
      type: String,
      required: [true, 'Поле year обязательно для заполениня'],
    },
    description: {
      type: String,
      required: [true, 'Поле description обязательно для заполениня'],
    },
    image: {
      type: String,
      required: [true, 'Поле image обязательно для заполениня'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Ссылка не является валидной',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле trailerLink обязательно для заполениня'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Ссылка не является валидной',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле thumbnail обязательно для заполениня'],
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Ссылка не является валидной',
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле owner обязательно для заполениня'],
    },
    movieId: {
      type: Number,
      required: [true, 'Поле movieId обязательно для заполениня'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле nameRu обязательно для заполениня'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле nameEn обязательно для заполениня'],
    },
  },
  { versionKey: false }
);

module.exports = model('movie', movieSchema);