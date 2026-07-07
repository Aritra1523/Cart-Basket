import { useCart } from "../context/CartContext.jsx";

export default function OrderSummary() {
  const { summary, itemCount } = useCart();

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

      {summary.couponDiscount > 0 && (
        <div className="summary-row discount-row" style={{ display: "flex" }}>
          <span>Coupon</span>
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

