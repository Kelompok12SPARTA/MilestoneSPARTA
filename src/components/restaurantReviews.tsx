import { db } from '@/db';
import { reviewsTable } from '@/db/schema';
import { eq } from 'drizzle-orm'; // You need this helper for the correct where condition

async function getReviews(restaurantId: number) {
  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.restaurantId, restaurantId)); // Fix the query

    
  console.log("review", reviews);
  return reviews;
}

type RestaurantReviewsProps = {
  restaurantId: number;
};

export default async function RestaurantReviews({ restaurantId }: RestaurantReviewsProps) {
  const reviews = await getReviews(restaurantId);

  return (
    <div className="reviews-section">
      <h3 className="text-xl font-bold mb-4">Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className="mb-2">
              {review.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
}
