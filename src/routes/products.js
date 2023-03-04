const router = require('express').Router();
const controllers = require('../controllers/products');
const authenticateToken = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const checkAdmin = require('../middlewares/admin');


router.get('/products', controllers.getProducts);
router.get('/products/:id', controllers.getProduct);
router.post('/product', authenticateToken, checkAdmin, controllers.createProduct);
router.put('/product/:id', authenticateToken, checkAdmin, controllers.updateProduct);
router.delete('/product/:id', authenticateToken, checkAdmin, controllers.deleteProduct);

module.exports = router;
