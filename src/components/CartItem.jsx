import { useCart } from "../context/CartContext.jsx";

export default function CartItem({ item }) {
  const { addItem, decrementItem, removeItem } = useCart();

  return (
    <li className="cart-row">
      <span className="cart-name">{item.name}</span>
      <div className="cart-qty-controls">
        <button className="qty-btn" onClick={() => decrementItem(item.id)}>
          −
        </button>
        <span className="cart-qty">{item.qty}</span>
        <button className="qty-btn" onClick={() => addItem(item)}>
          +
        </button>
      </div>
      <span className="cart-line-price">₹{(item.price * item.qty).toFixed(2)}</span>
      <button
        className="remove-btn"
        title="Remove item"
        onClick={() => removeItem(item.id)}
      >
        ✕
      </button>
    </li>
  );
}
