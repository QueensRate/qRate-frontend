import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import Footer from "@/pages/Footer";
import { useEffect } from "react";

const developers = [
  {
    id: 1,
    name: "Nathan Daniel",
    graduationYear: "2026",
    degree: "Computer Engineering",
    description: "Hey everyone! A little bit about me, I'm obsessed with AI, full-stack development, and hardware architecture. I'm also a huge UFC fan so hit me up for anything MMA related!",
    profileImage: "/nathan_daniel.jpg",
    github: "https://github.com/nathanddaniel",
    linkedin: "https://www.linkedin.com/in/nathan-daniel-nd/"
  },
  {
    id: 2,
    name: "Lucas Srigley",
    graduationYear: "2026",
    degree: "Computer Engineering",
    description: "Backend specialist with expertise in database design and API development. Architected the course data management system for qRate.",
    profileImage: "/lucas_srigley.jpg",
    github: "https://github.com/lucas-srigley",
    linkedin: "https://www.linkedin.com/in/lucas-srigley/"
  },
  {
    id: 3,
    name: "Jamie Bell",
    graduationYear: "2026",
    degree: "Computer Engineering",
    description: "Data enthusiast and algorithm optimizer. Developed the rating and review aggregation system that powers qRate's course recommendations.",
    profileImage: "/jamie_bell.jpg",
    github: "https://github.com/jamiebell8bit",
    linkedin: "https://www.linkedin.com/in/james-bell13/"
  }, 
  {
    id: 4,
    name: "Nolan Steed",
    graduationYear: "2026",
    degree: "Computer Engineering",
    description: "Data enthusiast and algorithm optimizer. Developed the rating and review aggregation system that powers qRate's course recommendations.",
    profileImage: "/nolan_steed.jpg",
    github: "https://github.com/jamiebell8bit",
    linkedin: "https://www.linkedin.com/in/nolan-steed/"
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Meet the Team Behind qRate</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're a passionate team of developers dedicated to helping students make informed decisions about their course selections.
          </p>
        </div>

        {/* Developer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {developers.map((dev) => (
            <Card key={dev.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={dev.profileImage} alt={dev.name} />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-900">
                      {dev.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-lg text-blue-900">{dev.name}</CardTitle>
                <p className="text-sm text-gray-500">{dev.degree} • Class of {dev.graduationYear}</p>
              </CardHeader>
              <CardContent className="pt-0 px-6 pb-6">
                <p className="text-sm text-gray-600 mb-4">{dev.description}</p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={dev.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-1" /> GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-1" /> LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore Courses?</h2>
            <p className="text-gray-600 mb-6">See what other students are saying and plan your schedule with confidence.</p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link to="/browse-courses">Browse Courses</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/submit-review">Submit a Review</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default About;
