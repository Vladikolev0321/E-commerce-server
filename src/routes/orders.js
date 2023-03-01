const router = require('express').Router();
const controllers = require('../controllers/orders');
const authenticateToken = require('../middlewares/auth');

router.post('/order', authenticateToken, controllers.createOrder);
router.get('/orders', authenticateToken, controllers.getOrders);

module.exports = router;
