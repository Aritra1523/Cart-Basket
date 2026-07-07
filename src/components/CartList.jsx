import { useCart } from "../context/CartContext.jsx";
import CartItem from "./CartItem.jsx";

export default function CartList() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <p className="empty-cart-msg">Your basket is empty — add something tasty.</p>;
  }

  return (
    <ul className="cart-list">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
