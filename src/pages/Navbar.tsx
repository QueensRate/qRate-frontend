import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${
      isActive ? "font-semibold text-blue-900" : "text-gray-700 hover:text-blue-900"
    }`;

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="bg-blue-900 text-yellow-400 p-2 rounded-lg font-bold text-xl">qRate</div>
          <span className="text-gray-600 text-sm">Queen's University</span>
        </NavLink>
        
        {/* Desktop Navigation */}
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
            About
          </NavLink>
          <Button
            variant="outline"
            className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
          >
            Sign In
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <NavLink 
              to="/browse-courses" 
              className="block text-gray-700 hover:text-blue-900 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Courses
            </NavLink>
            <NavLink 
              to="/browse-profs" 
              className="block text-gray-700 hover:text-blue-900 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Professors
            </NavLink>
            <NavLink 
              to="/submit-review" 
              className="block text-gray-700 hover:text-blue-900 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Submit Review
            </NavLink>
            <NavLink 
              to="/about" 
              className="block text-gray-700 hover:text-blue-900 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <div className="pt-2">
              <Button 
                variant="outline" 
                className="w-full border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};