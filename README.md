# Basket — Grocery List (React)

React + Vite version of the grocery list app, with the shop and cart as
separate pages linked from a navbar.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Folder structure

```
grocery-list-react/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  # Entry point: BrowserRouter + CartProvider + App
    ├── App.jsx                   # Navbar + route definitions
    ├── index.css                 # All styling (receipt-themed design)
    ├── data/
    │   └── products.js           # Static catalog (name, price, category, image emoji)
    ├── utils/
    │   ├── storage.js            # localStorage read/write helpers
    │   ├── discount.js           # Threshold-based % discount logic
    │   └── coupons.js            # Coupon code lookup + calculation
    ├── context/
    │   └── CartContext.jsx       # useReducer cart state, undo history, localStorage sync
    ├── hooks/
    │   └── useCatalogFilters.js  # search/filter/sort state for the catalog
    ├── pages/
    │   ├── HomePage.jsx          # Box-grid product catalog ("/")
    │   └── CartPage.jsx          # Full cart with all features ("/cart")
    └── components/
        ├── Navbar.jsx            # Logo + Shop link + cart icon with live badge
        ├── CatalogControls.jsx   # search bar, category filter, sort
        ├── ProductList.jsx       # renders the product grid
        ├── ProductCard.jsx       # box card: image, name, category, price, Add
        ├── CartList.jsx
        ├── CartItem.jsx
        ├── CouponForm.jsx
        └── OrderSummary.jsx
```

## Pages & navigation

- **`/` (HomePage)** — grid of box-style product cards, each with an image
  tile, name, category, price, and an "Add" button. Search, category filter,
  and price sort live above the grid.
- **`/cart` (CartPage)** — the full cart: line items with quantity
  controls, coupon form, bulk-discount + coupon breakdown, running total,
  Undo, and Clear basket. Reached by clicking the cart icon in the navbar.
- **Navbar** — sticky top bar with the logo, a "Shop" link, and a cart
  icon. The icon shows a live badge with the total item count (quantity
  sum, not distinct items) that updates the instant you add/remove
  something, from any page.

## How state flows

- **`CartContext.jsx`** holds the cart array, undo history, and applied
  coupon in a `useReducer`. Every mutating action (`ADD_ITEM`,
  `DECREMENT_ITEM`, `REMOVE_ITEM`, `CLEAR_CART`) snapshots the cart onto a
  history stack before changing it; `UNDO` pops the last snapshot back. A
  `useEffect` persists the cart to `localStorage` on every change; a lazy
  `useReducer` init restores it on load. `useMemo` derives the
  subtotal/discount/total breakdown.
- **`useCatalogFilters.js`** owns the search term, category, and sort
  order for the Home page — kept separate from cart state since it's a
  "view" concern local to that page.
- Any component can call `useCart()` to read state or trigger actions —
  no prop drilling, and it works the same on both pages/the navbar.

## Features

- Static catalog (20 items / 5 categories, each with an image) — edit in
  `src/data/products.js`
- Box-grid product cards with pictures
- Add/remove/adjust quantity with live totals
- Tiered discount (`src/utils/discount.js`): ₹500→5%, ₹1000→10%, ₹2000→15%
- Coupon codes (`src/utils/coupons.js`): `SAVE10`, `SAVE20`, `FLAT50`, `WELCOME`
- Sort by price, filter by category, live search
- Cart persists in localStorage across reloads
- Undo last add/remove/clear action (up to 20 steps)
- Cart icon in navbar with a live item-count badge, linking to a
  dedicated cart page
