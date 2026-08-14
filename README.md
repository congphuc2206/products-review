# ⚡ FlexiReview — Beginner-Friendly Product Review Web App

A clean, modern, and beginner-friendly web application designed to demonstrate **MongoDB's Flexible Document Structure** using Node.js, Express, Mongoose, and Vanilla HTML/CSS/JavaScript.

---

## 🎯 Main Learning Goal: MongoDB's Flexible Schema

In a traditional relational database (SQL), all rows in a table must adhere to a strict, pre-defined schema with rigid columns. Adding category-specific specifications (e.g. *RAM* for Laptops vs. *Sole Type* for Shoes) usually requires complex Entity-Attribute-Value (EAV) tables, sparse tables with dozens of `NULL` columns, or frequent migrations.

### How MongoDB Solves This:
MongoDB stores data as BSON documents. In this project:
1. **Dynamic Specifications**: Every document in the `products` collection has a `specifications` object (`mongoose.Schema.Types.Mixed`). A **MacBook** stores CPU/RAM/Storage, while a **Running Shoe** stores Midsole/Drop/Weight, and a **Book** stores Author/ISBN/Pages — all in the same collection!
2. **Flexible Embedded Arrays**: The `reviews` collection stores dynamic arrays for `pros`, `cons`, `tags`, and `images` without requiring separate junction tables.

| Product Category | Example Stored Specifications in MongoDB Document |
| :--- | :--- |
| **Electronics / Laptop** | `{"Processor": "M3 Pro", "RAM": "18GB", "Storage": "512GB SSD", "Display": "14.2 inch"}` |
| **Footwear / Shoe** | `{"Upper Material": "Flyknit", "Midsole": "ZoomX", "Drop": "8mm", "Weight": "180g"}` |
| **Home & Kitchen** | `{"Pump Pressure": "15 Bar", "Tank Capacity": "1.0L", "Wattage": "1300W"}` |
| **Books** | `{"Author": "Robert C. Martin", "Pages": "464", "ISBN-13": "978-0132350884"}` |

---

## 🛠️ Tech Stack

- **Backend**: Node.js & Express
- **Database**: MongoDB & Mongoose
- **Frontend**: Vanilla HTML5, Modern CSS (Responsive Custom Properties & Grid), Vanilla JavaScript (Fetch API)
- **No React • No Docker • No Authentication Required**

---

## ✨ Features

- **Product Catalog**:
  - Filter by dynamic categories (Electronics, Footwear, Audio, Books, etc.)
  - Real-time search across names, tags, categories, and descriptions
  - Sort by Newest, Highest Rated, Price (Low/High), or Name
  - Dynamic spec pills preview directly on product cards
- **Product Detail View**:
  - Full product specs table dynamically rendered from MongoDB key-value fields
  - 5-Star rating distribution breakdown & aggregate score
  - Full customer review list with pros, cons, tags, and attached photo gallery
- **Review Submission & Rating System**:
  - Interactive 1-to-5 star rating picker
  - Dynamic **Pros** list and **Cons** list (MongoDB flexible arrays)
  - Review tags & customer photo URLs
  - Automatic recalculation of product `averageRating` and `reviewCount` via MongoDB aggregation pipeline
- **Full CRUD Operations**:
  - **Create / Edit Product**: Includes a dynamic Key-Value spec builder to add any custom spec fields on the fly
  - **Delete Product**: Automatically deletes the product and cascade removes associated reviews
  - **Create / Edit Review**: Update rating, headline, comments, pros, and cons
  - **Delete Review**: Automatically updates the product's average rating

---

## 📁 Project Structure

