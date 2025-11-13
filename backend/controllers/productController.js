import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    console.log("📥 Incoming Product Data:", req.body); 

    const { name, price, description, category, image, rateing } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      name,
      price,
      description,
      category,
      image: image || "https://i.ibb.co/TDHMqg8C/Product.jpg",
      rateing: rateing || 0,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("❌ Error in createProduct:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findone({ userId: req.userId });
    if (!wishlist) {
      return res.json({ prooducts: [] });
    }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
