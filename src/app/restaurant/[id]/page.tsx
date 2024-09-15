import { db } from '@/db';
import { restaurantTable, reviewsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import RestaurantReviews from '@/components/restaurantReviews';
import ReviewForm from '@/components/reviewForm';
import Image from 'next/image';
import Link from 'next/link';

type RestaurantPageProps = {
  params: {
    id: string; // ID from the route (dynamic)
  };
};

async function getRestaurant(restaurantId: number) {
  const restaurant = await db
    .select()
    .from(restaurantTable)
    .where(eq(restaurantTable.id, restaurantId))
    .limit(1);

  if (restaurant.length === 0) {
    return null;
  }

  return restaurant[0];
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurantId = Number(params.id);

  const restaurant = await getRestaurant(restaurantId);

  if (!restaurant) {
    notFound(); // If restaurant is not found, show a 404 page
  }


  return (
    <div className="restaurant-page w-full">
      <div className='mx-12 py-24'>
        <h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>
        <div className='flex gap-6'>
          <div>
            <Image src={restaurant.photo} alt={restaurant.name} width={400} height={300} />
          </div>
          <div className='flex flex-col justify-between'>
            <div>
              <p className="text-xl mb-2">{restaurant.address}</p>
              <p className="text-xl mb-2">Rating: {restaurant.rating}</p>
              <p className="text-xl mb-2">Price: {restaurant.price}</p>
            </div>
            <div>
              <Link href={restaurant.link}>
              <button className='bg-[#624F66] flex rounded-xl text-white text-sm hover:bg-[#463848]'>
                <a className='my-2 mx-4'>View on Google Maps</a>
              </button>
              </Link>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          {/* Render the reviews */}
          <RestaurantReviews restaurantId={restaurantId} />

          {/* Render the review form */}
          <ReviewForm restaurantId={restaurantId} />
        </div>
      </div>
    </div>
  );
}
