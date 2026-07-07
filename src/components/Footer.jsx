import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/products.js";

export default function Footer() {
  const year = new Date().getFullYear();
  const shopCategories = CATEGORIES.filter((c) => c !== "All");

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="logo">
            Basket<span className="logo-dot">.</span>
          </span>
          <p className="footer-tagline">
            Fresh groceries, fair prices, and a receipt that adds up —
            literally.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Shop</h4>
          <ul className="footer-list">
            <li>
              <Link to="/">All items</Link>
            </li>
            <li>
              <Link to="/cart">Your basket</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-list">
            {shopCategories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Good to know</h4>
          <ul className="footer-list">
            <li>Discounts unlock automatically at ₹500, ₹1000 & ₹2000</li>
            <li>Have a code? Apply it at checkout in your basket</li>
            <li>Made a mistake? Undo brings back your last change</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} Basket. All prices in ₹.</span>
        <span className="footer-note">Built with React &amp; Vite</span>
      </div>
    </footer>
  );
}