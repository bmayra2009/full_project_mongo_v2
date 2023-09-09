import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <div className="info-wrap">
            <Link to={`/productos/${product._id}`} className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">Precio: ${product.price}</div>
            <div className="price mb-2">Cantidad disponible: {product.countInStock}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
