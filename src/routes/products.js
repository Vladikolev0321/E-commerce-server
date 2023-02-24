const router = require('express').Router();
const controllers = require('../controllers/products');

router.get('/products', controllers.getProducts);
router.get('/products/:id', controllers.getProduct);

module.exports = router;
