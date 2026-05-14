import Cart from '../models/Cart.js';


// Add To Cart
export const addToCart = async (req, res) => {

  try {

    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    // Create Cart
    if (!cart) {

      cart = new Cart({
        userId,
        items: [
          {
            productId,
            quantity: 1
          }
        ]
      });

    } else {

      // Check Existing Product
      const item = cart.items.find(
        i => i.productId.toString() === productId
      );

      // Increase Quantity
      if (item) {

        item.quantity += 1;

      } else {

        // Add New Product
        cart.items.push({
          productId,
          quantity: 1
        });

      }
    }

    await cart.save();

    // Populate Product Details
    await cart.populate("items.productId");

    res.json({
      message: "Item added to cart",
      cart
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};


// Remove Item
export const removeItem = async (req, res) => {

  try {

    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {

      return res.status(404).json({
        message: "Cart not found"
      });

    }

    cart.items = cart.items.filter(
      i => i.productId.toString() !== productId
    );

    await cart.save();

    await cart.populate("items.productId");

    res.json({
      message: "Item removed",
      cart
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};


// Update Quantity
export const updateQuantity = async (req, res) => {

  try {

    const {
      userId,
      productId,
      quantity
    } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {

      return res.status(404).json({
        message: "Cart not found"
      });

    }

    const item = cart.items.find(
      i => i.productId.toString() === productId
    );

    if (!item) {

      return res.status(404).json({
        message: "Item not found"
      });

    }

    // Quantity Validation
    if (quantity < 1) {

      return res.status(400).json({
        message: "Quantity must be at least 1"
      });

    }

    item.quantity = quantity;

    await cart.save();

    await cart.populate("items.productId");

    res.json({
      message: "Quantity updated",
      cart
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};


// Get Cart
export const getCart = async (req, res) => {

  try {

    const { userId } = req.params;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    // Empty Cart
    if (!cart) {

      return res.json({
        items: []
      });

    }

    // Remove broken products
    cart.items = cart.items.filter(
      item => item.productId
    );

    res.json(cart);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};