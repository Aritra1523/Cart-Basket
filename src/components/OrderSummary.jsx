


import { useCart } from "../context/CartContext.jsx";

export default function OrderSummary() {
  const { summary, itemCount, applyCoupon } = useCart();

  // Predefined coupon buttons
  const couponButtons = [
    { code: "SAVE10", discount: "10% off" },
    { code: "SAVE20", discount: "20% off" },
    { code: "SAVE50", discount: "₹50 off" },
    { code: "FREESHIP", discount: "Free shipping" },
  ];

  function handleCouponClick(code) {
    // If same coupon is already applied, remove it
    if (summary.activeCoupon === code) {
      applyCoupon(""); // Clear coupon
      return;
    }
    // Apply new coupon (replaces the previous one)
    const result = applyCoupon(code);
    if (!result.ok) {
      alert(result.message); // Or handle error better
    }
  }

  return (
    <>
      <div className="summary-row">
        <span>Items</span>
        <span>{itemCount}</span>
      </div>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{summary.subtotal.toFixed(2)}</span>
      </div>

      {summary.tierDiscount > 0 && (
        <div className="summary-row discount-row" style={{ display: "flex" }}>
          <span>Bulk discount</span>
          <span>
            − ₹{summary.tierDiscount.toFixed(2)} ({summary.tierPercent}% off)
          </span>
        </div>
      )}

      {/* Coupon Buttons Section - ALWAYS SHOW */}
      <div className="coupon-buttons-section">
        <div className="summary-row" style={{ marginBottom: "8px" }}>
          <span style={{ fontSize: "14px", color: "#666" }}>
            Available Coupons:
          </span>
        </div>
        <div className="coupon-buttons-grid">
          {couponButtons.map((coupon) => {
            const isActive = summary.activeCoupon === coupon.code;
            return (
              <button
                key={coupon.code}
                className={`coupon-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleCouponClick(coupon.code)}
              >
                <span className="coupon-code">{coupon.code}</span>
                <span className="coupon-desc">{coupon.discount}</span>
                {isActive && <span className="applied-badge">✓ Applied</span>}
              </button>
            );
          })}
        </div>
        {summary.couponDiscount > 0 && (
          <p style={{ fontSize: "12px", color: "#4caf50", marginTop: "8px", textAlign: "center" }}>
            ✓ Coupon {summary.activeCoupon} applied! Click another to switch.
          </p>
        )}
      </div>

      {summary.couponDiscount > 0 && (
        <div className="summary-row discount-row" style={{ display: "flex" }}>
          <span>Coupon ({summary.activeCoupon})</span>
          <span>− ₹{summary.couponDiscount.toFixed(2)}</span>
        </div>
      )}

      {summary.nextTierMessage && (
        <p className="next-tier-msg" style={{ display: "block" }}>
          {summary.nextTierMessage}
        </p>
      )}

      <div className="receipt-divider dashed" />

      <div className="summary-row total-row">
        <span>Total</span>
        <span>₹{summary.total.toFixed(2)}</span>
      </div>
    </>
  );
}