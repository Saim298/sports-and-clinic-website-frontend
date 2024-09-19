import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import FaqsPage from "./pages/FaqsPage";
import ContactPage from "./pages/ContactPage";
import SubscribePage from "./pages/SubscribePage";
import OverviewPage from "./pages/Account/OverviewPage";
import ProfilePage from "./pages/Account/ProfilePage";
import SubscriptionsPage from "./pages/Account/SubscriptionsPage";
import SocialPlusPage from "./pages/Account/SocialPlusPage";
import PaymentPage from "./pages/Account/PaymentPage";
import HelpPage from "./pages/Account/HelpPage";
import MainPage from "./pages/Account2/MainPage";
import ProfileAccount2Page from "./pages/Account2/ProfileAccount2Page";
import DummyPage from "./component/Account2/DummyPage";
import SignupPage from "./pages/SignupPage";
import WomenSoccerPage from "./pages/WomenSoccerPage";
import AdminLoginPage from "./pages/AdminPanel/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminPanel/AdminDashboardPage";
import AddEventsPage from "./pages/AdminPanel/Events/AddEventsPage";
import "react-toastify/dist/ReactToastify.css";
import EnterEventPage from "./pages/EnterEventPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import AddBlogPage from "./pages/AdminPanel/AddBlogPage";
import BlogsListPage from "./pages/Blogs/BlogsListPage";
import UsersListPage from "./pages/AdminPanel/UsersListPage";
import EventsListingPage from "./pages/AdminPanel/Events/EventsListingPage";
import EventRegistrantPage from "./pages/AdminPanel/Events/EventRegistrantPage";
import FaqsPageAdmin from "./pages/AdminPanel/FaqsPage";
import AllFaqsPage from "./pages/AdminPanel/AllFaqsPage";
import MediaUploadPage from "./pages/AdminPanel/MediaUploadPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import UserPlansPage from "./pages/AdminPanel/UserPlansPage";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import ContactListPage from "./pages/AdminPanel/ContactListPage";
import InvoiceTemplatePage from "./pages/AdminPanel/InvoiceTemplatePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/subscribe" element={<SubscribePage />} />
          <Route path="/account/overview" element={<OverviewPage />} />
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route
            path="/account/subscriptions"
            element={<SubscriptionsPage />}
          />
          <Route
            path="/payment-success/:session_id"
            element={<PaymentSuccess />}
          />
          <Route
            path="/subscription-success/:session_id/:subscriptionId"
            element={<SubscriptionSuccess />}
          />
          <Route path="/account/social-plus" element={<SocialPlusPage />} />
          <Route path="/account/payments" element={<PaymentPage />} />
          <Route path="/account/help" element={<HelpPage />} />
          <Route path="/account-2" element={<MainPage />} />
          <Route path="/profile-account-2" element={<ProfileAccount2Page />} />
          <Route path="/:section" element={<DummyPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/women-soccer/:event_id" element={<WomenSoccerPage />} />

          <Route path="/enter-event/:event_id" element={<EnterEventPage />} />
          <Route path="/blogs" element={<BlogPage />} /> 
          <Route path="/blog-detail/:blogid" element={<BlogDetailPage />} /> 
          {/* Admin Panel */}
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin-add-events" element={<AddEventsPage />} />
          {/* Admin Panel Blog */}
          <Route path="/admin-add-blogs" element={<AddBlogPage />} />
          <Route path="/admin-blogs-list" element={<BlogsListPage />} />
          <Route path="/admin-user-list" element={<UsersListPage />} />
          <Route path="/admin-events-list" element={<EventsListingPage />} />
          <Route
            path="/admin-events-registrant/:event_id"
            element={<EventRegistrantPage />}
          />
          <Route path="/admin-faqs" element={<FaqsPageAdmin />} />
          <Route path="/admin-all-faqs" element={<AllFaqsPage />} />
          <Route path="/admin-all-media-upload" element={<MediaUploadPage />} />
          <Route path="/admin-plans" element={<UserPlansPage />} />
          <Route path="/admin-contact-us" element={<ContactListPage />} />
          <Route path="/admin-invoice-template" element={<InvoiceTemplatePage />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </>
  );
}

export default App;
