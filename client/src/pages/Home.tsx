import { useState, useEffect } from "react";
import { Link } from "wouter";

const Home = () => {
  const [typedText, setTypedText] = useState("full-stack developer");
  
  useEffect(() => {
    const texts = ["full-stack developer", "UI/UX designer", "problem solver", "prompt engineer"];
    let currentIndex = 0;
    
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setTypedText(texts[currentIndex]);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <section id="home" className="hero-section">
      <div className="hero-overlay"></div>
      
      <div className="profile-section">
        <div className="profile-pic-container">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Ragul" 
            className="profile-pic"
          />
          <div className="profile-outline"></div>
        </div>
        
        <div className="content">
          <h1>Ragul</h1>
          <h2>Developer & Designer</h2>
          <p>
            I'm a passionate <span className="typed-text">{typedText}</span> with expertise in creating elegant, user-friendly digital experiences. I specialize in building modern web applications and solving complex problems with clean code.
          </p>
          
          <div className="buttons">
            <a href="#" className="resume-btn">
              <i className="fas fa-file-alt"></i> Resume
            </a>
            <a href="#portfolio" className="portfolio-btn">
              <i className="fas fa-briefcase"></i> Portfolio
            </a>
            <Link href="/skills" className="skills-btn">
              <i className="fas fa-code"></i> Skills
            </Link>
          </div>
          
          <div className="social-links">
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
