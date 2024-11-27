type Props = {
  rating: number;
  // setRating: (rating: number) => void;
//   showAssessment: boolean;
  setShowAssessment: (showAssessment: boolean) => void;
};

export default function RatingStars({
  rating,
  setShowAssessment,
}: Props) {
  return (
    <div
      onClick={() => {
        setShowAssessment(true);
      }}
    >
      {[1, 2, 3, 4, 5].map((star, index) => {
        return (
          <span
            key={index}
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: "35px",
            }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}
