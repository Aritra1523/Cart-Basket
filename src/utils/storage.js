const KEY = "grocery-cart";

export const Storage = {
  save(cart) {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch (err) {
      console.warn("Could not save cart to localStorage:", err);
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn("Could not load cart from localStorage:", err);
      return [];
    }
  },

  clear() {
    localStorage.removeItem(KEY);
  },
};
