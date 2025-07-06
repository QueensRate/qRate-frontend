import { Button } from "@/components/ui/button";
import { BookOpen, User } from "lucide-react";

interface ReviewTypeToggleProps {
  reviewType: string;
  onReviewTypeChange: (type: string) => void;
}

const ReviewTypeToggle = ({ reviewType, onReviewTypeChange }: ReviewTypeToggleProps) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-lg p-1 border border-gray-200">
        <Button
          variant={reviewType === "course" ? "default" : "ghost"}
          onClick={() => onReviewTypeChange("course")}
          className="rounded-md"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Course Review
        </Button>
        <Button
          variant={reviewType === "professor" ? "default" : "ghost"}
          onClick={() => onReviewTypeChange("professor")}
          className="rounded-md"
        >
          <User className="h-4 w-4 mr-2" />
          Professor Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewTypeToggle;