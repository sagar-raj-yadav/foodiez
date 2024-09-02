import mongoose  from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  name: {
     type: String, required: true
    },
  quantity: {
    type: Number, required: true 
  },
  price: {
     type: Number, required: true
     },
  size: { 
    type: String, required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now
   }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
