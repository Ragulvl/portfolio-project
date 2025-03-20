const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container mx-auto">
        <div className="footer-content">
          <div className="logo">Ragul's Portfolio</div>
          
          <div className="copyright">
            © {currentYear} Ragul. All rights reserved.
          </div>
          
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
