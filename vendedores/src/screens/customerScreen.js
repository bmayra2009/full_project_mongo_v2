import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainCustomers from "./../components/customers/MainCustomers";

const CustomerScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainCustomers />
      </main>
    </>
  );
};

export default CustomerScreen;
