const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Product = require("./product");

const Cart = sequelize.define("Cart", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
    productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: "id" } },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, { timestamps: false });

Cart.belongsTo(User, { foreignKey: "userId" });
Cart.belongsTo(Product, { foreignKey: "productId" });

module.exports = Cart;
