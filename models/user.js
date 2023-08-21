const { Schema, model } = require('mongoose');
const validator = require('validator');

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
  { versionKey: false }
);

module.exports = model('user', userSchema);