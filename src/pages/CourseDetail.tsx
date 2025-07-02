import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, ThumbsDown, ArrowLeft, Calendar, User, BookOpen } from "lucide-react";
import axios from "axios";
import { Navbar } from "./Navbar";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [helpfulReviews, setHelpfulReviews] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/courses/${id}`);
        setCourse(res.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div className="p-8 text-gray-600">Loading course details...</div>;
  if (!course) return <div className="p-8 text-red-600">Course not found.</div>;

  const handleHelpfulVote = (reviewId: number, isHelpful: boolean) => {
    setHelpfulReviews(prev => ({
      ...prev,
      [reviewId]: isHelpful
    }));
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 4) return "text-red-600";
    if (difficulty >= 3) return "text-yellow-600";
    return "text-green-600";
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

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">{course.code}</h1>
              <h2 className="text-2xl text-gray-700 mb-4">{course.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {course.department}
                </span>
                <span>{course.credits} credits</span>
                <span>{course.totalReviews} reviews</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="text-3xl font-bold">{course.ratings.overall}</span>
              </div>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                Write a Review
              </Button>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{course.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {course.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>

          {/* Prerequisites */}
          <div className="text-sm">
            <span className="font-medium text-gray-700">Prerequisites: </span>
            <span className="text-gray-600">{course.prerequisites.join(", ")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ratings Overview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ratings Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Overall Rating */}
                <div className="text-center pb-4 border-b">
                  <div className="text-5xl font-bold text-blue-900 mb-2">{course.ratings.overall}</div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= Math.round(course.ratings.overall) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">{course.totalReviews} total ratings</div>
                </div>

                {/* Rating Categories */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Difficulty</span>
                    <span className={`font-bold ${getDifficultyColor(course.ratings.difficulty)}`}>
                      {course.ratings.difficulty}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Usefulness</span>
                    <span className={`font-bold ${getRatingColor(course.ratings.usefulness)}`}>
                      {course.ratings.usefulness}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Workload</span>
                    <span className={`font-bold ${getDifficultyColor(course.ratings.workload)}`}>
                      {course.ratings.workload}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Teaching Quality</span>
                    <span className={`font-bold ${getRatingColor(course.ratings.teaching)}`}>
                      {course.ratings.teaching}/5
                    </span>
                  </div>
                </div>

                {/* Rating Distribution */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Rating Distribution</h4>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2 mb-2">
                      <span className="text-sm w-4">{rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <Progress 
                        value={(course.ratingDistribution[rating as keyof typeof course.ratingDistribution] / course.totalReviews) * 100} 
                        className="flex-1 h-2" 
                      />
                      <span className="text-sm text-gray-500 w-8">
                        {course.ratingDistribution[rating as keyof typeof course.ratingDistribution]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Student Reviews</h3>
              <Button variant="outline">Sort by: Most Helpful</Button>
            </div>

            <div className="space-y-6">
              {course.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {review.instructor}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {review.term}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>

                    {/* Individual Ratings */}
                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded">
                      <div className="text-center">
                        <div className="text-xs text-gray-600">Difficulty</div>
                        <div className={`font-bold ${getDifficultyColor(review.difficulty)}`}>
                          {review.difficulty}/5
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-600">Usefulness</div>
                        <div className={`font-bold ${getRatingColor(review.usefulness)}`}>
                          {review.usefulness}/5
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-600">Workload</div>
                        <div className={`font-bold ${getDifficultyColor(review.workload)}`}>
                          {review.workload}/5
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    {/* Helpful Buttons */}
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-gray-600">Was this helpful?</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleHelpfulVote(review.id, true)}
                        className={`${helpfulReviews[review.id] === true ? 'bg-green-100 text-green-700' : ''}`}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Yes ({review.helpful})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleHelpfulVote(review.id, false)}
                        className={`${helpfulReviews[review.id] === false ? 'bg-red-100 text-red-700' : ''}`}
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        No ({review.notHelpful})
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
