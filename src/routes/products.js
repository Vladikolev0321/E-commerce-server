const router = require('express').Router();
const controllers = require('../controllers/products');
const authenticateToken = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const checkAdmin = require('../middlewares/admin');


router.get('/products', controllers.getProducts);
router.get('/products/:id', controllers.getProduct);
router.post('/product', authenticateToken, checkAdmin, controllers.createProduct);

module.exports = router;
