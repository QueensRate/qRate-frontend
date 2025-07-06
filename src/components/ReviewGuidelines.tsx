interface ReviewGuidelinesProps {
  reviewType: string;
}

const ReviewGuidelines = ({ reviewType }: ReviewGuidelinesProps) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <h4 className="font-medium text-blue-900 mb-2">Review Guidelines</h4>
      <ul className="text-sm text-blue-700 space-y-1">
        <li>• Be honest and constructive in your feedback</li>
        <li>• Focus on {reviewType === "course" ? "course content, workload, and teaching quality" : "teaching style, helpfulness, and communication"}</li>
        <li>• Avoid personal attacks or inappropriate language</li>
        <li>• Include specific examples when possible</li>
      </ul>
    </div>
  );
};

export default ReviewGuidelines;