import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const TabsList = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const tabs = [
    { name: 'Dashboard', path: '/account-2' },
    { name: 'My Listings', path: '/listings' },
    { name: 'Promotions', path: '/promotions' },
    { name: 'Bookmarks', path: '/bookmarks' },
    { name: 'Account details', path: '/profile-account-2' },
    { name: 'Logout', path: '/' },
  ];

  return (
    <div className="card" style={{borderRadius:"0px", overflowX:"auto"}}>
      <div className="card-body d-flex justify-content-around">
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.path}
            className={`nav-link ${activeTab === tab.name ? 'active' : ''} text-dark`}
            onClick={() => setActiveTab(tab.name)}
            style={{color:"black !important"}}
          >
            {tab.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default TabsList;
