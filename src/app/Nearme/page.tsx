import { FoodCard } from "@/components/foodcard";
import { db } from "@/db";
import { restaurantTable } from "@/db/schema";
import { sql } from "drizzle-orm";

//sort ascending by distance
export default async function Home() {
  const restaurants = await db
    .select()
    .from(restaurantTable)
    .orderBy(sql`CAST(distance AS INTEGER)`)
    .limit(6);

  return (
    <main className="bg-[#F1F0F0] flex min-h-screen flex-col items-center p-24 pt-28">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-[#46404F] text-left w-full text-6xl font-extrabold mb-6">
          Near me
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {restaurants.map((restaurant) => (
            <FoodCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </main>
  );
}
