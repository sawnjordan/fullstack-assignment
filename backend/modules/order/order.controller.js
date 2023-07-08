const OrderModel = require("./order.model");

class OrderController {
  createNewOrder = async (req, res, next) => {
    try {
      const orderData = req.body;
      const { books, totalPrice, paymentInfo, shippingAddress } = orderData;
      const order = await new OrderModel({
        books,
        totalPrice,
        paymentInfo,
        shippingAddress,
        paidAt: Date.now(),
        user: req.user._id,
      }).save();

      res.status(201).json({ status: "success", response: order });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getSingleOrder = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await OrderModel.find({
        _id: orderId,
        user: req.user.id,
      }).populate("user", "name email");
      if (!order) {
        return res.status(404).json({
          status: "Not Found",
          response: `No order found with ID: ${orderId}`,
        });
      } else {
        res.status(200).json({ status: "success", response: order });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getMyOrder = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const order = await OrderModel.find({ user: userId });
      if (!order) {
        return res.status(404).json({
          status: "Not Found",
          response: `No order found for user with ID: ${userId}`,
        });
      } else {
        res.status(200).json({ status: "success", response: order });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

const orderControllerObj = new OrderController();

module.exports = { OrderController, orderControllerObj };
