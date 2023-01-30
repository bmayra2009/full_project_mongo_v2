import React, { useState } from "react";
import Header from "./../components/Header";
import Sidebar from "./../components/sidebar";
import Message from "./../components/LoadingError/Error";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingError/Loading";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const productId = match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const AddToCartHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <div className="container single-product">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <div className="row">
                <div className="col-md-6">
                  <div className="single-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product-dtl">
                    <div className="product-info">
                      <div className="product-name">{product.name}</div>
                    </div>
                    <p>{product.description}</p>

                    <div className="product-count col-lg-7 ">
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Precio</h6>
                        <span>${product.price}</span>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Estado</h6>
                        {product.countInStock > 0 ? (
                          <span>Disponible</span>
                        ) : (
                          <span>Sin unidades</span>
                        )}
                      </div>
                      {product.countInStock > 0 ? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Cantidad a comprar</h6>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <button
                            onClick={AddToCartHandle}
                            className="round-black-btn"
                          >
                            Agregar al carro
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
    </main>
    </>
  );
};

export default SingleProduct;
