const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');

const validationURL = (value) => {
  if (!validator.isURL(value)) {
    throw new BadRequestError('Ссылка не является валидной');
  } else {
    return value;
  }
};

module.exports = validationURL;
