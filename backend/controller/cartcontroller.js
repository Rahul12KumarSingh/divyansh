const Cart = require("../models/cart");
const Product = require("../models/product");

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cartItem = await Cart.findOne({ where: { userId, productId } });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await Cart.create({ userId, productId, quantity });
        }

        res.json({ message: "Product added to cart" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        await Cart.destroy({ where: { userId, productId } });
        res.json({ message: "Product removed from cart" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartItems = await Cart.findAll({
            where: { userId },
            include: [{ model: Product }]
        });

        let total = 0;
        cartItems.forEach(item => {
            total += item.Product.price * item.quantity;
        });

        let discount = total > 5000 ? 0.2 : total > 1000 ? 0.1 : 0;
        let discountedTotal = total - (total * discount);

        res.json({ cartItems, total, discount: discount * 100, discountedTotal });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
