const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      bookAuthor: String,
      bookName: String,
      bookImage: String,
      bookPrice: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  customerName: String,
  customerAddress: String,
  customerPhone: String,
  totalPrice: Number,
  totalBooks: Number,
  orderDateTime: { type: Date, default: Date.now } 
}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
