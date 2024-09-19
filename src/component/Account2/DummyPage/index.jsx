import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../Home/Navbar';
import Footer from '../../Home/Footer';
import TabsList from '../TabsList';

const DummyPage = () => {
  const { section } = useParams();

  const renderContent = () => {
    switch (section) {
      case 'bookmarks':
        return (
          <div className="container dummyPage-container my-5 py-5">
            <h1 className="text-primary mb-4">Your Bookmarks</h1>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-info">Bookmark 1</h5>
                <p className="card-text">
                  Description of the first bookmarked item.
                </p>
              </div>
            </div>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-info">Bookmark 2</h5>
                <p className="card-text">
                  Description of the second bookmarked item.
                </p>
              </div>
            </div>
          </div>
        );
      case 'promotions':
        return (
          <div className="container dummyPage-container my-5 py-5">
            <h1 className="text-success mb-4">Current Promotions</h1>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-warning">Promotion 1</h5>
                <p className="card-text">
                  Details of the first promotion.
                </p>
              </div>
            </div>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-warning">Promotion 2</h5>
                <p className="card-text">
                  Details of the second promotion.
                </p>
              </div>
            </div>
          </div>
        );
      case 'listings':
        return (
          <div className="container dummyPage-container my-5 py-5">
            <h1 className="text-danger mb-4">Listings</h1>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-success">Listing 1</h5>
                <p className="card-text">
                  Details of the first listing.
                </p>
              </div>
            </div>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-success">Listing 2</h5>
                <p className="card-text">
                  Details of the second listing.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="container dummyPage-container my-5 py-5">
            <h1 className="text-dark mb-4">Welcome</h1>
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-primary">Home</h5>
                <p className="card-text">
                  This is the default content.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dummyPage h-100">
      <Navbar />
      <div className="bg-light pb-5">
        <TabsList />
        {renderContent()}
      </div>
      <Footer />
    </div>
  );
};

export default DummyPage;
