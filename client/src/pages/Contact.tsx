import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  sendToIndianMessenger: boolean;
}

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    sendToIndianMessenger: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, sendToIndianMessenger: e.target.checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Send form data to backend
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      toast({
        title: "Success!",
        description: "Your message has been sent successfully!",
      });
      
      // If Indian messenger option is checked, show additional notification
      if (formData.sendToIndianMessenger) {
        toast({
          title: "Indian Messenger",
          description: "Message also sent to Indian Messenger",
        });
      }
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        sendToIndianMessenger: false
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="contact-section">
      <div className="container mx-auto">
        <div className="section-header">
          <h2 className="gradient-text">Get In Touch</h2>
          <p>Have a project in mind or want to collaborate? Feel free to reach out!</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-card animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <h3>Contact Information</h3>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="info-icon email-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:contact@ragul.com">contact@ragul.com</a>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon phone-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+910123456789">+91 012 345 6789</a>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon location-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>Chennai, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>
              
              <div className="social-media">
                <h4>Social Media</h4>
                <div className="social-icons">
                  <a href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" aria-label="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" aria-label="WhatsApp">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <div className="form-card">
              <h3>Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry" 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..." 
                  ></textarea>
                </div>
                
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="sendToIndianMessenger"
                    checked={formData.sendToIndianMessenger}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="sendToIndianMessenger">Also send to my Indian Messenger</label>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
