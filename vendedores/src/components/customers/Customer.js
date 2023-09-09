import React from "react";
import { Link } from "react-router-dom";

const Customer = (props) => {
  const { customer } = props;

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <div className="info-wrap">
            <Link to={`/customer/${customer._id}`} className="title text-truncate">
              {customer.name}
            </Link>
            <div className="price mb-2">Ciudad: ${customer.city}</div>
            <div className="price mb-2">Direccion: {customer.address}</div>
            <div className="price mb-2">Celular: {customer.phone_number}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
