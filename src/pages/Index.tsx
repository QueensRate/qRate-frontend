import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Search, Users, BookOpen, TrendingUp, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/queens-backdrop.jpg";
import { Navbar } from "./Navbar";

const Index = () => {
  const featuredCourses = [
    { code: "COMP 102", name: "Introduction to Computing", rating: 4.2, reviews: 89 },
    { code: "ELEC 221", name: "Electric Circuits", rating: 3.8, reviews: 67 },
    { code: "MATH 120", name: "Differential and Integral Calculus", rating: 3.5, reviews: 234 },
  ];

  const stats = [
    { icon: BookOpen, value: "2,500+", label: "Courses Reviewed" },
    { icon: Users, value: "12,000+", label: "Student Reviews" },
    { icon: TrendingUp, value: "95%", label: "Find Helpful Info" },
  ];


  const testimonials = [
    {
      quote: "qRate helped me choose the perfect electives for my final year. The reviews were spot-on!",
      author: "Sarah M.",
      program: "Computer Science"
    },
    {
      quote: "I avoided a really difficult course thanks to the honest reviews on qRate. Saved my GPA!",
      author: "Mike T.",
      program: "Engineering"
    },
    {
      quote: "The best platform for course selection. Real students, real experiences, real helpful.",
      author: "Emma L.",
      program: "Business"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      <Navbar />

      {/* Hero Section */}
        <section
        className="relative bg-cover bg-center bg-no-repeat py-32"
        style={{ backgroundImage: `url(${heroImage})` }}
        >
        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Find the <span className="text-yellow-400">Perfect Course</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
                Read trusted reviews from Queen's students. Make informed decisions about your academic journey with qRate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-3">
                <Link to="/browse">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Courses
                </Link>
                </Button>
                <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-[#a01c3c] hover:bg-[#a01c3c]  hover:text-white px-8 py-3" 
                >
                <Link to="/submit-review">
                    <Star className="mr-2 h-5 w-5" />
                    Submit Review
                </Link>
                </Button>
            </div>
            </div>
        </div>
        </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-900" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Trending Courses This Semester
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {featuredCourses.map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="font-semibold text-blue-900 mb-1">{course.code}</div>
                <div className="text-gray-700 mb-3 h-12">{course.name}</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="text-sm text-gray-500">{course.reviews} reviews</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Students Say
          </h2>
          <p className="text-xl text-gray-600">
            Real experiences from real students
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-red-600 mb-4" />
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.program}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Experience?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Help fellow students make better course choices. Your honest review could make all the difference.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300">
            <Link to="/submit-review">
              Submit Your First Review
            </Link>
          </Button>
        </div>
      </section>

       {/* Footer */}
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
                <Link to="/browse" className="block text-gray-400 hover:text-white transition-colors">Browse Courses</Link>
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
    </div>
  );
};

export default Index;
