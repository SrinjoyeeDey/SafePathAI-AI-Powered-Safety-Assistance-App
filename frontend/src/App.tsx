import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chat from "./components/Chat";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import ContactOwner from "./pages/ContactOwner";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ErrorPage from "./components/ErrorPage";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Emergency from "./pages/Emergency";
import Favorites from "./pages/Favorites";
import AboutUs from "./pages/AboutUs";

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
        <BrowserRouter>
          <Chat />
          <div className="flex flex-col min-h-screen">
            <Layout>
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/contact-owner" element={<ContactOwner />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/Emergency" element={<Emergency />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/about-us" element={<AboutUs />} />
                </Routes>
              </main>
            </Layout>

            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact-owner" element={<ContactOwner />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/Emergency" element={<Emergency />} />
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/analytics" element={<Analytics/>} />
                <Route path="/about-us" element={<AboutUs/>}/>
                <Route path="/profile" element={<Profile/>}/>
                {/* Error Pages */}
                <Route path="/404" element={<ErrorPage errorCode={404} />} />
                <Route path="/500" element={<ErrorPage errorCode={500} />} />
                {/* Catch-all route for 404 errors */}
                <Route path="*" element={<ErrorPage errorCode={404} />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
