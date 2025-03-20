import { useEffect } from "react";

interface TechnicalSkill {
  name: string;
  percentage: number;
}

interface SoftSkill {
  name: string;
  icon: string;
  description: string;
}

interface Certification {
  name: string;
  provider: string;
  year: string;
  icon: string;
}

interface Achievement {
  title: string;
  description: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

const Skills = () => {
  const programmingLanguages: TechnicalSkill[] = [
    { name: "Python", percentage: 90 },
    { name: "C++", percentage: 85 },
    { name: "SQL", percentage: 80 },
    { name: "JavaScript", percentage: 88 }
  ];
  
  const databases: TechnicalSkill[] = [
    { name: "MySQL", percentage: 85 }
  ];
  
  const promptEngineering: TechnicalSkill[] = [
    { name: "AI Prompt Engineering", percentage: 92 }
  ];
  
  const softSkills: SoftSkill[] = [
    { 
      name: "Problem-solving", 
      icon: "fa-puzzle-piece", 
      description: "Analytical approach to breaking down complex problems into manageable solutions." 
    },
    { 
      name: "Critical thinking", 
      icon: "fa-lightbulb", 
      description: "Evaluating information objectively to make reasoned judgments and decisions." 
    },
    { 
      name: "Communication", 
      icon: "fa-comments", 
      description: "Clearly conveying complex technical concepts to diverse audiences." 
    },
    { 
      name: "Team collaboration", 
      icon: "fa-users", 
      description: "Working effectively in diverse teams to achieve common goals." 
    },
    { 
      name: "Time management", 
      icon: "fa-clock", 
      description: "Efficiently organizing tasks and priorities to meet deadlines." 
    }
  ];
  
  const certifications: Certification[] = [
    { 
      name: "Google Data Analytics Professional Certificate", 
      provider: "Coursera", 
      year: "2022", 
      icon: "fa-google" 
    },
    { 
      name: "IBM AI Engineering Professional Certificate", 
      provider: "Coursera", 
      year: "2021", 
      icon: "fa-ibm" 
    },
    { 
      name: "Full-Stack Web Development Bootcamp", 
      provider: "Coursera", 
      year: "2020", 
      icon: "fa-code" 
    }
  ];
  
  const hackathons: Achievement[] = [
    { 
      title: "1st Place - TechHacks 2022", 
      description: "AI-powered healthcare solution that predicts patient readmission risk." 
    },
    { 
      title: "2nd Place - CodeFest 2021", 
      description: "Developed a sustainable smart city traffic management system." 
    }
  ];
  
  const internships: Experience[] = [
    { 
      role: "Software Engineer Intern", 
      company: "Tech Solutions", 
      period: "Summer 2022", 
      description: "Contributed to backend development for enterprise applications." 
    },
    { 
      role: "Data Analyst Intern", 
      company: "Analytics Co.", 
      period: "Summer 2021", 
      description: "Developed data visualization dashboards for business intelligence." 
    }
  ];
  
  useEffect(() => {
    // Animation for skill progress bars
    const skillProgressBars = document.querySelectorAll(".skill-progress");
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.width = target.getAttribute("data-width") || "0%";
        }
      });
    }, { threshold: 0.2 });
    
    skillProgressBars.forEach(bar => {
      observer.observe(bar);
    });
    
    return () => {
      skillProgressBars.forEach(bar => {
        observer.unobserve(bar);
      });
    };
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="container mx-auto">
        <div className="section-header">
          <h2 className="gradient-text">My Skills</h2>
          <p>I've developed a diverse skill set that enables me to tackle complex projects and deliver exceptional results.</p>
        </div>
        
        <div className="skills-grid">
          {/* Technical Skills */}
          <div className="skill-card technical-skills animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h3>
              <i className="fas fa-laptop-code"></i> Technical Skills
            </h3>
            
            <div className="skill-content">
              <h4>Programming Languages</h4>
              
              {programmingLanguages.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: "0%" }}
                      data-width={`${skill.percentage}%`}
                    ></div>
                  </div>
                </div>
              ))}
              
              <h4>Database Management</h4>
              
              {databases.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: "0%" }}
                      data-width={`${skill.percentage}%`}
                    ></div>
                  </div>
                </div>
              ))}
              
              <h4>Prompt Engineering</h4>
              
              {promptEngineering.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-header">
                    <span>{skill.name}</span>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress accent" 
                      style={{ width: "0%" }}
                      data-width={`${skill.percentage}%`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Soft Skills */}
          <div className="skill-card soft-skills animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <h3>
              <i className="fas fa-brain"></i> Soft Skills
            </h3>
            
            <div className="soft-skills-grid">
              {softSkills.map((skill, index) => (
                <div className="soft-skill-item" key={index}>
                  <div className="skill-icon">
                    <i className={`fas ${skill.icon}`}></i>
                  </div>
                  <h4>{skill.name}</h4>
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bonus-sections">
          {/* Certifications */}
          <div className="skill-card certifications animate-slide-up" style={{ animationDelay: "0.9s" }}>
            <h3>
              <i className="fas fa-certificate"></i> Certifications
            </h3>
            
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <div className="certification-item" key={index}>
                  <div className="cert-icon">
                    <i className={`fab ${cert.icon}`}></i>
                  </div>
                  <div className="cert-details">
                    <h4>{cert.name}</h4>
                    <p>{cert.provider} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Achievements & Experience */}
          <div className="skill-card achievements animate-slide-up" style={{ animationDelay: "1.2s" }}>
            <h3>
              <i className="fas fa-trophy"></i> Achievements & Experience
            </h3>
            
            <div className="experience-content">
              <div className="experience-section">
                <h4>Hackathon Achievements</h4>
                <div className="timeline">
                  {hackathons.map((achievement, index) => (
                    <div className="timeline-item" key={index}>
                      <h5>{achievement.title}</h5>
                      <p>{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="experience-section">
                <h4>Internship Experiences</h4>
                <div className="timeline">
                  {internships.map((internship, index) => (
                    <div className="timeline-item" key={index}>
                      <h5>{internship.role} - {internship.company}</h5>
                      <p>{internship.description}</p>
                      <p className="timeline-period">{internship.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
