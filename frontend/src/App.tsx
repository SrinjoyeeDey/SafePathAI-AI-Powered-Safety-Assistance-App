import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chat from "./components/Chat";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import ContactOwner from "./pages/ContactOwner";
import CommunityHub from "./pages/CommunityHub";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ErrorPage from "./components/ErrorPage";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Emergency from "./pages/Emergency";
import Favorites from "./pages/Favorites";
import AboutUs from "./pages/AboutUs";
import ContributorsPage from "./components/Contributors/ContributorsPage";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNavFooter = location.pathname === "/home"; // hide on home page

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideNavFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LocationProvider>
          <BrowserRouter>
            <Chat />
            <div className="flex flex-col min-h-screen">
              <Layout>
                <Routes>
                  {/* Protected routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/home" element={<Home />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/contact-owner" element={<ContactOwner />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/Emergency"
                    element={
                      <ProtectedRoute>
                        <Emergency />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <Favorites />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contributors" element={<ContributorsPage />} />
                  <Route
                    path="/community"
                    element={
                      <ProtectedRoute>
                        <CommunityHub />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/profile" element={<Profile />} />
                  {/* Error Pages */}
                  <Route path="/404" element={<ErrorPage errorCode={404} />} />
                  <Route path="/500" element={<ErrorPage errorCode={500} />} />
                  {/* Catch-all route for 404 errors */}
                  <Route path="*" element={<ErrorPage errorCode={404} />} />
                </Routes>
              </Layout>
            </div>
          </BrowserRouter>
        </LocationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;