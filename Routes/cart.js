import express from "express";
import { addToCart, fetchCart } from "../controllers/cartController.js";

const route = express.Router();

route.post("/addtocart", addToCart);
route.get("/mycart/:id", fetchCart);

export default route;
