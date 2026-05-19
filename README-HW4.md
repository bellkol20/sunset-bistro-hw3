# Sunset Bistro — Homework 4 (Full Stack)

Extends the HW3 React app with **Node.js**, **Express**, and **MongoDB**.

## Features

- **Menu** loaded from MongoDB (`menuitems` collection)
- **Cart** persisted per browser session (`carts` collection)
- **Orders** saved when you click Place Order (`orders` collection)
- **Admin** page (`/admin`) for menu Create / Update / Delete (for your CRUD demo video)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Menu grouped by section |
| GET | `/api/menu/items` | Flat list of menu items |
| POST | `/api/menu` | Create menu item |
| PUT | `/api/menu/:id` | Update menu item |
| DELETE | `/api/menu/:id` | Delete menu item |
| GET | `/api/carts/:sessionId` | Get cart |
| PUT | `/api/carts/:sessionId` | Save cart items |
| DELETE | `/api/carts/:sessionId` | Clear cart |
| GET | `/api/orders` | List orders |
| POST | `/api/orders` | Place order from cart |
| PATCH | `/api/orders/:id` | Update order (e.g. status) |
| DELETE | `/api/orders/:id` | Delete order |

## Setup (local)

### 1. MongoDB Atlas (free)

1. Create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Database Access → add a user with password
3. Network Access → allow your IP (or `0.0.0.0/0` for class/demo)
4. Connect → copy the connection string

### 2. Environment

```bash
cp server/.env.example server/.env
```

Edit `server/.env` and set `MONGODB_URI` to your Atlas connection string (database name `sunset-bistro` is fine).

### 3. Install & seed

```bash
npm install
npm install --prefix server
npm run seed
```

### 4. Run

```bash
npm run dev
```

- Frontend: http://localhost:5173  
- API: http://localhost:5001  

## Demo video checklist (MongoDB Compass side by side)

Record your screen with the app on one side and **MongoDB Compass** (or Atlas Data Explorer) on the other:

1. **Read** — Open Menu page → refresh `menuitems` collection
2. **Create** — Admin → add a dish → new document appears
3. **Update** — Admin → edit a dish → document changes
4. **Delete** — Admin → delete a dish → document removed
5. **Cart** — Add/update/remove items → `carts` collection updates
6. **Order** — Place Order → new document in `orders`, cart cleared

## Deploy (Vercel — free, no credit card)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → sign in with **GitHub**
3. **Import** `sunset-bistro-hw3` → Deploy (defaults are fine; `vercel.json` is included)
4. Before or right after the first deploy: **Settings → Environment Variables**
   - Name: `MONGODB_URI`
   - Value: your Atlas connection string (same as in `server/.env`)
   - Apply to **Production** → Save → **Redeploy**
5. Seed the database once from your machine (if the menu is empty on the live site):

   ```bash
   npm run seed
   ```

6. Submit your live URL (e.g. `https://sunset-bistro-hw3.vercel.app`)

> **Note:** GitHub Pages only hosts static files and cannot run this API. Vercel runs the full app (React + Express + MongoDB) on the free Hobby plan.

## Project structure

```
server/          Express API + Mongoose models
src/api/         Frontend API client
src/pages/Admin  Menu CRUD UI
src/context/     Cart synced to MongoDB
```
