import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RatingSlider from "./RatingSlider";

interface ProfessorFormData {
  professorName: string;
  department: string;
  courseCode: string;
  term: string;
  overallRating: number[];
  difficulty: number[];
  helpfulness: number[];
  clarity: number[];
  wouldTakeAgain: number[];
  comment: string;
}

interface ProfessorReviewFormProps {
  formData: ProfessorFormData;
  onFormDataChange: (data: ProfessorFormData) => void;
  getRatingLabel: (value: number, type: string) => string;
}

const ProfessorReviewForm = ({ formData, onFormDataChange, getRatingLabel }: ProfessorReviewFormProps) => {
  const professors = [
    "Dr. Sarah Johnson",
    "Prof. Michael Chen", 
    "Dr. Emily Rodriguez",
    "Prof. David Thompson",
    "Dr. Lisa Wang",
    "Prof. Robert Davis"
  ];

  const departments = ["Computing", "Electrical Engineering", "Mathematics", "Psychology", "Business", "Chemistry"];

  const courseOptions = [
    { code: "COMP 102", name: "Introduction to Computing" },
    { code: "COMP 202", name: "Programming Methodology" },
    { code: "ELEC 221", name: "Electric Circuits" },
    { code: "MATH 120", name: "Differential and Integral Calculus" },
    { code: "PSYC 100", name: "Introduction to Psychology" },
    { code: "BUSI 200", name: "Introduction to Business" },
    { code: "CHEM 112", name: "General Chemistry" }
  ];

  const terms = [
    "Fall 2024",
    "Winter 2024",
    "Summer 2024",
    "Fall 2023",
    "Winter 2023",
    "Summer 2023"
  ];

  return (
    <>
      {/* Professor Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="professorName">Professor Name *</Label>
          <Select value={formData.professorName} onValueChange={(value) => onFormDataChange({ ...formData, professorName: value })}>
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
          <Select value={formData.department} onValueChange={(value) => onFormDataChange({ ...formData, department: value })}>
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
          <Select value={formData.courseCode} onValueChange={(value) => onFormDataChange({ ...formData, courseCode: value })}>
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
          <Select value={formData.term} onValueChange={(value) => onFormDataChange({ ...formData, term: value })}>
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
        
        <RatingSlider
          label="Overall Rating"
          value={formData.overallRating}
          onValueChange={(value) => onFormDataChange({ ...formData, overallRating: value })}
          getRatingLabel={getRatingLabel}
          type="overall"
        />

        <RatingSlider
          label="Difficulty Level"
          value={formData.difficulty}
          onValueChange={(value) => onFormDataChange({ ...formData, difficulty: value })}
          getRatingLabel={getRatingLabel}
          type="difficulty"
          leftLabel="Very Easy"
          rightLabel="Very Hard"
        />

        <RatingSlider
          label="Helpfulness"
          value={formData.helpfulness}
          onValueChange={(value) => onFormDataChange({ ...formData, helpfulness: value })}
          getRatingLabel={getRatingLabel}
          type="helpfulness"
          leftLabel="Not Helpful"
          rightLabel="Very Helpful"
        />

        <RatingSlider
          label="Clarity"
          value={formData.clarity}
          onValueChange={(value) => onFormDataChange({ ...formData, clarity: value })}
          getRatingLabel={getRatingLabel}
          type="clarity"
          leftLabel="Unclear"
          rightLabel="Very Clear"
        />

        <RatingSlider
          label="Would Take Again?"
          value={formData.wouldTakeAgain}
          onValueChange={(value) => onFormDataChange({ ...formData, wouldTakeAgain: value })}
          min={0}
          max={1}
          getRatingLabel={getRatingLabel}
          type="wouldTakeAgain"
          leftLabel="No"
          rightLabel="Yes"
        />
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
          onChange={(e) => onFormDataChange({ ...formData, comment: e.target.value })}
          placeholder="Share your experience with this professor. How was their teaching style? Were they helpful during office hours? Any tips for future students?"
          className="mt-1 min-h-[120px]"
        />
      </div>
    </>
  );
};

export default ProfessorReviewForm;