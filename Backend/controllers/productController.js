import Product from "../models/Product.js";

// Create Product
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.json({
      message: "Product created successfully",
      product: newProduct
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};

// Get Products
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Product updated successfully",
      product: updated
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      error: err.message
    });
  }
};