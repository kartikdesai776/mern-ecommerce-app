# Shoe Shop — Mini Project

Overview
- Modern React frontend (Vite) + Express/MongoDB backend for a simple shoe shop.
- Frontend: [shoe-shop](shoe-shop) (React + Vite).
- Backend: [backend](backend) (Express + Mongoose).

Repository structure (key files)
- Frontend
  - [shoe-shop/src/App.jsx](shoe-shop/src/App.jsx) — main app & routes
  - [shoe-shop/src/main.jsx](shoe-shop/src/main.jsx)
  - [shoe-shop/src/context/CartContext.jsx](shoe-shop/src/context/CartContext.jsx) — cart state and sync with backend (contains [`CartProvider`](shoe-shop/src/context/CartContext.jsx), [`addToCart`](shoe-shop/src/context/CartContext.jsx), [`updateQty`](shoe-shop/src/context/CartContext.jsx), [`removeFromCart`](shoe-shop/src/context/CartContext.jsx))
  - [shoe-shop/src/context/ProductsContext.jsx](shoe-shop/src/context/ProductsContext.jsx) — products provider
  - [shoe-shop/src/data/products.js](shoe-shop/src/data/products.js) — local product data
  - [shoe-shop/src/components/ProductCard.jsx](shoe-shop/src/components/ProductCard.jsx)
  - [shoe-shop/src/pages/Product.jsx](shoe-shop/src/pages/Product.jsx) — product detail page (`Product`)
  - [shoe-shop/src/utils/money.js](shoe-shop/src/utils/money.js) — [`formatCurrency`](shoe-shop/src/utils/money.js)
  - [shoe-shop/package.json](shoe-shop/package.json)
- Backend
  - [backend/server.js](backend/server.js) — Express server & API endpoints
  - [backend/models/CartItem.js](backend/models/CartItem.js) — Mongoose cart schema
  - [backend/models/User.js](backend/models/User.js) — Mongoose user schema
  - [backend/.env](backend/.env) — MongoDB URI
  - [backend/package.json](backend/package.json)

Quick start

1. Start the backend
   - cd backend
   - npm install
   - Ensure MongoDB is running locally or update [backend/.env](backend/.env)
   - npm start
   - (server listens on port 5000) — endpoints implemented in [backend/server.js](backend/server.js)

2. Start the frontend
   - cd shoe-shop
   - npm install
   - npm run dev
   - Open http://localhost:5173 (Vite default)

API (implemented in [backend/server.js](backend/server.js))
- POST /api/cart — create cart item
- GET /api/cart — list cart items
- DELETE /api/cart/:id — delete cart item by Mongo _id
- POST /api/signup — create user
- POST /api/login — login user
- GET /api/checkout — generate billing summary

Known issues & notes
- Mixed module system files:
  - [backend/userController.js](backend/userController.js) and [backend/userRoutes.js](backend/userRoutes.js) use CommonJS (`require` / `module.exports`) but the backend is set to ESM (`"type": "module"` in [backend/package.json](backend/package.json)). These two files appear duplicated and are not used by [backend/server.js](backend/server.js). Consider removing or converting them to ESM.
- Cart quantity property mismatch:
  - Frontend stores cart quantity as `qty` (see [CartContext.jsx](shoe-shop/src/context/CartContext.jsx) and [CartItem.js](backend/models/CartItem.js) schema uses `qty`).
  - Server-side checkout calculation uses `item.quantity` (in [backend/server.js](backend/server.js)), which will be undefined. Fix by using `qty` consistently on server or change frontend to use `quantity`.
- Server Mongo connect options: using options supported by Mongoose v8; remove legacy options if you get deprecation warnings.
- Local storage: frontend persists cart to localStorage via [useLocalStorage](shoe-shop/src/hooks/useLocalStorage.js). The app fetches server cart on start and will overwrite local cart if backend responds.

Suggested quick fixes
- Align checkout calculation in [backend/server.js](backend/server.js) to use `qty` (or change frontend to send `quantity`).
- Remove or convert unused CommonJS files in `/backend` to avoid confusion.

Testing & Development tips
- Use the browser devtools to inspect network calls to http://localhost:5000/api/*
- To debug cart sync, check console logs added in [CartContext.jsx](shoe-shop/src/context/CartContext.jsx)

Contributing
- Fork, create a branch, run both services locally, and open a PR with changes.

Licensing
- Add a license file if you plan to publish.

Contact
- For issues, inspect frontend/backend logs and open an issue in this repository.
