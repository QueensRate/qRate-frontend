import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, ArrowLeft, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "./Navbar";
import Footer from "@/pages/Footer";

const SubmitReview = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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

  const terms = [
    "Summer 2025",
    "Winter 2025",
    "Fall 2024",
    "Summer 2024",
    "Winter 2024",
    "Fall 2023",
    "Summer 2023",
    "Winter 2023",
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

  const handleCourseSelect = (courseCode: string) => {
    const course = courseOptions.find(c => c.code === courseCode);
    setFormData(prev => ({
      ...prev,
      courseCode,
      courseName: course?.name || ""
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.courseCode || !formData.instructor || !formData.term || !formData.comment.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.comment.length < 50) {
      toast({
        title: "Comment Too Short",
        description: "Please provide a more detailed review (at least 50 characters).",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/reviews/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          courseCode: formData.courseCode,
          courseName: formData.courseName,
          instructor: formData.instructor,
          term: formData.term,
          overallRating: formData.overallRating[0],
          difficulty: formData.difficulty[0],
          usefulness: formData.usefulness[0],
          workload: formData.workload[0],
          teaching: formData.teaching[0],
          comment: formData.comment,
          user: {
            name: "Anonymous",
            userId: "guest-123"
          }
        })        
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review.");
      }
    
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback. Your review will help other students.",
    });

    // Reset form
    setFormData({
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
  
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        variant: "destructive"
      });
    }
  };

  const getRatingLabel = (value: number, type: string) => {
    if (type === 'difficulty' || type === 'workload') {
      const labels = ["Very Easy", "Easy", "Moderate", "Hard", "Very Hard"];
      return labels[value - 1];
    }
    const labels = ["Very Poor", "Poor", "Average", "Good", "Excellent"];
    return labels[value - 1];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-900" />
                Course Review Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="courseCode">Course Code *</Label>
                    <Select value={formData.courseCode} onValueChange={handleCourseSelect}>
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
                      value={formData.courseName}
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
                      value={formData.instructor}
                      onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                      placeholder="e.g., Dr. Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="term">Term Taken *</Label>
                    <Select value={formData.term} onValueChange={(value) => setFormData(prev => ({ ...prev, term: value }))}>
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

                {/* Ratings */}
                <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg">Rate Your Experience</h3>
                  
                  {/* Overall Rating */}
                  <div>
                    <Label className="flex items-center justify-between">
                      <span>Overall Rating</span>
                      <span className="text-sm text-gray-600">
                        {formData.overallRating[0]}/5 - {getRatingLabel(formData.overallRating[0], 'overall')}
                      </span>
                    </Label>
                    <div className="mt-2">
                      <Slider
                        value={formData.overallRating}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, overallRating: value }))}
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

                  {/* Difficulty */}
                  <div>
                    <Label className="flex items-center justify-between">
                      <span>Difficulty Level</span>
                      <span className="text-sm text-gray-600">
                        {formData.difficulty[0]}/5 - {getRatingLabel(formData.difficulty[0], 'difficulty')}
                      </span>
                    </Label>
                    <div className="mt-2">
                      <Slider
                        value={formData.difficulty}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
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

                  {/* Usefulness */}
                  <div>
                    <Label className="flex items-center justify-between">
                      <span>Usefulness</span>
                      <span className="text-sm text-gray-600">
                        {formData.usefulness[0]}/5 - {getRatingLabel(formData.usefulness[0], 'usefulness')}
                      </span>
                    </Label>
                    <div className="mt-2">
                      <Slider
                        value={formData.usefulness}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, usefulness: value }))}
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

                  {/* Workload */}
                  <div>
                    <Label className="flex items-center justify-between">
                      <span>Workload</span>
                      <span className="text-sm text-gray-600">
                        {formData.workload[0]}/5 - {getRatingLabel(formData.workload[0], 'workload')}
                      </span>
                    </Label>
                    <div className="mt-2">
                      <Slider
                        value={formData.workload}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, workload: value }))}
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

                  {/* Teaching Quality */}
                  <div>
                    <Label className="flex items-center justify-between">
                      <span>Teaching Quality</span>
                      <span className="text-sm text-gray-600">
                        {formData.teaching[0]}/5 - {getRatingLabel(formData.teaching[0], 'teaching')}
                      </span>
                    </Label>
                    <div className="mt-2">
                      <Slider
                        value={formData.teaching}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, teaching: value }))}
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
                      ({formData.comment.length} characters, minimum 50)
                    </span>
                  </Label>
                  <Textarea
                    id="comment"
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Share your experience with this course. What did you like? What was challenging? Would you recommend it to other students?"
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                {/* Guidelines */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Review Guidelines</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Be honest and constructive in your feedback</li>
                    <li>• Focus on the course content, workload, and teaching quality</li>
                    <li>• Avoid personal attacks or inappropriate language</li>
                    <li>• Include specific examples when possible</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitReview;
