import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [location] = useLocation();

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
      </div>
    </>
  );
};

export default Navigation;
