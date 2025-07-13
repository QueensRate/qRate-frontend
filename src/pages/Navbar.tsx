import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
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
          <NavLink to="/sign-in" className={linkClasses}>
          <Button
            variant="outline"
            className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
          >
            Sign In
          </Button>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
