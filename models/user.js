const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthrisedError = require('../errors/UnauthorizedError');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле email должно быть заполнено.'],
      unique: [true, 'Пользователь с таким Email уже существует.'],
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Введите пожалуйста Email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле password должно быть заполнено'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Поле name должно быть заполнено'],
      minlength: [2, 'Минимальная длинна поля - 2'],
      maxlength: [30, 'Минимальная длинна поля - 30'],
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthrisedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthrisedError('Неправильные почта или пароль'));
        }

        return user;
      });
    });
};

module.exports = model('user', userSchema);
