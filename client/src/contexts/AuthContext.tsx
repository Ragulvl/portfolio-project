import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { auth, subscribeToAuthChanges, loginWithEmailAndPassword, registerWithEmailAndPassword, signInWithGoogle, logoutUser, handleRedirectResult } from "../lib/firebase";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<void>; // Changed to void since it redirects and doesn't return a user directly
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // Handle redirect result after Google sign-in
  useEffect(() => {
    async function checkRedirectResult() {
      try {
        setIsLoading(true);
        const redirectUser = await handleRedirectResult();
        if (redirectUser) {
          console.log("Successfully signed in with Google redirect");
          // User is already set via onAuthStateChanged, so we don't need to set it here
          
          // Import toast inside the effect to avoid circular dependencies
          const { toast } = require("@/hooks/use-toast");
          toast({
            title: "Success",
            description: "You have been logged in with Google successfully!",
          });
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
        
        // Show error toast if there was a problem
        const { toast } = require("@/hooks/use-toast");
        toast({
          title: "Error",
          description: "Failed to complete Google login. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    checkRedirectResult();
  }, []);

  const login = async (email: string, password: string) => {
    return loginWithEmailAndPassword(email, password);
  };

  const register = async (email: string, password: string) => {
    return registerWithEmailAndPassword(email, password);
  };

  const loginWithGoogle = async (): Promise<void> => {
    await signInWithGoogle();
  };

  const logout = async () => {
    return logoutUser();
  };

  const value = {
    currentUser,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
