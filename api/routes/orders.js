const express = require('express');
const router = express.Router();


// Handle incoming GET requests to /orders
router.get('/', (req, res, nex) => {
    res.status(200).json({
        message: 'Orders were fetched'
    });
});

router.post('/', (req, res, nex) => {
    res.status(201).json({
        message: 'Orders was created'
    });
});

router.get('/:orderId', (req, res, nex) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, nex) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    });
});




module.exports = router;