
export const PRODUCTS = [
  { id: 1, name: "Apple", price: 19, category: "Fruits", image: "🍎" },
  { id: 2, name: "Banana", price: 10, category: "Fruits", image: "🍌" },
  { id: 3, name: "Orange", price: 22, category: "Fruits", image: "🍊" },
  { id: 4, name: "Mango", price: 35, category: "Fruits", image: "🥭" },
  { id: 5, name: "Milk (1L)", price: 25, category: "Dairy", image: "🥛" },
  { id: 6, name: "Cheese Block", price: 45, category: "Dairy", image: "🧀" },
  { id: 7, name: "Butter", price: 55, category: "Dairy", image: "🧈" },
  { id: 8, name: "Yogurt", price: 18, category: "Dairy", image: "🥣" },
  { id: 9, name: "Bread Loaf", price: 30, category: "Bakery", image: "🍞" },
  { id: 10, name: "Croissant", price: 28, category: "Bakery", image: "🥐" },
  { id: 11, name: "Tomato", price: 15, category: "Vegetables", image: "🍅" },
  { id: 12, name: "Potato", price: 12, category: "Vegetables", image: "🥔" },
  { id: 13, name: "Onion", price: 14, category: "Vegetables", image: "🧅" },
  { id: 14, name: "Spinach", price: 20, category: "Vegetables", image: "🥬" },
  { id: 15, name: "Coca Cola (500ml)", price: 40, category: "Beverages", image: "🥤" },
  { id: 16, name: "Orange Juice", price: 48, category: "Beverages", image: "🧃" },
  { id: 17, name: "Potato Chips", price: 20, category: "Snacks", image: "🍟" },
  { id: 18, name: "Cookies", price: 35, category: "Snacks", image: "🍪" },
  { id: 19, name: "Chocolate Bar", price: 25, category: "Snacks", image: "🍫" },
  { id: 20, name: "Peanuts (pack)", price: 32, category: "Snacks", image: "🥜" },
];

export const CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
