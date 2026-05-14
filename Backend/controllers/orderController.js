import Order from "../models/order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {

  try {

    const { userId, address } = req.body;

    // Validation
    if (!userId) {

      return res.status(400).json({
        message: "User ID missing"
      });

    }

    // Get Cart
    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    // Empty cart check
    if (!cart || cart.items.length === 0) {

      return res.status(400).json({
        message: "Cart is empty"
      });

    }

    // Remove invalid products
    const validItems = cart.items.filter(
      item => item.productId
    );

    if (validItems.length === 0) {

      return res.status(400).json({
        message: "No valid products found"
      });

    }

    // Create order items
    const orderItems = validItems.map(item => ({

      productId: item.productId._id,

      quantity: item.quantity,

      price: item.productId.price

    }));

    // Calculate total
    const totalAmount = orderItems.reduce(

      (total, item) =>
        total + item.price * item.quantity,

      0
    );

    // Update Stock
    for (const item of validItems) {

      // Stock check
      if (item.productId.stock < item.quantity) {

        return res.status(400).json({
          message: `${item.productId.title} is out of stock`
        });

      }

      await Product.findByIdAndUpdate(

        item.productId._id,

        {
          $inc: {
            stock: -item.quantity
          }
        }
      );
    }

    // Create Order
    const newOrder = new Order({

      userId,

      items: orderItems,

      address,

      totalAmount,

      paymentMethod: "COD",

      status: "Placed"

    });

    await newOrder.save();

    // Clear Cart
    cart.items = [];

    await cart.save();

    // Success
    res.status(201).json({

      message: "Order placed successfully",

      order: newOrder

    });

  } catch (error) {

    console.log("ORDER ERROR:", error);

    res.status(500).json({

      message: "Internal server error",

      error: error.message

    });

  }
};