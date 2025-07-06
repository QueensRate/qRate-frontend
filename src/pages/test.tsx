import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, ArrowLeft, BookOpen, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubmitReview = () => {
  const { toast } = useToast();
  const [reviewType, setReviewType] = useState("course"); // "course" or "professor"
  
  const [courseFormData, setCourseFormData] = useState({
    courseCode: "",
    courseName: "",
    instructor: "",
    term: "",
    overallRating: [4],
    difficulty: [3],
    usefulness: [4],
    workload: [3],
    teaching: [4],
    comment: ""
  });

  const [professorFormData, setProfessorFormData] = useState({
    professorName: "",
    department: "",
    courseCode: "",
    term: "",
    overallRating: [4],
    difficulty: [3],
    helpfulness: [4],
    clarity: [4],
    wouldTakeAgain: [1], // 1 = Yes, 0 = No
    comment: ""
  });

  const terms = [
    "Fall 2024",
    "Winter 2024",
    "Summer 2024",
    "Fall 2023",
    "Winter 2023",
    "Summer 2023"
  ];

  const courseOptions = [
    { code: "COMP 102", name: "Introduction to Computing" },
    { code: "COMP 202", name: "Programming Methodology" },
    { code: "ELEC 221", name: "Electric Circuits" },
    { code: "MATH 120", name: "Differential and Integral Calculus" },
    { code: "PSYC 100", name: "Introduction to Psychology" },
    { code: "BUSI 200", name: "Introduction to Business" },
    { code: "CHEM 112", name: "General Chemistry" }
  ];

  const professors = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen", 
    "Dr. Emily Rodriguez",
    "Prof. David Thompson",
    "Dr. Lisa Wang",
    "Prof. Robert Davis"
  ];

  const departments = ["Computing", "Electrical Engineering", "Mathematics", "Psychology", "Business", "Chemistry"];

  const handleCourseSelect = (courseCode: string) => {
    const course = courseOptions.find(c => c.code === courseCode);
    setCourseFormData(prev => ({
      ...prev,
      courseCode,
      courseName: course?.name || ""
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation - handle each form type separately
    if (reviewType === "course") {
      if (!courseFormData.courseCode || !courseFormData.instructor || !courseFormData.term || !courseFormData.comment.trim()) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      if (courseFormData.comment.length < 50) {
        toast({
          title: "Comment Too Short",
          description: "Please provide a more detailed review (at least 50 characters).",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!professorFormData.professorName || !professorFormData.department || !professorFormData.term || !professorFormData.comment.trim()) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      
      if (professorFormData.comment.length < 50) {
        toast({
          title: "Comment Too Short",
          description: "Please provide a more detailed review (at least 50 characters).",
          variant: "destructive",
        });
        return;
      }
    }

    const currentData = reviewType === "course" ? courseFormData : professorFormData;
    console.log(`Submitting ${reviewType} review:`, currentData);
    
    toast({
      title: "Review Submitted!",
      description: `Thank you for your ${reviewType} review. Your feedback will help other students.`,
    });

    // Reset form
    if (reviewType === "course") {
      setCourseFormData({
        courseCode: "",
        courseName: "",
        instructor: "",
        term: "",
        overallRating: [4],
        difficulty: [3],
        usefulness: [4],
        workload: [3],
        teaching: [4],
        comment: ""
      });
    } else {
      setProfessorFormData({
        professorName: "",
        department: "",
        courseCode: "",
        term: "",
        overallRating: [4],
        difficulty: [3],
        helpfulness: [4],
        clarity: [4],
        wouldTakeAgain: [1],
        comment: ""
      });
    }
  };

  const getRatingLabel = (value: number, type: string) => {
    if (type === 'difficulty' || type === 'workload') {
      const labels = ["Very Easy", "Easy", "Moderate", "Hard", "Very Hard"];
      return labels[value - 1];
    }
    if (type === 'wouldTakeAgain') {
      return value === 1 ? "Yes" : "No";
    }
    const labels = ["Very Poor", "Poor", "Average", "Good", "Excellent"];
    return labels[value - 1];
  };

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
            <Link to="/browse" className="text-gray-700 hover:text-blue-900 transition-colors">
              Browse Courses
            </Link>
            <Link to="/browse-professors" className="text-gray-700 hover:text-blue-900 transition-colors">
              Browse Professors
            </Link>
            <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/browse">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Submit a Review</h1>
            <p className="text-gray-600">Share your experience to help fellow students</p>
          </div>

          {/* Review Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 border border-gray-200">
              <Button
                variant={reviewType === "course" ? "default" : "ghost"}
                onClick={() => setReviewType("course")}
                className="rounded-md"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Course Review
              </Button>
              <Button
                variant={reviewType === "professor" ? "default" : "ghost"}
                onClick={() => setReviewType("professor")}
                className="rounded-md"
              >
                <User className="h-4 w-4 mr-2" />
                Professor Review
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {reviewType === "course" ? (
                  <>
                    <BookOpen className="h-5 w-5 mr-2 text-blue-900" />
                    Course Review Form
                  </>
                ) : (
                  <>
                    <User className="h-5 w-5 mr-2 text-blue-900" />
                    Professor Review Form
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {reviewType === "course" ? (
                  <>
                    {/* Course Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="courseCode">Course Code *</Label>
                        <Select value={courseFormData.courseCode} onValueChange={handleCourseSelect}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courseOptions.map(course => (
                              <SelectItem key={course.code} value={course.code}>
                                {course.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="courseName">Course Name</Label>
                        <Input
                          id="courseName"
                          value={courseFormData.courseName}
                          readOnly
                          placeholder="Auto-filled when course is selected"
                          className="bg-gray-50"
                        />
                      </div>
                    </div>

                    {/* Instructor and Term */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="instructor">Instructor Name *</Label>
                        <Input
                          id="instructor"
                          value={courseFormData.instructor}
                          onChange={(e) => setCourseFormData(prev => ({ ...prev, instructor: e.target.value }))}
                          placeholder="e.g., Dr. Smith"
                        />
                      </div>
                      <div>
                        <Label htmlFor="term">Term Taken *</Label>
                        <Select value={courseFormData.term} onValueChange={(value) => setCourseFormData(prev => ({ ...prev, term: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            {terms.map(term => (
                              <SelectItem key={term} value={term}>{term}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Course Ratings */}
                    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-lg">Rate Your Experience</h3>
                      
                      {/* Overall Rating */}
                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Overall Rating</span>
                          <span className="text-sm text-gray-600">
                            {courseFormData.overallRating[0]}/5 - {getRatingLabel(courseFormData.overallRating[0], 'overall')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={courseFormData.overallRating}
                            onValueChange={(value) => setCourseFormData(prev => ({ ...prev, overallRating: value }))}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                          </div>
                        </div>
                      </div>

                      {/* Other course ratings... */}
                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Difficulty Level</span>
                          <span className="text-sm text-gray-600">
                            {courseFormData.difficulty[0]}/5 - {getRatingLabel(courseFormData.difficulty[0], 'difficulty')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={courseFormData.difficulty}
                            onValueChange={(value) => setCourseFormData(prev => ({ ...prev, difficulty: value }))}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Very Easy</span>
                            <span>Very Hard</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Usefulness</span>
                          <span className="text-sm text-gray-600">
                            {courseFormData.usefulness[0]}/5 - {getRatingLabel(courseFormData.usefulness[0], 'usefulness')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={courseFormData.usefulness}
                            onValueChange={(value) => setCourseFormData(prev => ({ ...prev, usefulness: value }))}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Not Useful</span>
                            <span>Very Useful</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Workload</span>
                          <span className="text-sm text-gray-600">
                            {courseFormData.workload[0]}/5 - {getRatingLabel(courseFormData.workload[0], 'workload')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={courseFormData.workload}
                            onValueChange={(value) => setCourseFormData(prev => ({ ...prev, workload: value }))}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Very Light</span>
                            <span>Very Heavy</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Teaching Quality</span>
                          <span className="text-sm text-gray-600">
                            {courseFormData.teaching[0]}/5 - {getRatingLabel(courseFormData.teaching[0], 'teaching')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={courseFormData.teaching}
                            onValueChange={(value) => setCourseFormData(prev => ({ ...prev, teaching: value }))}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Poor</span>
                            <span>Excellent</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Written Review */}
                    <div>
                      <Label htmlFor="comment">
                        Your Review *
                        <span className="text-sm text-gray-500 ml-2">
                          ({courseFormData.comment.length} characters, minimum 50)
                        </span>
                      </Label>
                      <Textarea
                        id="comment"
                        value={courseFormData.comment}
                        onChange={(e) => setCourseFormData(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Share your experience with this course. What did you like? What was challenging? Would you recommend it to other students?"
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Professor Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="professorName">Professor Name *</Label>
                        <Select value={professorFormData.professorName} onValueChange={(value) => setProfessorFormData(prev => ({ ...prev, professorName: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a professor" />
                          </SelectTrigger>
                          <SelectContent>
                            {professors.map(prof => (
                              <SelectItem key={prof} value={prof}>
                                {prof}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="department">Department *</Label>
                        <Select value={professorFormData.department} onValueChange={(value) => setProfessorFormData(prev => ({ ...prev, department: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Course and Term */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="courseCode">Course Code (Optional)</Label>
                        <Select value={professorFormData.courseCode} onValueChange={(value) => setProfessorFormData(prev => ({ ...prev, courseCode: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select course (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            {courseOptions.map(course => (
                              <SelectItem key={course.code} value={course.code}>
                                {course.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="term">Term Taken *</Label>
                        <Select value={professorFormData.term} onValueChange={(value) => setProfessorFormData(prev => ({ ...prev, term: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                          <SelectContent>
                            {terms.map(term => (
                              <SelectItem key={term} value={term}>{term}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Professor Ratings */}
                    <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-lg">Rate This Professor</h3>
                      
                      {/* Overall Rating */}
                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Overall Rating</span>
                          <span className="text-sm text-gray-600">
                            {professorFormData.overallRating[0]}/5 - {getRatingLabel(professorFormData.overallRating[0], 'overall')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={professorFormData.overallRating}
                            onValueChange={(value) => setProfessorFormData(prev => ({ ...prev, overallRating: value }))}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                          </div>
                        </div>
                      </div>

                      {/* Other professor ratings... */}
                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Difficulty Level</span>
                          <span className="text-sm text-gray-600">
                            {professorFormData.difficulty[0]}/5 - {getRatingLabel(professorFormData.difficulty[0], 'difficulty')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={professorFormData.difficulty}
                            onValueChange={(value) => setProfessorFormData(prev => ({ ...prev, difficulty: value }))}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Very Easy</span>
                            <span>Very Hard</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Helpfulness</span>
                          <span className="text-sm text-gray-600">
                            {professorFormData.helpfulness[0]}/5 - {getRatingLabel(professorFormData.helpfulness[0], 'helpfulness')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={professorFormData.helpfulness}
                            onValueChange={(value) => setProfessorFormData(prev => ({ ...prev, helpfulness: value }))}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Not Helpful</span>
                            <span>Very Helpful</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Clarity</span>
                          <span className="text-sm text-gray-600">
                            {professorFormData.clarity[0]}/5 - {getRatingLabel(professorFormData.clarity[0], 'clarity')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={professorFormData.clarity}
                            onValueChange={(value) => setProfessorFormData(prev => ({ ...prev, clarity: value }))}
                            min={1}
                            max={5}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>Unclear</span>
                            <span>Very Clear</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="flex items-center justify-between">
                          <span>Would Take Again?</span>
                          <span className="text-sm text-gray-600">
                            {getRatingLabel(professorFormData.wouldTakeAgain[0], 'wouldTakeAgain')}
                          </span>
                        </Label>
                        <div className="mt-2">
                          <Slider
                            value={professorFormData.wouldTakeAgain}
                            onValueChange={(value) => setProfessorFormData(prev => ({ ...prev, wouldTakeAgain: value }))}
                            min={0}
                            max={1}
                            step={1}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>No</span>
                            <span>Yes</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Written Review */}
                    <div>
                      <Label htmlFor="comment">
                        Your Review *
                        <span className="text-sm text-gray-500 ml-2">
                          ({professorFormData.comment.length} characters, minimum 50)
                        </span>
                      </Label>
                      <Textarea
                        id="comment"
                        value={professorFormData.comment}
                        onChange={(e) => setProfessorFormData(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Share your experience with this professor. How was their teaching style? Were they helpful during office hours? Any tips for future students?"
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                  </>
                )}

                {/* Guidelines */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Review Guidelines</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Be honest and constructive in your feedback</li>
                    <li>• Focus on {reviewType === "course" ? "course content, workload, and teaching quality" : "teaching style, helpfulness, and communication"}</li>
                    <li>• Avoid personal attacks or inappropriate language</li>
                    <li>• Include specific examples when possible</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                  Submit {reviewType === "course" ? "Course" : "Professor"} Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitReview;
