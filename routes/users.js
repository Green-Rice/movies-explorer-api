const user = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

user.get('/users/me', getUser);
user.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

module.exports = user;
