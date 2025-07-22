import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Calendar,
  User,
  BookOpen
} from "lucide-react";
import { Navbar } from "./Navbar";

const ProfessorDetail = () => {
  const { name } = useParams();
  const [professor, setProfessor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [helpfulReviews, setHelpfulReviews] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        setLoading(true);
        const encodedName = encodeURIComponent(name);
  
        const reviewRes = await fetch(`https://qrate-backend.azurewebsites.net/api/v1/professor-reviews/search?name=${encodedName}`);
        const reviews = await reviewRes.json();
        if (!reviewRes.ok) throw new Error(reviews.error || "Failed to fetch professor reviews");
  
        const profRes = await fetch("https://qrate-backend.azurewebsites.net/api/v1/professors");
        const profs = await profRes.json();
        if (!profRes.ok) throw new Error(profs.error || "Failed to fetch professor details");
  
        const matchedProfessor = profs.find(
          (p: any) => p.name.toLowerCase() === name?.replace(/%20/g, " ").toLowerCase()
        );
  
        const totalReviews = reviews.length;
        const avg = (key: string) =>
          totalReviews === 0
            ? 0
            : Number(
                (
                  reviews.reduce((sum: number, r: any) => sum + (r.review?.[key] || 0), 0) / totalReviews
                ).toFixed(1)
              );                
  
        const ratingDistribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((r: any) => {
          const rating = r.review?.overallRating;
          if (rating >= 1 && rating <= 5) ratingDistribution[rating]++;
        });
  
        setProfessor({
          name: name?.replace(/%20/g, " ") || "Professor",
          department: matchedProfessor?.faculty || reviews[0]?.department || "N/A",
          title: matchedProfessor?.professor_type || "Professor",
          description: matchedProfessor?.biography || "No biography available.",
          ratings: {
            overall: avg("overallRating"),
            difficulty: avg("difficulty"),
            helpfulness: avg("helpfulness"),
            clarity: avg("clarity"),
            teaching: avg("helpfulness")
          },
          ratingDistribution,
          totalReviews,
          tags: ["Engaging", "Clear", "Helpful"],
          courses: [...new Set(matchedProfessor?.courses_teaching)],
          reviews: totalReviews === 0 ? [] : reviews.map((r: any, index: number) => ({
            id: index,
            courseCode: r.review.courseCode,
            term: r.review.term,
            rating: Number(r.review.overallRating?.toFixed(1)),
            difficulty: Number(r.review.difficulty?.toFixed(1)),
            helpfulness: Number(r.review.helpfulness?.toFixed(1)),
            clarity: Number(r.review.clarity?.toFixed(1)),
            comment: r.review.comment,
            helpful: Math.floor(Math.random() * 50),
            notHelpful: Math.floor(Math.random() * 5),
            timestamp: r.review.timestamp?.split("T")[0] || "2025-01-01"
          }))          
        });
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfessor();
  }, [name]);  

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p>Loading professor data...</p>
        </div>
      </div>
    );
  }

  if (error || !professor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-red-600">Error: {error || "Professor not found"}</p>
          <Link to="/browse-profs" className="text-blue-600 underline">
            Go back to browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/browse-profs">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse Professors
          </Link>
        </Button>

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
                <span className="text-3xl font-bold">
                  {professor.ratings.overall.toFixed(1)}
                </span>
              </div>
              <Link to={`/submit-review?name=${encodeURIComponent(professor.name)}`}>
                <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                  Write a Review
                </Button>
              </Link>
            </div>
          </div>

          <p className="text-gray-700 mb-6">{professor.description}</p>

          <div className="flex flex-wrap gap-2">
            {professor.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ratings Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center pb-4 border-b">
                  <div className="text-5xl font-bold text-blue-900 mb-2">
                    {professor.ratings.overall.toFixed(1)}
                  </div>
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

                <div className="space-y-3">
                  {["difficulty", "helpfulness", "clarity", "teaching"].map((key) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <span className={`font-bold ${
                        key === "difficulty"
                          ? getDifficultyColor(professor.ratings[key])
                          : getRatingColor(professor.ratings[key])
                      }`}>
                        {professor.ratings[key].toFixed(1)}/5
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Rating Distribution</h4>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2 mb-2">
                      <span className="text-sm w-4">{rating}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <Progress
                        value={
                          professor.totalReviews > 0
                            ? (professor.ratingDistribution[rating] / professor.totalReviews) * 100
                            : 0
                        }
                        className="flex-1 h-2"
                      />
                      <span className="text-sm text-gray-500 w-8">
                        {professor.ratingDistribution[rating]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Student Reviews</h3>
              <Button variant="outline">Sort by: Most Helpful</Button>
            </div>

            <div className="space-y-6">
              {professor.reviews.length > 0 ? (
                professor.reviews.map((review: any) => (
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
                              {review.courseCode}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {review.term}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">{review.timestamp}</div>
                      </div>

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
                ))
              ) : (
                <div className="text-gray-500 text-center py-8">No reviews found for this professor yet.</div>
              )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorDetail;
