// src/seedProducts.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/productModel.js";

// 1️⃣ Load env at the very top
dotenv.config();

// 2️⃣ Check if MONGO_URI exists
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is missing in .env");
  process.exit(1);
}

// 3️⃣ Connect to MongoDB
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

// 4️⃣ Seed data
const seedProducts = async () => {
  const products = [
    {
      name: "Apple iPhone 15",
      price: 999,
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-red-select-202309",
    },
    {
      name: "Samsung Galaxy S23",
      price: 899,
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s911bzkdins/gallery/in-galaxy-s23-5g-s911-sm-s911bzkdins-534587585",
    },
    {
      name: "Sony WH-1000XM5 Headphones",
      price: 399,
      image: "https://cdn.mos.cms.futurecdn.net/kPjX4Pn6k5UXfUE6ajBQkS.jpg",
    },
    {
      name: "Dell XPS 13 Laptop",
      price: 1199,
      image:
        "https://i.dell.com/is/image/DellContent//content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/13-9330/media-gallery/xps-13-9330-laptop-gallery-504x350.jpg",
    },
    {
      name: "Apple MacBook Air M2",
      price: 1249,
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-spacegray-select-202206?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1653493200207",
    },
    {
      name: "Google Pixel 8",
      price: 799,
      image:
        "https://store.google.com/product/images/phone_pixel_8_color_sorta_sage.png",
    },
    {
      name: "Nike Air Max 270",
      price: 150,
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/00616da6-c486-4720-bc2a-1e2f7d60f4c3/air-max-270-shoe-KkLcGR.png",
    },
    {
      name: "Adidas Ultraboost 22",
      price: 180,
      image:
        "https://assets.adidas.com/images/w_600,f_auto,q_auto/8b7dbbce18f443e28da2aba700d5648f_9366/Ultraboost_22_Shoes_White_HY7656_01_standard.jpg",
    },
    {
      name: "Canon EOS R6 Camera",
      price: 2499,
      image:
        "https://www.usa.canon.com/internet/wcm/connect/us/7792b9a3-7f9a-409d-9b1d-0c579d1c1d27/eos-r6-front.png?MOD=AJPERES",
    },
    {
      name: "Samsung 55-inch QLED TV",
      price: 899,
      image:
        "https://images.samsung.com/is/image/samsung/p6pim/in/qn55q60bafxza/gallery/in-qled-q60b-qn55q60bafxza-529240067",
    },
    {
      name: "Apple AirPods Pro 2",
      price: 249,
      image:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-select-202210?wid=532&hei=582&fmt=png-alpha&.v=1664416565127",
    },
    {
      name: "Logitech MX Master 3 Mouse",
      price: 99,
      image:
        "https://resource.logitech.com/w_800,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3/gallery/mx-master-3-top.png?v=1",
    },
    {
      name: "Amazon Echo Dot (5th Gen)",
      price: 49,
      image:
        "https://m.media-amazon.com/images/I/61KIy6gX-CL._AC_SL1000_.jpg",
    },
    {
      name: "Fitbit Charge 5",
      price: 129,
      image:
        "https://static1.fitbit.com/simple.b-cssdisabled-png.hd/1f50f1b67e64c6f7f8e5e12ed7f2b872.png",
    },
    {
      name: "Sony PlayStation 5",
      price: 499,
      image: "https://www.sony.com/image/ps5-console-01.jpg",
    },
  ];

  try {
    await Product.deleteMany(); // remove existing products
    await Product.insertMany(products);
    console.log("✅ 15 Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding products:", error.message);
    process.exit(1);
  }
};

// 5️⃣ Run
connectDb().then(seedProducts);
