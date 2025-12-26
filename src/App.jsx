import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
// import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./routes/RequireRole";
import PublicRoute from "./routes/PublicRoute";

import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Aboutus from "./Pages/Aboutus";
import VolunteerDetails from "./Pages/VolunteerDetails";
import Collaborate from "./Pages/Collaborate";
import MediaTalks from "./Pages/MediaTalks";
import Gallery from "./Pages/Gallery";
import Blog from "./Pages/Blog";
import BlogDetails from "./Pages/BlogDetails";
import ContactUs from "./Pages/ContactUs";
import Donate from "./Pages/Donate";
import Unauthorised from "./Pages/Unauthorised";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Customer from "./Pages/Customer";
import Admin from "./Pages/Admin";
import LoginPage from "./Pages/LoginPage";
import AdminMain from "./Pages/AdminMain";
import CollaborateAdmin from "./Pages/CollaborateAdmin";
import GalleryAdmin from "./Pages/GalleryAdmin";
import BlogAdmin from "./Pages/BlogAdmin";
import { ADMIN_ROLE, USER_ROLE } from "./Hoc/constData";
import Test from "./Pages/Test";
// import Aboutus from "./Pages/Aboutus";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* <Route path="/" element={<MainLayout />}> */}
          <Route
            path="/home"
            element={
              <RequireAuth role={["admin", "user"]}>
                <Home />
              </RequireAuth>
            }
          />

          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="aboutus"
            element={
              <PublicRoute>
                <Aboutus />
              </PublicRoute>
            }
          />
          <Route
            path="volunteerdetails"
            element={
              <PublicRoute>
                <VolunteerDetails />
              </PublicRoute>
            }
          />
          <Route
            path="collaborate"
            element={
              <PublicRoute>
                <Collaborate />
              </PublicRoute>
            }
          />
          <Route
            path="mediatalks"
            element={
              <PublicRoute>
                <MediaTalks />
              </PublicRoute>
            }
          />
          <Route
            path="gallery"
            element={
              <PublicRoute>
                <Gallery />
              </PublicRoute>
            }
          />
          <Route
            path="blog"
            element={
              <PublicRoute>
                <Blog />
              </PublicRoute>
            }
          />
          <Route
            path="blogdetails"
            element={
              <PublicRoute>
                <BlogDetails />
              </PublicRoute>
            }
          />
          <Route
            path="contactus"
            element={
              <PublicRoute>
                <ContactUs />
              </PublicRoute>
            }
          />
          <Route
            path="donate"
            element={
              <PublicRoute>
                <Donate />
              </PublicRoute>
            }
          />


          {/* Public-only pages (login/register) */}

         <Route
            path="login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="admin"
            element={
              <RequireAuth role={["ADMIN"]}>
                <Profile />
              </RequireAuth>
            }
          />

          {/* <Route
            path="unauthorised"
            element={
              <PublicRoute>
                <Unauthorised />
              </PublicRoute>
            }
          /> */}

          {/* Private pages */}
          {/* <Route
            path="dashboard"
            element={
              <RequireAuth role={["admin", "user"]}>
                <Dashboard />
              </RequireAuth>
            }
          /> */}
          {/* <Route
            path="customer"
            element={
              <RequireAuth role={["admin", "user"]}>
                <Customer />
              </RequireAuth>
            }
          /> */}
          {/* <Route
            path="admin"
            element={
              <RequireAuth role={[ADMIN_ROLE, USER_ROLE]}>
                <AdminMain />
              </RequireAuth>
            }
          /> */}
          {/* <Route
            path="loginpage"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          /> */}

          {/* <Route path="test" element={<Test />} /> */}


          <Route path="*" element={<NotFound />} />

          <Route
            path="collaborateadmin"
            element={
              <RequireAuth role={["admin", "user"]}>
                <CollaborateAdmin />
              </RequireAuth>
            }
          />

          <Route
            path="galleryadmin"
            element={
              <RequireAuth role={["admin", "user"]}>
                <GalleryAdmin />
              </RequireAuth>
            }
          />
          <Route
            path="blogadmin"
            element={
              <RequireAuth role={["admin", "user"]}>
                <BlogAdmin />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
