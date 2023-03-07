const router = require('express').Router();
const controllers = require('../controllers/orders');
const checkAdmin = require('../middlewares/admin');
const authenticateToken = require('../middlewares/auth');

router.post('/order', authenticateToken, controllers.createOrder);
router.get('/orders', authenticateToken, controllers.getOrders);
router.get('/orders/:id', authenticateToken, controllers.getOrder);
router.get('/all-orders', authenticateToken, checkAdmin, controllers.getAllOrders);

module.exports = router;
