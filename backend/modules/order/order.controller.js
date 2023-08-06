const OrderModel = require("./order.model");
const { orderServiceObj } = require("./order.services");

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

  getAllOrder = async (req, res, next) => {
    try {
      const orders = await OrderModel.find();
      let totalAmount = 0;
      orders.map((item) => {
        totalAmount += item.totalPrice;
      });
      res.status(200).json({ success: true, response: orders, totalAmount });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateOrder = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await OrderModel.findById(orderId);
      if (order.orderStatus === "Delivered") {
        return res.statu(400).json({
          success: true,
          response: "You have already delivered this order.",
        });
      }
      // console.log(order);
      order.books.map(async (item) => {
        await orderServiceObj.updateStock(item.book, item.quantity);
      });
      order.orderStatus = req.body.status;
      order.deliveredAt = Date.now();
      await order.save({ validateBeforeSave: false });
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  deleteOrder = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      let response = await OrderModel.findOneAndDelete({ _id: orderId });
      // console.log(response);
      if (!response) {
        return res.status(404).json({
          success: true,
          msg: "No Order found.",
        });
      }
      res.status(200).json({
        success: true,
        msg: `Order deleted.`,
        response,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  };
}

const orderControllerObj = new OrderController();

module.exports = { OrderController, orderControllerObj };
