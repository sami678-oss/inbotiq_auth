import mongoose from "mongoose";



const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, default: "https://via.placeholder.com/300x200" },
    rateing:{type:Number,default:0,min:[1,"rating must be more than one"]}
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
