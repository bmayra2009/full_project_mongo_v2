import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Customer from "./CustomerSecond";
import { useDispatch, useSelector } from "react-redux";
import { listCustomer } from "../../Redux/Actions/customerActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const SecondCustomers = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchParam] = useState(["name"]);

  const customerList = useSelector((state) => state.customerList);
  const { loading, error, customers } = customerList;

  const customerDelete = useSelector((state) => state.customerDelete);
  const { error: errorDelete, success: successDelete } = customerDelete;

  function search(customers) {
    return customers.filter((customer) => {
        return searchParam.some((newCustomer) => {
            return (
              customer[newCustomer]
                    .toString()
                    .toLowerCase()
                    .indexOf(searchQuery.toLowerCase()) > -1
            );
        });
    });
  }

  useEffect(() => {
    dispatch(listCustomer());
  }, [dispatch, successDelete]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Selecciona el cliente de la venta</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                value={searchQuery}
                className="form-control p-2"
                placeholder="Buscar..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Customers */}
              {search(customers).map((customer) => (
                <Customer customer={customer} key={customer._id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default SecondCustomers;
