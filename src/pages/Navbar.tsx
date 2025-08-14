import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { QRateLogo } from "@/components/QRateLogo"; // adjust the path if needed

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userEmail, logout } = useAuth(); // Ensure this resolves
  const navigate = useNavigate();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${
      isActive ? "font-semibold text-blue-900" : "text-gray-700 hover:text-blue-900"
    }`;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    // navigate('/sign-in'); // Uncomment if redirect needed
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <QRateLogo />
        </NavLink>        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/browse-courses" className={linkClasses}>
            Browse Courses
          </NavLink>
          <NavLink to="/browse-profs" className={linkClasses}>
            Browse Professors
          </NavLink>
          <NavLink to="/submit-review" className={linkClasses}>
            Submit Review
          </NavLink>
          <NavLink to="/about" className={linkClasses}>
            About Us
          </NavLink>
          {userEmail ? (
            <Button
              variant="outline"
              className="border-red-900 text-red-900 hover:bg-red-900 hover:text-white"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          ) : (
            <NavLink to="/sign-in" className={linkClasses}>
              <Button
                variant="outline"
                className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
              >
                Sign In
              </Button>
            </NavLink>
          )}
        </nav>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <NavLink to="/browse-courses" className="block text-gray-700 hover:text-blue-900 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Browse Courses
            </NavLink>
            <NavLink to="/browse-profs" className="block text-gray-700 hover:text-blue-900 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Browse Professors
            </NavLink>
            <NavLink to="/submit-review" className="block text-gray-700 hover:text-blue-900 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              Submit Review
            </NavLink>
            <NavLink to="/about" className="block text-gray-700 hover:text-blue-900 transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </NavLink>
            <div className="pt-2">
              {userEmail ? (
                <Button variant="outline" className="w-full border-red-900 text-red-900 hover:bg-red-900 hover:text-white" onClick={handleLogout}>
                  Sign Out
                </Button>
              ) : (
                <Button variant="outline" className="w-full border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white" onClick={() => { setMobileMenuOpen(false); navigate("/sign-in"); }}>
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};