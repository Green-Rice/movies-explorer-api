const user = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');

user.get('/users/me', getUser);
user.patch('/users/me', updateUser);

module.exports = user;
