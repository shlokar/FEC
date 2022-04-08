/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useReducer, useEffect } from 'react';
import ProductsCard from './ProductsCard.jsx';

function reducer(state, action) {
  switch (action.type) {
    case 'next':
      return { next: state.next + 1, start: state.start + 1 };
    case 'previous':
      return { next: state.next - 1, start: state.start - 1 };
    default:
      throw new Error();
  }
}
function RelatedProductsList({ products, featured, getRouteData, setProductId }) {
  const [state, dispatch] = useReducer(reducer, { start: 0, next: 3 });
  const [featuredProduct, setFeaturedProduct] = useState([]);

  useEffect(() => {
    getRouteData('products', 1, 1, '', featured, '')
      .then((data) => {
        setFeaturedProduct(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>COMPLETE THE LOOK</h2>
      <div className="relatedProducts">
        {state.start === 0 ? null : (
          <h2 className="product-arrows" onClick={() => { dispatch({ type: 'previous' }); }}>◀︎</h2>)}

        {products.slice(state.start, state.next).map((product) => (
          <ProductsCard
            product={product}
            key={product.id}
            setProductId={setProductId}
            featuredProduct={featuredProduct}
            getRouteData={getRouteData}
          />
        ))}

        {state.next === products.length ? null : (
          <h2 className="product-arrows" onClick={() => { dispatch({ type: 'next' }); }}>►</h2>)}
      </div>
    </div>
  );
}

export default RelatedProductsList;
