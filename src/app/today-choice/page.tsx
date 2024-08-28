import { FoodCard } from "@/components/foodcard";
import { db } from "@/db";
import { restaurantTable } from "@/db/schema";
import { sql } from "drizzle-orm";

//find 3 restaurants randomly
export default async function Home() {
  const restaurants = await db
    .select()
    .from(restaurantTable)
    .orderBy(sql`RANDOM()`)
    .limit(3);

  return (
    <main className="bg-gradient-to-b from-[#CCE0AC] from-10% to-white to-90% flex min-h-screen flex-col items-center p-12 sm:p-24 pt-28">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-[#46404F] text-left w-full text-6xl font-extrabold mb-6">
          Today&apos;s Choice
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {restaurants.map((restaurant) => (
            <FoodCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </main>
  );
}
