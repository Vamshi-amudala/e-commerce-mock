import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./models/productModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });
console.log("MONGO_URI =", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is missing in .env");
  process.exit(1);
}

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB for seeding");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const fetchFakeStoreProducts = async () => {
  const url = "https://fakestoreapi.com/products";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`FakeStoreAPI responded with ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch from FakeStoreAPI:", err.message);
    throw err;
  }
};

const seedProducts = async () => {
  try {
    const remoteProducts = await fetchFakeStoreProducts();

    const mappedProducts = remoteProducts.map((p) => ({
      name: p.title ?? p.name ?? "Unnamed product",
      price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
      image: p.image ?? "",
      description: p.description ?? "",
      category: p.category ?? "uncategorized",
    }));

    await Product.deleteMany();
    await Product.insertMany(mappedProducts); // <-- use mappedProducts directly
    console.log(`${mappedProducts.length} Products seeded successfully!`);
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error.message);
    process.exit(1);
  }
};

connectDb().then(seedProducts);