```
product-review-app/
├── .env.example            # Environment variables template
├── .env                    # Active environment variables (placeholder)
├── package.json            # Project dependencies and npm scripts
├── server.js               # Main Express application entry point
├── src/
│   ├── config/
│   │   └── db.js           # Mongoose MongoDB connection setup
│   ├── models/
│   │   ├── Product.js      # Product schema with flexible specifications
│   │   └── Review.js       # Review schema with pros, cons, tags & aggregation
│   ├── routes/
│   │   ├── productRoutes.js# Product CRUD & search/filter API
│   │   └── reviewRoutes.js # Review CRUD & rating stats API
│   └── seed/
│       ├── seedData.js     # Diverse sample products & realistic reviews
│       └── seeder.js       # Database seeder execution script
├── public/
│   ├── index.html          # Semantic HTML5 frontend
│   ├── css/
│   │   └── styles.css      # Modern responsive CSS design system
│   └── js/
│       ├── api.js          # Fetch API client wrapper
│       └── app.js          # Dynamic UI rendering & state management
└── README.md               # Beginner documentation & API guide
```

---

## 🚀 Getting Started

### 1. Install Dependencies
Open your terminal inside the project directory and run:
```bash
npm install
```

### 2. Configure MongoDB Connection
Open `.env` (or copy `.env.example` to `.env`):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/product_review_db
```
> Replace `mongodb://localhost:27017/product_review_db` with your local MongoDB connection string or MongoDB Atlas cloud URI when ready.

### 3. Seed Sample Data (Optional)
To populate the database with sample products across different categories with flexible specifications:
```bash
npm run seed
```

### 4. Start the Application
```bash
npm start
```
Then open your browser and navigate to:
```
http://localhost:3000
```

---

## 📡 REST API Documentation

### Products API

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Get all products (supports `?category=`, `?search=`, `?sort=`) |
| `GET` | `/api/products/meta/categories` | Get all unique product categories |
| `GET` | `/api/products/:id` | Get single product by ID (including populated reviews) |
| `POST` | `/api/products` | Create a new product with flexible specifications |
| `PUT` | `/api/products/:id` | Update an existing product |
| `DELETE`| `/api/products/:id` | Delete product and cascade delete all its reviews |

#### Example POST `/api/products` Payload (Flexible Specs):
```json
{
  "name": "Sony WH-1000XM5",
  "category": "Audio",
  "price": 398.00,
  "description": "Industry-leading noise canceling headphones.",
  "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  "tags": ["anc", "headphones", "sony", "wireless"],
  "specifications": {
    "Battery Life": "30 hours (ANC On)",
    "Bluetooth": "5.2 Multipoint",
    "Weight": "250g",
    "Noise Canceling": "Dual Processors (V1 + QN1)"
  }
}
```

---

### Reviews API

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products/:productId/reviews` | Get all reviews and rating distribution for a product |
| `POST` | `/api/products/:productId/reviews` | Submit a new review for a product |
| `GET` | `/api/reviews/single/:id` | Get single review by review ID |
| `PUT` | `/api/reviews/single/:id` | Update an existing review |
| `DELETE`| `/api/reviews/single/:id` | Delete a review and recalculate product rating |

#### Example POST `/api/products/:productId/reviews` Payload:
```json
{
  "author": "Alex Chen",
  "rating": 5,
  "title": "Incredible sound quality and ANC!",
  "comment": "Silences the entire office. Super comfortable for 8+ hour work sessions.",
  "pros": ["Top-tier ANC", "Long battery life", "Multipoint connection"],
  "cons": ["Case is a bit bulky"],
  "tags": ["remote-work", "audiophile"],
  "images": ["https://images.unsplash.com/photo-1583394838336-acd977736f90"]
}
```

---

## 💡 Key Takeaways for Beginners

1. **`Schema.Types.Mixed` in Mongoose**: Used for `specifications` to accept any key-value dictionary without restricting the keys in advance.
2. **Atomic Recalculation**: Using MongoDB aggregation (`$match` and `$group`) in `Review.js` to compute the average rating directly in the database engine and update the parent `Product` document.
3. **Vanilla Web Architecture**: Clear separation of concerns between API client (`api.js`), DOM rendering (`app.js`), styles (`styles.css`), and backend routes.
