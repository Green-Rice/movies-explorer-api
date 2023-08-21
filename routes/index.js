const router = require('express').Router();
const userRouter = require('./users');
const { signIn, signUp } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', signUp);
router.post('/signin', signIn);

router.use(auth);

router.use('/', userRouter);

module.exports = router;
