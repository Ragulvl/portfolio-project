import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./contexts/AuthContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Skills from "@/pages/Skills";
import Contact from "@/pages/Contact";
import Preloader from "@/components/Preloader";
import Welcome from "@/components/Welcome";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/skills" component={Skills} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Handle preloader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Handle welcome screen
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {loading && <Preloader />}
        {showWelcome && <Welcome />}
        
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <ScrollToTop />
        </div>
        
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
