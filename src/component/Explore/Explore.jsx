// import React, { useState } from 'react';
// import Navbar from '../Home/Navbar';
// import SideBarExplore from './SideBarExplore';

// const Explore = () => {
//   const [showSidebar, setShowSidebar] = useState(false);

//   return (
//     <div>
//       <Navbar />
//       <div className="search-bar-container d-block d-md-none p-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="What are you looking for?"
//         />
//         <button className="btn btn-outline-dark ms-2" onClick={() => setShowSidebar(true)}>
//           Filters
//         </button>
//       </div>
//       <div className="explore-container d-flex">
//         <SideBarExplore show={showSidebar} onHide={() => setShowSidebar(false)} />
//         <div className="map-container flex-grow-1 d-flex justify-content-center align-items-center">
//           <div className="dummy-map bg-secondary text-white d-flex justify-content-center align-items-center">
//             Dummy Map
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Explore;
