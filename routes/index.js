const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { signIn, signUp } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), signUp);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), signIn);

router.use(auth);

router.use('/', userRouter);
router.use('/', movieRouter);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

module.exports = router;
