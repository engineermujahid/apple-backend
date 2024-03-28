import { cart } from "../Models/cartModel.js";
import { user } from "../Models/userModel.js";
import { product } from "../Models/productModel.js";

export const addToCart = async (req, res) => {
    try {
        const userId = req.query.userId;
        const productId = req.query.productId;
        const quantity = req.body.quantity;
        const findUser = await user.findById(userId);
        const findProduct = await product.findById(productId);
        if (!findUser || !findProduct) {
            return res.status(404).json({ message: "Either user or procut is not found" });
        }
        const cartItem = new cart({
            user: userId,
            product: productId,
            quantity: quantity,
        });
        await cartItem.save();
        return res.status(200).json({ cartItem });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchCart = async (req, res) => {
    try {
        const cartId = req.params.id;
        const cartItem = await cart.findById(cartId).populate("user", "name email userName").populate("product", "name price description");
        if (!cartItem) {
            return res.status(404).json({ message: "Cart does not exist" });
        }
        res.status(200).json({ success: true, cartItem });
    } catch (error) {}
};
