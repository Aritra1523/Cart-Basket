import ProductCard from "./ProductCard.jsx";

export default function ProductList({ products }) {
  if (products.length === 0) {
  return (
    <div className="empty-products">
      <svg 
        className="empty-products-svg"
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Magnifying glass */}
        <circle cx="85" cy="85" r="40" stroke="#c5cbd5" strokeWidth="6" />
        <line x1="113" y1="113" x2="145" y2="145" stroke="#c5cbd5" strokeWidth="6" strokeLinecap="round" />
        
        {/* Shopping bag */}
        <path 
          d="M60 120 L140 120 L145 170 L55 170 L60 120Z" 
          stroke="#c5cbd5" 
          strokeWidth="4" 
          fill="none"
        />
        <path 
          d="M80 120 L80 100 C80 88 95 85 100 85 C105 85 120 88 120 100 L120 120" 
          stroke="#c5cbd5" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        
        {/* Small sparkles or stars */}
        <circle cx="30" cy="40" r="3" fill="#c5cbd5" opacity="0.5" />
        <circle cx="170" cy="50" r="4" fill="#c5cbd5" opacity="0.3" />
        <circle cx="160" cy="30" r="2" fill="#c5cbd5" opacity="0.4" />
        <circle cx="40" cy="150" r="2" fill="#c5cbd5" opacity="0.3" />
        
        {/* X marks indicating no results */}
        <path d="M150 100 L160 110 M160 100 L150 110" stroke="#c5cbd5" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <path d="M170 80 L178 88 M178 80 L170 88" stroke="#c5cbd5" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        
        {/* Dotted search path */}
        <circle cx="85" cy="85" r="30" stroke="#c5cbd5" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
      </svg>
      
      <h3 className="empty-title">No Products Found</h3>
      <p className="empty-subtitle">
        We couldn't find any products matching your search or filters.
      </p>
     
    </div>
  );
}

  return (
    <ul className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </ul>
  );
}
