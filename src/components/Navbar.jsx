import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.5 3h2l2.6 12.6a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21.5 7H6" />
    </svg>
  );
}

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Basket<span className="logo-dot">.</span>
      </Link>

      <div className="nav-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
        >
          Shop
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => "nav-link cart-link" + (isActive ? " active" : "")}
          aria-label="View cart"
        >
          <CartIcon />
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </NavLink>
      </div>
    </nav>
  );
}
