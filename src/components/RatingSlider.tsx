import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface RatingSliderProps {
  label: string;
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  getRatingLabel: (value: number, type: string) => string;
  type: string;
  leftLabel?: string;
  rightLabel?: string;
}

const RatingSlider = ({ 
  label, 
  value, 
  onValueChange, 
  min = 1, 
  max = 5, 
  getRatingLabel, 
  type,
  leftLabel,
  rightLabel 
}: RatingSliderProps) => {
  return (
    <div>
      <Label className="flex items-center justify-between">
        <span>{label}</span>
        <span className="text-sm text-gray-600">
          {max > 1 ? `${value[0]}/${max} - ` : ""}{getRatingLabel(value[0], type)}
        </span>
      </Label>
      <div className="mt-2">
        <Slider
          value={value}
          onValueChange={onValueChange}
          min={min}
          max={max}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          {leftLabel && rightLabel ? (
            <>
              <span>{leftLabel}</span>
              <span>{rightLabel}</span>
            </>
          ) : (
            <>
              <span>{min}</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>{max}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RatingSlider;