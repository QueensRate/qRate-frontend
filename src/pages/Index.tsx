import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Search, Users, BookOpen, TrendingUp, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "./Footer";
import TypingHeadline from "@/components/TypingHeadline";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const heroImage = "/queens-backdrop.jpg";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  useEffect(() => {
    const verified = searchParams.get('verified');
    if (verified === 'true') {
      setShowVerificationPopup(true);
      // Clear the query param from URL
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate]);

  const closePopup = () => {
    setShowVerificationPopup(false);
  };

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
    <div className="min-h-screen">
      {/* Hero Section with integrated navbar */}
      <section className="relative min-h-screen pb-20">
        {/* Blurred background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})`, filter: 'blur(1px)' }}
        ></div>
        {/* Navbar overlay */}
        <div className="relative z-20">
          <Navbar />
        </div>
        {/* Overlay with gradient for better integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 z-0" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white flex items-center justify-center min-h-screen">
          <div className="max-w-4xl mx-auto mt-16">
            <TypingHeadline />
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Read trusted reviews from Queen's students. Make informed decisions about your academic journey with qRate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-8 py-3">
                <Link to="/browse-courses">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Courses
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[#a01c3c] text-white hover:bg-white hover:text-[#a01c3c] px-8 py-3" 
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

      {/* Stats Section - Connected to hero with smooth transition */}
      <section className="bg-gradient-to-b from-white via-white to-gray-50 py-12 -mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-5xl mx-auto">
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
        </div>
      </section>

      {/* Featured Courses - Reduced spacing */}
      <section className="bg-white pb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 pt-8">
            Trending Courses This Semester
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {featuredCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-0 shadow-md">
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
        </div>
      </section>

      {/* Testimonials Section - Smooth transition */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border-0">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-blue-900 mb-4" />
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
      </section>

      {/* CTA Section - Better integration */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Experience?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Help fellow students make better course choices. Your honest review could make all the difference.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 shadow-lg">
            <Link to="/submit-review">
              Submit Your First Review
            </Link>
          </Button>
        </div>
      </section>

      {/* Verification Pop-up Modal */}
      {showVerificationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Verification Successful</h2>
            <p className="text-gray-600 mb-6">Your email has been verified! You can now enjoy full access to Qrate.</p>
            <Button
              onClick={closePopup}
              className="w-full bg-blue-900 text-white hover:bg-blue-800 transition"
            >
              Got it
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Index;