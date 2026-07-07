// import { useCart } from "../context/CartContext.jsx";

// export default function OrderSummary() {
//   const { summary, itemCount } = useCart();

//   return (
//     <>
//       <div className="summary-row">
//         <span>Items</span>
//         <span>{itemCount}</span>
//       </div>
//       <div className="summary-row">
//         <span>Subtotal</span>
//         <span>₹{summary.subtotal.toFixed(2)}</span>
//       </div>

//       {summary.tierDiscount > 0 && (
//         <div className="summary-row discount-row" style={{ display: "flex" }}>
//           <span>Bulk discount</span>
//           <span>
//             − ₹{summary.tierDiscount.toFixed(2)} ({summary.tierPercent}% off)
//           </span>
//         </div>
//       )}

//       {summary.couponDiscount > 0 && (
//         <div className="summary-row discount-row" style={{ display: "flex" }}>
//           <span>Coupon</span>
//           <span>− ₹{summary.couponDiscount.toFixed(2)}</span>
//         </div>
//       )}

//       {summary.nextTierMessage && (
//         <p className="next-tier-msg" style={{ display: "block" }}>
//           {summary.nextTierMessage}
//         </p>
//       )}

//       <div className="receipt-divider dashed" />

//       <div className="summary-row total-row">
//         <span>Total</span>
//         <span>₹{summary.total.toFixed(2)}</span>
//       </div>
//     </>
//   );
// }


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
    const result = applyCoupon(code);
    if (result.ok) {
      console.log("Coupon applied!");
    } else {
      console.log(result.message);
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

      {/* Coupon Buttons Section */}
      {!summary.couponDiscount > 0 && (
        <div className="coupon-buttons-section">
          <div className="summary-row" style={{ marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", color: "#666" }}>
              Available Coupons:
            </span>
          </div>
          <div className="coupon-buttons-grid">
            {couponButtons.map((coupon) => (
              <button
                key={coupon.code}
                className="coupon-btn"
                onClick={() => handleCouponClick(coupon.code)}
              >
                <span className="coupon-code">{coupon.code}</span>
                <span className="coupon-desc">{coupon.discount}</span>
              </button>
            ))}
          </div>
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