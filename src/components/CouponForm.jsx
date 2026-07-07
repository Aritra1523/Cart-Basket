import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

export default function CouponForm() {
  const { applyCoupon } = useCart();
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState(null); // { ok, message } | null

  function handleApply() {
    const trimmed = code.trim();
    if (!trimmed) {
      setFeedback({ ok: false, message: "Enter a code first." });
      return;
    }
    const result = applyCoupon(trimmed);
    setFeedback(result);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleApply();
  }

  return (
    <div className="coupon-block">
      <div className="coupon-input-row">
        <input
          type="text"
          className="coupon-input"
          placeholder="Promo code"
          autoComplete="off"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-outline" onClick={handleApply}>
          Apply
        </button>
      </div>
      {feedback && (
        <p className={`coupon-feedback ${feedback.ok ? "success" : "error"}`}>
          {feedback.message}
        </p>
      )}
    </div>
  );
}
