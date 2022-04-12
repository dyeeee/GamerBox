import express from "express";

const router = express.Router();

// Adds both the /products and /orders routes.
import products from './products';
import orders from './orders';
router.use('/products', products);
router.use('/orders', orders);

export default router;