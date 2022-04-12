import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    cost: Number,
    image: String
});

const Product = mongoose.model('Product', productSchema);

const orderSchema = new Schema({
    order: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Order = mongoose.model('Order', orderSchema);

export { Product, Order };