import express from "express";
import { Product } from "../db/schema";

const router = express.Router();

// Serve up all products on a GET call to /
router.get('/', async (req, res) => {

    const products = await Product.find({});
    res.json(products);

});

export default router;