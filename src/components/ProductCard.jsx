


import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { cart, addItem, decrementItem } = useCart();
  const cartItem = cart.find((i) => i.id === product.id);
  const inCart = !!cartItem;
  const quantity = cartItem?.qty || 0;

  return (
    <li className="product-box">
      <div className="product-image" aria-hidden="true">
        <span>{product.image}</span>
      </div>

      <div className="product-box-body">
        <span className="product-category">{product.category}</span>
        <span className="product-name">{product.name}</span>
        <div className="product-box-footer">
          <span className="product-price">₹{product.price.toFixed(2)}</span>
          {inCart ? (
            <div className="quantity-control">
              <button 
                className="btn btn-qty" 
                onClick={() => decrementItem(product.id)}
              >
                −
              </button>
              <span className="qty-display">{quantity}</span>
              <button 
                className="btn btn-qty" 
                onClick={() => addItem(product)}
              >
                +
              </button>
            </div>
          ) : (
            <button className="btn btn-add" onClick={() => addItem(product)}>
              Add
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
