import React from 'react';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import TabsList from './TabsList';

const Account2 = () => {
  return (
    <div className='h-100'>
      <Navbar />
     <div className="bg-light pb-5">
      <TabsList />
     <div className="container mt-5 mb-5 pb-5 pt-5">
        <h1>Hello, John Smith!</h1>
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Welcome</h5>
            <p className="card-text">
              From your account dashboard you can view your recent orders,
              manage your shipping and billing addresses, and edit your password
              and account details.
            </p>
          </div>
        </div>
      </div>
     </div>
      <Footer />
    </div>
  );
};

export default Account2;
