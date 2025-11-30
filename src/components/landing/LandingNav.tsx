
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Shield, LogOut, LogIn, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LandingNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (role: 'ndma' | 'partner') => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const isRegistered = users.some((user: any) => user.role === role);

    if (isRegistered) {
        localStorage.setItem('userRole', role);
        localStorage.setItem('reports', JSON.stringify(initialReports));
        setIsLoggedIn(true);
        setUserRole(role);

        if (role === 'ndma') {
        navigate("/dashboard");
        } else {
        navigate("/partner-view");
        }
    } else {
        navigate("/signin");
    }
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const userIsLoggedIn = localStorage.getItem('reports') !== null;
      const role = localStorage.getItem('userRole');
      setIsLoggedIn(userIsLoggedIn);
      setUserRole(role);
    };
    
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-transparent text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-accent" />
            <span className="font-bold text-xl">TrainShield</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-accent transition-colors">Features</a>
            <a href="#impact" className="hover:text-accent transition-colors">Impact</a>
            <a href="#testimonials" className="hover:text-accent transition-colors">Testimonials</a>
          </nav>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                {userRole === 'ndma' && (
                  <Link to="/dashboard">
                      <Button variant="ghost" className="text-white hover:bg-white/10">
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Dashboard
                      </Button>
                  </Link>
                )}
                <Button onClick={handleSignOut} variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary">
                            <LogIn className="w-4 h-4 mr-2" />
                            Login
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                        <DropdownMenuItem onClick={() => handleLogin('ndma')}>
                            <span>Login as NDMA Official</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleLogin('partner')}>
                            <span>Login as Partner</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const initialReports = [
    {
        id: "RPT-001",
        title: "Q4 2024 Training Summary",
        type: "Training Summary",
        date: "2024-12-01",
        size: "2.4 MB",
        format: "PDF",
        downloads: 45
    },
];
