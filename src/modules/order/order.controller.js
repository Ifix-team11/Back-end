const orderService = require("./order.service");

exports.create = async (req, res) => {
    try {

        const order = await orderService.createOrder(
            req.user.id,
            req.body,
            req.files
        );

        res.status(201).json({
            message: "Order created successfully",
            order,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};

exports.getMyOrders = async (req, res) => {
    try {

        const orders = await orderService.getMyOrders(req.user);

        res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};

exports.getAvailableOrders = async (req, res) => {
    try {

        const orders = await orderService.getAvailableOrders();

        res.status(200).json({
            message: "Available orders fetched successfully",
            orders,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};

exports.getById = async (req, res) => {
    try {

        const order = await orderService.getOrderById(req.params.id);

        res.status(200).json({
            message: "Order fetched successfully",
            order,
        });

    } catch (error) {

        res.status(404).json({
            message: error.message,
        });

    }
};

exports.updateStatus = async (req, res) => {
    try {

        const { status, rejectionReason } = req.body;

        const order = await orderService.updateOrderStatus(
            req.params.id,
            req.user,
            status,
            rejectionReason
        );

        res.status(200).json({
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {

        res.status(400).json({
            message: error.message,
        });

    }
};
