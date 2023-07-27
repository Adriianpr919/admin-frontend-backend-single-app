import express from 'express';
import Order from '../../models/orders/orderModel.js';

const orderRouter = express.Router();

//create order
orderRouter.post('/add', async (req, res) => {

    const newOrder = new Order({

        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        userId: req.body.userId,
        name: req.body.name,
        document: req.body.document,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        marker: req.body.marker,
        departments: req.body.departments,
        city: req.body.city,
        subTotal: req.body.subTotal,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice

    });

    const order = await newOrder.save();
    res.status(201).send({ message: '¡.Nuevo Orden Creado.!', order });

});

// update order -> from admin panel
orderRouter.put('/update', async (req, res) => {

    const newOrder = await Order.findById(req.body._id);

    //if order exists
    if (newOrder) {
        newOrder.name = req.body.name || newOrder.name;
        newOrder.document = req.body.document || newOrder.document;
        newOrder.email = req.body.email || newOrder.email;
        newOrder.address = req.body.address || newOrder.address;
        newOrder.phone = req.body.phone || newOrder.phone;
        newOrder.marker = req.body.marker || newOrder.marker;
        newOrder.departments = req.body.departments || newOrder.departments;
        newOrder.city = req.body.city || newOrder.city;
        newOrder.isPaid = req.body.isPaid || newOrder.isPaid;
        newOrder.isDelivered = req.body.isDelivered || newOrder.isDelivered;

        const updatedOrder = await newOrder.save();
        res.send({

            _id: updatedOrder._id,
            name: updatedOrder.name,
            document: updatedOrder.document,
            email: updatedOrder.email,
            address: updatedOrder.address,
            phone: updatedOrder.phone,
            marker: updatedOrder.marker,
            departments: updatedOrder.departments,
            city: updatedOrder.city,
            isPaid: updatedOrder.isPaid,
            isDelivered: updatedOrder.isDelivered,

        });
    } else {

        res.status(401).send({ message: '¡.Pedido NO Encontrado.!' });

    }
});

//get all orders for user
orderRouter.get('/all', async (req, res) => {
    const orders = await Order.find();
    res.send(orders);
});


//get mine orders
orderRouter.get('/mine/:id', async (req, res) => {

    const orders = await Order.find({ userId: req.params.id });
    res.send(orders);

});

//get my one order
orderRouter.get('/find/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: '¡.Pedido NO Encontrado.!' });
    }
});

//count order for admin panel
orderRouter.get('/countOrders', async (req, res) => {

    try {
        const countOrders = await Order.countDocuments();
        res.status(200).json({ count: countOrders });

    } catch (err) {
        console.log(err.message);
    }

});

//count sum total for admin panel
orderRouter.get('/countSumTotal', async (req, res) => {

    try {
        const countSumTotal = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalPrice' } } }]);
        res.status(200).json(countSumTotal);

    } catch (err) {
        console.log(err.message);
    }

});

export default orderRouter;