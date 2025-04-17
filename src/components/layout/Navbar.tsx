
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, UserCircle } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Update scrolled state based on window scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Don't show nav links on login page
  const isLoginPage = location.pathname === "/login" || location.pathname === "/";

  const navLinks = [
    {
      name: "Início",
      path: "/home"
    }, 
    {
      name: "Mentores",
      path: "/mentores"
    }, 
    {
      name: "Agendar",
      path: "/agendar"
    }, 
    {
      name: "Dashboard",
      path: "/dashboard"
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-300 ${isScrolled ? "py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm" : "py-4 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={isLoginPage ? "/login" : "/home"} className="flex items-center gap-2">
          <div className="h-10 w-10 md:h-30 md:w-30 relative overflow-hidden hexagon-clip rounded-none py-[10px] px-[11px] my-0 mx-[10px]">
            <img alt="Neki Logo" src="/lovable-uploads/10ed29e0-b5c3-41f9-a684-955af264ca50.png" className="w-full h-full scale-[1.8] object-fill" />
          </div>
          <div className="font-semibold text-lg md:text-xl tracking-tight">
            Mentor <span className="text-neki-black">Neki</span>
          </div>
        </Link>

        {/* Desktop Navigation - Only show if not on login page */}
        {!isLoginPage && (
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`transition-colors duration-200 hover:text-neki-teal ${location.pathname === link.path ? "text-neki-teal font-medium" : "text-foreground/80"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login">
              <Button className="ml-4 bg-neki-gradient hover:opacity-90 transition-opacity">
                <UserCircle className="mr-1.5 h-4 w-4" />
                Sair
              </Button>
            </Link>
          </nav>
        )}

        {/* Mobile Menu Button - Only show if not on login page */}
        {!isLoginPage && (
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu - Only show if not on login page */}
      {!isLoginPage && isMobileMenuOpen && (
        <nav className="md:hidden bg-background absolute top-full left-0 right-0 shadow-md py-4 px-6 flex flex-col gap-4 animate-fade-in-up">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`py-2 transition-colors ${location.pathname === link.path ? "text-neki-blue font-medium" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login">
            <Button className="mt-2 bg-neki-gradient hover:opacity-90 transition-opacity">
              <UserCircle className="mr-1.5 h-4 w-4" />
              Sair
            </Button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
