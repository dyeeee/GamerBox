import mongoose from 'mongoose';
import { Product, Order } from './schema';

// Hardcoded products list for testing
const products = [
    { name: 'Abra', cost: 180, image: '/images/Abra.png' },
    { name: 'Clefairy', cost: 500, image: '/images/Clefairy.png' },
    { name: 'Nidorina', cost: 1200, image: '/images/Nidorina.png' },
    { name: 'Dratini', cost: 2800, image: '/images/Dratini.png' },
    { name: 'Scyther', cost: 5500, image: '/images/Scyther.png' },
    { name: 'Porygon', cost: 9999, image: '/images/Porygon.png' }
];

// This is a standalone program which will populate the database with initial data.
async function run() {
    console.log('Connecting to database...');
    await mongoose.connect('mongodb://localhost:27017/gamebox');

    // Clear db
    await Order.deleteMany({});
    await Product.deleteMany({});

    await Product.insertMany(products);

    await mongoose.disconnect();
    console.log('Done!');
}

run();