import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Filter, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const BrowseCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const courses = [
    {
      id: 1,
      code: "COMP 102",
      name: "Introduction to Computing",
      department: "Computing",
      instructor: "Dr. Smith",
      rating: 4.2,
      difficulty: 2.8,
      usefulness: 4.5,
      workload: 3.2,
      reviews: 89,
      tags: ["beginner-friendly", "programming"]
    },
    {
      id: 2,
      code: "ELEC 221",
      name: "Electric Circuits",
      department: "Electrical Engineering",
      instructor: "Prof. Johnson",
      rating: 3.8,
      difficulty: 4.1,
      usefulness: 4.0,
      workload: 4.3,
      reviews: 67,
      tags: ["math-heavy", "lab-intensive"]
    },
    {
      id: 3,
      code: "MATH 120",
      name: "Differential and Integral Calculus",
      department: "Mathematics",
      instructor: "Dr. Wilson",
      rating: 3.5,
      difficulty: 4.5,
      usefulness: 3.8,
      workload: 4.0,
      reviews: 234,
      tags: ["challenging", "fundamental"]
    },
    {
      id: 4,
      code: "PSYC 100",
      name: "Introduction to Psychology",
      department: "Psychology",
      instructor: "Prof. Davis",
      rating: 4.1,
      difficulty: 2.5,
      usefulness: 3.9,
      workload: 2.8,
      reviews: 156,
      tags: ["easy-a", "interesting"]
    },
    {
      id: 5,
      code: "BUSI 200",
      name: "Introduction to Business",
      department: "Business",
      instructor: "Dr. Brown",
      rating: 3.9,
      difficulty: 3.2,
      usefulness: 4.2,
      workload: 3.5,
      reviews: 98,
      tags: ["practical", "group-work"]
    },
    {
      id: 6,
      code: "CHEM 112",
      name: "General Chemistry",
      department: "Chemistry",
      instructor: "Prof. Taylor",
      rating: 3.4,
      difficulty: 4.2,
      usefulness: 3.7,
      workload: 4.1,
      reviews: 178,
      tags: ["lab-heavy", "memorization"]
    }
  ];

  const departments = ["Computing", "Electrical Engineering", "Mathematics", "Psychology", "Business", "Chemistry"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || selectedDepartment === "all" || course.department === selectedDepartment;
    
    const matchesRating = !selectedRating || selectedRating === "all" ||
                         (selectedRating === "4+" && course.rating >= 4) ||
                         (selectedRating === "3+" && course.rating >= 3) ||
                         (selectedRating === "2+" && course.rating >= 2);
    
    return matchesSearch && matchesDepartment && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-900 text-yellow-400 p-2 rounded-lg font-bold text-xl">
              qRate
            </div>
            <span className="text-gray-600 text-sm">Queen's University</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-900 transition-colors">
              Home
            </Link>
            <Link to="/submit-review" className="text-gray-700 hover:text-blue-900 transition-colors">
              Submit Review
            </Link>
            <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Courses</h1>
          <p className="text-gray-600">Find and compare courses at Queen's University</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by course code, name, or instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedRating} onValueChange={setSelectedRating}>
              <SelectTrigger>
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="3+">3+ Stars</SelectItem>
                <SelectItem value="2+">2+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Filter className="h-4 w-4" />
            <span>Sort by: Most Reviews</span>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Link key={course.id} to={`/course/${course.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-blue-900 mb-1">{course.code}</h3>
                      <h4 className="text-gray-700 font-medium mb-2">{course.name}</h4>
                      <p className="text-sm text-gray-500">{course.instructor} • {course.department}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">{course.reviews} reviews</div>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">Difficulty</div>
                      <div className="text-lg font-bold text-orange-500">{course.difficulty}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">Usefulness</div>
                      <div className="text-lg font-bold text-green-500">{course.usefulness}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">Workload</div>
                      <div className="text-lg font-bold text-purple-500">{course.workload}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseCourses;
