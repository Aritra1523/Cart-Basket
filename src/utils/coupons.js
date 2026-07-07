
const COUPONS = {
  SAVE10: { type: "percent", value: 10 },
  SAVE20: { type: "percent", value: 20 },
  FLAT50: { type: "flat", value: 50 },
  WELCOME: { type: "percent", value: 5 },
};

export const Coupons = {
  validate(code) {
    if (!code) return null;
    const found = COUPONS[code.trim().toUpperCase()];
    return found || null;
  },

  computeDiscountAmount(code, subtotal) {
    const coupon = this.validate(code);
    if (!coupon) return 0;
    if (coupon.type === "percent") return (subtotal * coupon.value) / 100;
    return Math.min(coupon.value, subtotal); 
  },
};
