import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RatingSlider from "./RatingSlider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface CourseFormData {
  courseCode: string;
  courseName: string;
  instructor: string;
  term: string;
  overallRating: number[];
  difficulty: number[];
  usefulness: number[];
  workload: number[];
  teaching: number[];
  comment: string;
}

interface CourseReviewFormProps {
  formData: CourseFormData;
  onFormDataChange: (data: CourseFormData) => void;
  getRatingLabel: (value: number, type: string) => string;
}

const CourseReviewForm = ({
  formData,
  onFormDataChange,
  getRatingLabel,
}: CourseReviewFormProps) => {
  const [professorList, setProfessorList] = useState<string[]>([]);
  const [courseOptions, setCourseOptions] = useState<{ code: string; name: string }[]>([]);
  const [searchParams] = useSearchParams();
  const courseCodeFromQuery = searchParams.get("code") || "";

  useEffect(() => {
    const fetchCoursesAndProfessors = async () => {
      try {
        // Fetch courses
        const courseRes = await fetch("http://localhost:8000/api/v1/courses");
        const courseData = await courseRes.json();
        if (Array.isArray(courseData)) {
          const formatted = courseData.map((course: any) => ({
            code: course.code,
            name: course.title,
          }));
          setCourseOptions(formatted);

          // Auto-select course if query param matches a course code
          if (
            courseCodeFromQuery &&
            formatted.some((c) => c.code === courseCodeFromQuery) &&
            formData.courseCode !== courseCodeFromQuery
          ) {
            const course = formatted.find((c) => c.code === courseCodeFromQuery);
            onFormDataChange({
              ...formData,
              courseCode: courseCodeFromQuery,
              courseName: course?.name || "",
            });
          }
        }

        // Fetch professors
        const profRes = await fetch("http://localhost:8000/api/v1/professors");
        const profData = await profRes.json();
        if (Array.isArray(profData)) {
          const names = profData.map((p: any) => p.name);
          setProfessorList(names);
        }
      } catch (err) {
        console.error("Failed to fetch courses or professors", err);
      }
    };

    fetchCoursesAndProfessors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      courseCodeFromQuery &&
      courseOptions.length > 0 &&
      courseOptions.some((c) => c.code === courseCodeFromQuery) &&
      formData.courseCode !== courseCodeFromQuery
    ) {
      const course = courseOptions.find((c) => c.code === courseCodeFromQuery);
      onFormDataChange({
        ...formData,
        courseCode: courseCodeFromQuery,
        courseName: course?.name || "",
      });
    }
  }, [courseCodeFromQuery, courseOptions, formData.courseCode, formData, onFormDataChange]);

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

  const handleCourseSelect = (courseCode: string) => {
    const course = courseOptions.find((c) => c.code === courseCode);
    onFormDataChange({
      ...formData,
      courseCode,
      courseName: course?.name || "",
    });
  };

  return (
    <>
      {/* Course Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="courseCode">Course Code *</Label>
          <Select value={formData.courseCode} onValueChange={handleCourseSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent side="bottom" position="popper" avoidCollisions={false}>
              {courseOptions.map((course) => (
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
          <Select
            value={formData.instructor}
            onValueChange={(value) =>
              onFormDataChange({ ...formData, instructor: value })
            }
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  professorList.length ? "Select an instructor" : "Loading..."
                }
              />
            </SelectTrigger>
            <SelectContent side="bottom" position="popper" avoidCollisions={false}>
              {professorList.map((prof) => (
                <SelectItem key={prof} value={prof}>
                  {prof}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="term">Term Taken *</Label>
          <Select
            value={formData.term}
            onValueChange={(value) => onFormDataChange({ ...formData, term: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent side="bottom" position="popper" avoidCollisions={false}>
              {terms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Ratings */}
      <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-lg">Rate Your Experience</h3>

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
          label="Usefulness"
          value={formData.usefulness}
          onValueChange={(value) => onFormDataChange({ ...formData, usefulness: value })}
          getRatingLabel={getRatingLabel}
          type="usefulness"
          leftLabel="Not Useful"
          rightLabel="Very Useful"
        />

        <RatingSlider
          label="Workload"
          value={formData.workload}
          onValueChange={(value) => onFormDataChange({ ...formData, workload: value })}
          getRatingLabel={getRatingLabel}
          type="workload"
          leftLabel="Very Light"
          rightLabel="Very Heavy"
        />

        <RatingSlider
          label="Teaching Quality"
          value={formData.teaching}
          onValueChange={(value) => onFormDataChange({ ...formData, teaching: value })}
          getRatingLabel={getRatingLabel}
          type="teaching"
          leftLabel="Poor"
          rightLabel="Excellent"
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
          placeholder="Share your experience with this course. What did you like? What was challenging? Would you recommend it to other students?"
          className="mt-1 min-h-[120px]"
        />
      </div>
    </>
  );
};

export default CourseReviewForm;
