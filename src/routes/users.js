const router = require('express').Router();
const controllers = require('../controllers/users');
const authenticateToken = require('../middlewares/auth');

router.post('/register', controllers.register);
router.post('/signin', controllers.login);
router.get('/getData', authenticateToken, controllers.getData);


module.exports = router;