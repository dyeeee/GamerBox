import express from "express";

const router = express.Router();

// Adds both the /products and /orders routes.
import products from './products';
import orders from './orders';
import steamApi from './steamApi';
router.use('/products', products);
router.use('/orders', orders);
router.use('/steamApi',steamApi);

export default router;