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
}

const orderControllerObj = new OrderController();

module.exports = { OrderController, orderControllerObj };
