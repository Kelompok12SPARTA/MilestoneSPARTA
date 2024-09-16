import { FoodCard } from "@/components/foodcard";
import { db } from "@/db";
import { restaurantTable } from "@/db/schema";
import { asc, desc, sql } from "drizzle-orm";
import Search from "@/components/search";


//sort descending by rating
export default async function Home() {
  const restaurants = await db
    .select()
    .from(restaurantTable)
    .orderBy(sql`CAST(rating AS FLOAT) DESC`);

  return (
    <main className="bg-[#F1F0F0] flex min-h-screen flex-col items-center p-24 pt-28">
      <div className="w-full flex flex-col">
        <h1 className="text-[#46404F] text-left w-full text-6xl font-extrabold mb-6">
          Leaderboard
        </h1>
        <Search restaurants={restaurants} type="leaderboard"/>
      </div>
    </main>
  );
}
