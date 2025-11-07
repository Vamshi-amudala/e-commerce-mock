import express from "express";
import { getCart, addToCart, deleteFromCart, checkout } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCart);
router.post("/", addToCart);
router.delete("/:id", deleteFromCart);
router.post("/checkout", checkout);

export default router;
