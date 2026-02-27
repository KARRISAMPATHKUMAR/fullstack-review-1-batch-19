export default function StarRating({ rating }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="star">
          {i <= Math.floor(rating) ? "★" : i - 0.5 <= rating ? "½" : "☆"}
        </span>
      ))}
    </span>
  );
}
