import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, ThumbsUp, ThumbsDown, ArrowLeft, Calendar, User, BookOpen } from "lucide-react";
import { Navbar } from "./Navbar";

const ProfessorDetail = () => {
  const { id } = useParams();
  const [helpfulReviews, setHelpfulReviews] = useState<{ [key: number]: boolean }>({});

  // Mock professor data (in a real app, this would be fetched based on the ID)
  const professor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    department: "Computing",
    title: "Associate Professor",
    description: "Dr. Johnson is an expert in computer science education and software engineering. She has been teaching at Queen's University for over 8 years and is known for her engaging teaching style and practical approach to programming concepts.",
    ratings: {
      overall: 4.5,
      difficulty: 3.2,
      helpfulness: 4.7,
      clarity: 4.3,
      teaching: 4.6
    },
    ratingDistribution: {
      5: 62,
      4: 35,
      3: 18,
      2: 7,
      1: 2
    },
    totalReviews: 124,
    tags: ["Helpful", "Clear Explanations", "Fair Grading", "Office Hours", "Engaging"],
    courses: ["COMP 102", "COMP 202", "COMP 302"],
    reviews: [
      {
        id: 1,
        course: "COMP 102",
        term: "Fall 2023",
        rating: 5,
        difficulty: 3,
        helpfulness: 5,
        clarity: 5,
        comment: "Dr. Johnson is an amazing professor! She explains complex concepts in a way that's easy to understand. Her office hours are incredibly helpful and she genuinely cares about student success.",
        helpful: 34,
        notHelpful: 2,
        date: "2023-12-15"
      },
      {
        id: 2,
        course: "COMP 202",
        term: "Winter 2024",
        rating: 4,
        difficulty: 4,
        helpfulness: 4,
        clarity: 4,
        comment: "Great professor overall. The material can be challenging but she provides excellent support during office hours. Her assignments are fair and help reinforce the concepts taught in class.",
        helpful: 28,
        notHelpful: 1,
        date: "2024-04-20"
      },
      {
        id: 3,
        course: "COMP 102",
        term: "Fall 2023",
        rating: 5,
        difficulty: 2,
        helpfulness: 5,
        clarity: 4,
        comment: "Best professor I've had so far! She makes programming fun and accessible. Her teaching style really helped me understand the fundamentals. Highly recommend taking her classes.",
        helpful: 25,
        notHelpful: 0,
        date: "2023-12-10"
      }
    ]
  };

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
      {/* Navigation Bar */}
      <Navbar/>

      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/browse-profs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse Professors
          </Link>
        </Button>

        {/* Professor Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">{professor.name}</h1>
              <h2 className="text-2xl text-gray-700 mb-4">{professor.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {professor.department}
                </span>
                <span>{professor.totalReviews} reviews</span>
                <span>Courses: {professor.courses.join(", ")}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="text-3xl font-bold">{professor.ratings.overall}</span>
              </div>
              <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                Write a Review
              </Button>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{professor.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {professor.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
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
                  <div className="text-5xl font-bold text-blue-900 mb-2">{professor.ratings.overall}</div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= Math.round(professor.ratings.overall) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">{professor.totalReviews} total ratings</div>
                </div>

                {/* Rating Categories */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Difficulty</span>
                    <span className={`font-bold ${getDifficultyColor(professor.ratings.difficulty)}`}>
                      {professor.ratings.difficulty}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Helpfulness</span>
                    <span className={`font-bold ${getRatingColor(professor.ratings.helpfulness)}`}>
                      {professor.ratings.helpfulness}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Clarity</span>
                    <span className={`font-bold ${getRatingColor(professor.ratings.clarity)}`}>
                      {professor.ratings.clarity}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Teaching Quality</span>
                    <span className={`font-bold ${getRatingColor(professor.ratings.teaching)}`}>
                      {professor.ratings.teaching}/5
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
                        value={(professor.ratingDistribution[rating as keyof typeof professor.ratingDistribution] / professor.totalReviews) * 100} 
                        className="flex-1 h-2" 
                      />
                      <span className="text-sm text-gray-500 w-8">
                        {professor.ratingDistribution[rating as keyof typeof professor.ratingDistribution]}
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
              {professor.reviews.map((review) => (
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
                            <BookOpen className="h-4 w-4 mr-1" />
                            {review.course}
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
                        <div className="text-xs text-gray-600">Helpfulness</div>
                        <div className={`font-bold ${getRatingColor(review.helpfulness)}`}>
                          {review.helpfulness}/5
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-600">Clarity</div>
                        <div className={`font-bold ${getRatingColor(review.clarity)}`}>
                          {review.clarity}/5
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

export default ProfessorDetail;