import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, register, loginWithGoogle } = useAuth();
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
      toast({
        title: "Success",
        description: "You have been logged in successfully!",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await register(email, password);
      toast({
        title: "Success",
        description: "Your account has been created successfully!",
      });
      setActiveTab("login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      // This will redirect to Google's login page
      await loginWithGoogle();
      // Note: The following code will not execute immediately due to the redirect
      // User will be taken to Google's login page, and upon return,
      // the handleRedirectResult in AuthContext will process the authentication result
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to initiate Google login. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="auth-modal-backdrop">
      <div className="auth-modal">
        <button onClick={onClose} className="auth-modal-close">
          <i className="fas fa-times"></i>
        </button>
        
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register
          </button>
        </div>
        
        {activeTab === 'login' ? (
          <div className="auth-form">
            <h2 className="gradient-text">Welcome Back</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="loginEmail">Email</label>
                <input 
                  id="loginEmail" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input 
                  id="loginPassword" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                />
              </div>
              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Logging in...</>
                ) : (
                  'Login'
                )}
              </button>
              <div className="auth-forgot">
                <a href="#">Forgot Password?</a>
              </div>
              <div className="auth-social">
                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <i className="fab fa-google"></i>
                </button>
                <button type="button" disabled={isLoading}>
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="auth-form">
            <h2 className="gradient-text">Create Account</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="registerName">Full Name</label>
                <input 
                  id="registerName" 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerEmail">Email</label>
                <input 
                  id="registerEmail" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="registerPassword">Password</label>
                <input 
                  id="registerPassword" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input 
                  id="confirmPassword" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••" 
                />
              </div>
              <button 
                type="submit" 
                className="auth-button register-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Registering...</>
                ) : (
                  'Register'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
