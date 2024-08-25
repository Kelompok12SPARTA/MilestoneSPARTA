import { FoodCard } from "@/components/foodcard";
import { db } from "@/db";
import { restaurantTable } from "@/db/schema";
import { sql } from "drizzle-orm";

//find under 50k restaurants
export default async function Home() {
  const restaurants = await db
    .select()
    .from(restaurantTable)
    .where(sql`price LIKE '%25K%' OR price LIKE '%0 – 25K%'`);

  return (
    <main className="bg-[#F1F0F0] flex min-h-screen flex-col items-center p-24 pt-28">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-[#46404F] text-left w-full text-6xl font-extrabold mb-6">
          Under 50k
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {restaurants.map((restaurant) => (
            <FoodCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </main>
  );
}
