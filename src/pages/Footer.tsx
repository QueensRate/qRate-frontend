
import { Link } from "react-router-dom";

const Footer = () => {

    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-2xl font-bold">qRate</div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering students to make informed course decisions through authentic peer reviews and comprehensive course data.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-400 hover:text-white transition-colors">Home</Link>
                <Link to="/browse-courses" className="block text-gray-400 hover:text-white transition-colors">Browse Courses</Link>
                <Link to="/browse-profs" className="block text-gray-400 hover:text-white transition-colors">Browse Professors</Link>
                <Link to="/submit-review" className="block text-gray-400 hover:text-white transition-colors">Submit Review</Link>
                <Link to="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 qRate. All rights reserved. Built with ❤️ for students.
            </p>
          </div>
        </div>
      </footer>

    );
};

export default Footer;