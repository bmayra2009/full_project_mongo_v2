import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainCustomers from "./../components/customers/SecondCustomers";

const CustomerScreenCart = () => {
  return (
    <>
      <main className="main-wrap">
        <Header />
        <MainCustomers />
      </main>
    </>
  );
};

export default CustomerScreenCart;
