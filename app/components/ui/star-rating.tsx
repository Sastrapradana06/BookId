/* eslint-disable react/prop-types */
import { Star } from "lucide-react";

interface StarRatingProps {
  rate: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rate }) => {
  return (
    <div className="w-max m-auto  lg:m-0 flex items-center gap-1  justify-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={17}
          fill={index < rate ? "orange" : "#CCD3CA"}
          color={index < rate ? "orange" : "#CCD3CA"}
        />
      ))}
    </div>
  );
};

export default StarRating;
