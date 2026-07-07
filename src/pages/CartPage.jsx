// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext.jsx";
// import CartList from "../components/CartList.jsx";
// import CouponForm from "../components/CouponForm.jsx";
// import OrderSummary from "../components/OrderSummary.jsx";

// export default function CartPage() {
//   const { canUndo, undo, clearCart, cart } = useCart();

//   return (
//     <section className="cart-page">
//       <div className="cart-page-header">
//         <h2>Your Basket</h2>
//         <Link to="/" className="continue-shopping-link">
//           ← Continue shopping
//         </Link>
//       </div>

//       <div className="receipt">
//         <div className="receipt-header">
//           <span className="receipt-title">Order summary</span>
//           <button
//             className="undo-btn"
//             title="Undo last add/remove"
//             disabled={!canUndo}
//             onClick={undo}
//           >
//             ↺ Undo
//           </button>
//         </div>

//         <CartList />

//         <CouponForm />

//         <div className="receipt-divider" />

//         <OrderSummary />

//         <button
//           className="btn btn-clear"
//           disabled={cart.length === 0}
//           onClick={clearCart}
//         >
//           Clear basket
//         </button>
//       </div>
//     </section>
//   );
// }


import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import CartList from "../components/CartList.jsx";
import CouponForm from "../components/CouponForm.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import Swal from "sweetalert2";

export default function CartPage() {
  const { canUndo, undo, clearCart, cart } = useCart();

  const handleClearCart = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Cart is empty',
        text: 'There are no items to clear.',
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
      return;
    }

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    Swal.fire({
      title: 'Clear Cart?',
      html: `
        <div>
          <p>You are about to remove:</p>
          <p style="font-size: 1.2rem; font-weight: 600; margin: 0.5rem 0;">
            ${totalItems} items
          </p>
          <p style="color: #666;">
            Total value: <strong>₹${totalPrice.toFixed(2)}</strong>
          </p>
          <p style="color: #d33; margin-top: 1rem;">
            This action cannot be undone!
          </p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear all',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire({
          icon: 'success',
          title: 'Cart Cleared! 🧹',
          text: 'All items have been removed.',
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          timerProgressBar: true,
        });
      }
    });
  };

  return (
    <section className="cart-page">
      <div className="cart-page-header">
        <h2>Your Basket</h2>
        <Link to="/" className="continue-shopping-link">
          ← Continue shopping
        </Link>
      </div>

      <div className="cart-layout">
        {/* Left Column - Cart Items */}
        <div className="cart-items-section">
          <div className="section-header">
            <span className="section-title">Cart Items</span>
            <span className="item-count">{cart.length} items</span>
          </div>
          
          {cart.length === 0 ? (
            <div className="empty-cart-message">
              <span className="empty-icon">🛒</span>
              <p>Your cart is empty</p>
              <Link to="/" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <CartList />
              <div className="cart-actions">
                <button
                  className="undo-btn"
                  title="Undo last add/remove"
                  disabled={!canUndo}
                  onClick={undo}
                >
                  ↺ Undo
                </button>
                <button
                  className="btn btn-clear"
                  disabled={cart.length === 0}
                  onClick={handleClearCart}
                >
                  Clear basket
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div className="order-summary-section">
          <div className="receipt">
            <div className="receipt-header">
              <span className="receipt-title">Order Summary</span>
            </div>

            <CouponForm />
            <div className="receipt-divider" />
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
}