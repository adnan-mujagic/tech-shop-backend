const Order = require("../models/orderModel");
const { updateEntity } = require("./updateEntity");

class OrderFactory {
  static createOrder(body) {
    let order = new Order();
    updateEntity(order, body);
    return order;
  }
}

module.exports = OrderFactory;
