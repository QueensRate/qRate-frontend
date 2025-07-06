import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "./Navbar";

import Footer from "./Footer";
import ReviewHeader from "@/components/ReviewHeader";
import ReviewTypeToggle from "@/components/ReviewTypeToggle";
import CourseReviewForm from "@/components/CourseReviewForm";
import ProfessorReviewForm from "@/components/ProfessorReviewForm";
import ReviewGuidelines from "@/components/ReviewGuidelines";

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

  const handleSubmit = async (e: React.FormEvent) => {
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

      try {
        const response = await fetch("http://localhost:8000/api/v1/reviews/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            courseCode: courseFormData.courseCode,
            courseName: courseFormData.courseName,
            instructor: courseFormData.instructor,
            term: courseFormData.term,
            overallRating: courseFormData.overallRating[0],
            difficulty: courseFormData.difficulty[0],
            usefulness: courseFormData.usefulness[0],
            workload: courseFormData.workload[0],
            teaching: courseFormData.teaching[0],
            comment: courseFormData.comment,
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
          description: "Thank you for your course review. Your feedback will help other students.",
        });

        // Reset course form
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
    
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "Something went wrong.",
          variant: "destructive"
        });
      }
    } else {
      // Professor review validation
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

      // For now, just show success toast for professor reviews
      // You can add the actual API call here when your backend supports professor reviews
      console.log("Submitting professor review:", professorFormData);
      
      toast({
        title: "Review Submitted!",
        description: "Thank you for your professor review. Your feedback will help other students.",
      });

      // Reset professor form
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
          <ReviewHeader />
          <ReviewTypeToggle reviewType={reviewType} onReviewTypeChange={setReviewType} />

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
                  <CourseReviewForm 
                    formData={courseFormData}
                    onFormDataChange={setCourseFormData}
                    getRatingLabel={getRatingLabel}
                  />
                ) : (
                  <ProfessorReviewForm 
                    formData={professorFormData}
                    onFormDataChange={setProfessorFormData}
                    getRatingLabel={getRatingLabel}
                  />
                )}

                <ReviewGuidelines reviewType={reviewType} />

                <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                  Submit {reviewType === "course" ? "Course" : "Professor"} Review
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
