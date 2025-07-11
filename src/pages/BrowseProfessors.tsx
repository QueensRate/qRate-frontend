import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Filter, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import axios from "axios";


const BrowseProfessors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/professors");
        console.log("API response:", res.data); 
        setProfessors(Array.isArray(res.data) ? res.data : res.data.data || []); 
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfessors();
  }, []);

  const departments = ["Faculty of Arts and Science", "Mechanical and Materials Engineering", "Electrical and Computer Engineering", "Smith School of Business", "Smith Engineering", "Faculty of Health Sciences", "Faculty of Education", "Faculty of Law"];


  const filteredProfessors = professors.filter(professor => {
    const matchesSearch = 
      (professor.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (professor.courses_teaching?.join(" ") || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      !selectedDepartment ||
      selectedDepartment === "all" ||
      professor.faculty?.toLowerCase().trim() === selectedDepartment.toLowerCase().trim();

    const matchesRating = !selectedRating || selectedRating === "all" ||
      (selectedRating === "4+" && professor.rating >= 4) ||
      (selectedRating === "3+" && professor.rating >= 3) ||
      (selectedRating === "2+" && professor.rating >= 2);

    return matchesSearch && matchesRating && matchesDepartment;
  });


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navbar/>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Professors</h1>
          <p className="text-gray-600">Find and compare professors at Queen's University</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by professor name"
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
            Showing {filteredProfessors.length} of {professors.length} professors
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Filter className="h-4 w-4" />
            <span>Sort by: Most Reviews</span>
          </div>
        </div>

        {/* Professor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProfessors.map((professor) => (
            <Link key={professor.id} to={`/professor/${professor.name}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-blue-900 mb-1">{professor.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{professor.department}</p>
                      <p className="text-sm text-gray-600">
                        Courses: {(professor.courses ?? []).join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{professor.rating}</span>
                      </div>
                      <div className="text-sm text-gray-500">{professor.reviews} reviews</div>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">Difficulty</div>
                      <div className="text-lg font-bold text-orange-500">{professor.difficulty}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">Helpfulness</div>
                      <div className="text-lg font-bold text-green-500">{professor.helpfulness}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-700">Clarity</div>
                      <div className="text-lg font-bold text-purple-500">{professor.clarity}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {professor.tags?.map((tag, index) => (
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

        {filteredProfessors.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No professors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProfessors;