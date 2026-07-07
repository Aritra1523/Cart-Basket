import { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import { Storage } from "../utils/storage.js";
import { Discount } from "../utils/discount.js";
import { Coupons } from "../utils/coupons.js";
import Swal from "sweetalert2";

const CartContext = createContext(null);

const MAX_HISTORY = 20;

function pushHistory(history, cart) {
  const next = [...history, JSON.parse(JSON.stringify(cart))];
  return next.length > MAX_HISTORY ? next.slice(next.length - MAX_HISTORY) : next;
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
  const { product } = action;
  const existing = state.cart.find((i) => i.id === product.id);
  const newQty = existing ? existing.qty + 1 : 1;
  
  const cart = existing
    ? state.cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
    : [...state.cart, { ...product, qty: 1 }];
  
  Swal.fire({
    icon: 'success',
    title: 'Added to Cart! 🛒',
    html: `
      <div>
        <p><strong>${product.name || 'Item'}</strong></p>
        <p>Quantity: <strong>${newQty}</strong></p>
      </div>
    `,
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
  });
  
  return { ...state, cart, history: pushHistory(state.history, state.cart) };
}

    case "DECREMENT_ITEM": {
  const { id } = action;
  const existing = state.cart.find((i) => i.id === id);
  if (!existing) return state;
  
  const newQty = existing.qty - 1;
  const isRemoving = newQty === 0;
  
  const cart = isRemoving
    ? state.cart.filter((i) => i.id !== id)
    : state.cart.map((i) => (i.id === id ? { ...i, qty: newQty } : i));
  
  // Only show alert when removing the item completely
  if (isRemoving) {
    Swal.fire({
      icon: 'info',
      title: 'Removed from Cart',
      text: `${existing.name || 'Item'} has been removed`,
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timerProgressBar: true,
    });
  }
  // Optionally, you can skip the toast for simple decrements to avoid clutter
  
  return { ...state, cart, history: pushHistory(state.history, state.cart) };
}

   case "REMOVE_ITEM": {
  const { id } = action;
  const existing = state.cart.find((i) => i.id === id);
  
  if (!existing) return state;
  
  const cart = state.cart.filter((i) => i.id !== id);
  
  // Detailed notification showing what was removed
  Swal.fire({
    icon: 'info',
    title: 'Item Removed',
    html: `
      <div>
        <p><strong>${existing.name || 'Item'}</strong></p>
        <p>Quantity removed: <strong>${existing.qty}</strong></p>
        <p style="color: #666; font-size: 0.9rem; margin-top: 0.5rem;">
          Total: ₹${(existing.price * existing.qty).toFixed(2)}
        </p>
      </div>
    `,
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
  });
  
  return { ...state, cart, history: pushHistory(state.history, state.cart) };
}

case "CLEAR_CART": {
  const cartItems = state.cart;
  
  if (cartItems.length > 0) {
    Swal.fire({
      icon: 'success',
      title: 'Cart Cleared!',
      text: `${cartItems.length} items removed from your cart.`,
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    });
  }
  
  return {
    ...state,
    cart: [],
    appliedCoupon: null,
    history: pushHistory(state.history, state.cart),
  };
}

   case "UNDO": {
  if (state.history.length === 0) return state;
  
  const newHistory = state.history.slice(0, -1);
  const previousCart = state.history[state.history.length - 1];
  const currentCart = state.cart;
  
  const prevIds = new Set(previousCart.map(i => i.id));
  const currIds = new Set(currentCart.map(i => i.id));
  
  const addedItems = previousCart.filter(i => !currIds.has(i.id));
  const removedItems = currentCart.filter(i => !prevIds.has(i.id));
  
  let html = '';
  
  if (addedItems.length > 0) {
    html += `<div style="color: #2e7d32; margin-bottom: 0.5rem;">
      <strong>Restored:</strong> ${addedItems.map(i => i.name).join(', ')}
    </div>`;
  }
  
  if (removedItems.length > 0) {
    html += `<div style="color: #d32f2f; margin-bottom: 0.5rem;">
      <strong>Removed:</strong> ${removedItems.map(i => i.name).join(', ')}
    </div>`;
  }
  
  if (!addedItems.length && !removedItems.length) {
    html = 'Quantity adjustments have been undone.';
  }
  
  Swal.fire({
    icon: 'info',
    title: '↺ Undo Complete',
    html: html,
    timer: 2500,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    timerProgressBar: true,
  });
  
  return { ...state, cart: previousCart, history: newHistory };
}

    case "SET_COUPON":
      return { ...state, appliedCoupon: action.code };

    case "CLEAR_COUPON":
      return { ...state, appliedCoupon: null };

    default:
      return state;
  }
}

function initState() {
  return { cart: Storage.load(), history: [], appliedCoupon: null };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initState);

  useEffect(() => {
    Storage.save(state.cart);
  }, [state.cart]);

  const subtotal = useMemo(
    () => state.cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    [state.cart]
  );

  const itemCount = useMemo(
    () => state.cart.reduce((sum, i) => sum + i.qty, 0),
    [state.cart]
  );

  const summary = useMemo(() => {
    const tierPercent = Discount.getPercentFor(subtotal);
    const tierDiscount = (subtotal * tierPercent) / 100;
    const couponDiscount = state.appliedCoupon
      ? Coupons.computeDiscountAmount(state.appliedCoupon, subtotal)
      : 0;
    const total = Math.max(0, subtotal - tierDiscount - couponDiscount);

    return {
      subtotal,
      tierPercent,
      tierDiscount,
      couponDiscount,
      total,
      nextTierMessage: Discount.getNextTierMessage(subtotal),
    };
  }, [subtotal, state.appliedCoupon]);

  const value = {
    cart: state.cart,
    appliedCoupon: state.appliedCoupon,
    canUndo: state.history.length > 0,
    itemCount,
    summary,
    addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
    decrementItem: (id) => dispatch({ type: "DECREMENT_ITEM", id }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    undo: () => dispatch({ type: "UNDO" }),
    // Returns { ok, message } so the coupon form can show feedback.
    applyCoupon: (code) => {
      const coupon = Coupons.validate(code);
      if (!coupon) return { ok: false, message: "That code isn't valid." };
      dispatch({ type: "SET_COUPON", code });
      const label =
        coupon.type === "percent" ? `${coupon.value}% off` : `₹${coupon.value} off`;
      return { ok: true, message: `Applied ${code.toUpperCase()} — ${label}` };
    },
    clearCoupon: () => dispatch({ type: "CLEAR_COUPON" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
