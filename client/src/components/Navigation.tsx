import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [location] = useLocation();
  
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("light-mode");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const isLinkActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className={`nav-menu ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">Ragul's Portfolio</div>
        
        <div className="hidden md:flex items-center">
          <div className="nav-links">
            <Link href="/" className={isLinkActive("/") ? "active" : ""}>
              Home
            </Link>
            <a href="#about">About</a>
            <Link href="/skills" className={isLinkActive("/skills") ? "active" : ""}>
              Skills
            </Link>
            <a href="#portfolio">Portfolio</a>
            <Link href="/contact" className={isLinkActive("/contact") ? "active" : ""}>
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="theme-toggle">
              <i className={`fas ${isDarkMode ? "fa-moon" : "fa-sun"}`}></i>
            </button>
            
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="user-profile-container">
                  <img 
                    src={currentUser.photoURL || "https://ui-avatars.com/api/?name=" + (currentUser.displayName || currentUser.email?.charAt(0))}
                    alt="User Profile" 
                    className="user-profile-pic"
                  />
                  <span className="text-white text-sm hidden lg:inline ml-2">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="auth-btn"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="auth-btn"
              >
                <i className="fas fa-user mr-2"></i>
                Login
              </button>
            )}
          </div>
        </div>
        
        <button onClick={toggleMobileMenu} className="mobile-menu-btn">
          <i className="fas fa-bars"></i>
        </button>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <button onClick={toggleMobileMenu} className="close-mobile-menu">
          <i className="fas fa-times"></i>
        </button>
        
        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
          Home
        </Link>
        <a href="#about" onClick={() => setMobileMenuOpen(false)}>
          About
        </a>
        <Link href="/skills" onClick={() => setMobileMenuOpen(false)}>
          Skills
        </Link>
        <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>
          Portfolio
        </a>
        <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
          Contact
        </Link>
        
        {currentUser ? (
          <div className="mobile-user-profile">
            <div className="flex items-center space-x-2 mb-3">
              <img 
                src={currentUser.photoURL || "https://ui-avatars.com/api/?name=" + (currentUser.displayName || currentUser.email?.charAt(0))}
                alt="User Profile" 
                className="user-profile-pic"
              />
              <span className="text-white text-sm">
                {currentUser.displayName || currentUser.email?.split('@')[0]}
              </span>
            </div>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="mobile-auth-btn"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setAuthModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="mobile-auth-btn"
          >
            <i className="fas fa-user mr-2"></i>
            Login
          </button>
        )}
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default Navigation;
