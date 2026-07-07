// ------------------------------------------------------------------
// Automatic discount tiers based on cart subtotal.
// Highest qualifying threshold wins (tiers are checked high -> low).
// ------------------------------------------------------------------
const DISCOUNT_TIERS = [
  { threshold: 2000, percent: 15 },
  { threshold: 1000, percent: 10 },
  { threshold: 500, percent: 5 },
];

export const Discount = {
  // Returns the % discount that applies for a given subtotal (0 if none).
  getPercentFor(subtotal) {
    const tier = DISCOUNT_TIERS.find((t) => subtotal >= t.threshold);
    return tier ? tier.percent : 0;
  },

  // Human readable note about the next tier, e.g. "Add ₹120 more for 10% off"
  getNextTierMessage(subtotal) {
    const next = [...DISCOUNT_TIERS]
      .sort((a, b) => a.threshold - b.threshold)
      .find((t) => subtotal < t.threshold);
    if (!next) return null;
    const remaining = (next.threshold - subtotal).toFixed(2);
    return `Add ₹${remaining} more to unlock ${next.percent}% off`;
  },
};
