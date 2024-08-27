import Card from "@/components/card";
import SearchBar from "@/components/searchbar";
import location from "../../public/location.svg";
import fifty from "../../public/50.svg";
import chart from "../../public/chart.svg";
import thumbs from "../../public/thumbs.svg";
import { db } from "@/db";
import { restaurantTable } from "@/db/schema";
import { FoodCard } from "@/components/foodcard";
import Image from "next/image";
import Search from "@/components/search";

const cardData = [
  {
    id: 1,
    title: "Near me",
    description: "Get it quick.",
    image: location,
    altText: "Location icon",
    color: "FFD8D8",
    path: "/nearme",
  },
  {
    id: 2,
    title: "Under 50k",
    description: "Exclusive end-of-months food deals.",
    image: fifty,
    altText: "Another icon",
    color: "F6E3BE",
    path: "/under50k",
  },
  {
    id: 3,
    title: "Leaderboard",
    description: "Top popular foods.",
    image: chart,
    altText: "Another icon",
    color: "F0EAAC",
    path: "/leaderboard",
  },
  {
    id: 4,
    title: "Today`s Choices",
    description: "TODAY’S SURPRISE FOODS",
    image: thumbs,
    altText: "Another icon",
    color: "CCE0AC",
    path: "/today-choice",
  },
  // Add more card data as needed
];


export default async function Home() {
  const restaurants = await db
    .select()
    .from(restaurantTable)
    .limit(20);

  return (
    <main className="bg-[#F1F0F0] flex min-h-screen flex-col items-center p-24 pt-28">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-[#46404F] text-6xl font-extrabold mb-6">
          FOODIE ITB
        </h1>
        {/* <SearchBar /> */}
      </div>
      <div className="mt-12 w-full grid grid-cols-2 gap-x-12 gap-y-6">
        {cardData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
            altText={card.altText}
            color={card.color || "#FFCBCB"}
            path={card.path}
          />
        ))}
      </div>
      <div className="flex flex-col mt-12 w-full justify-center items-center">
        <h1 className="text-[#46404F] text-4xl font-extrabold mb-6">
          Today&rsquo;s Choices
        </h1>
        <Search restaurants={restaurants} type='recommended'/>
      </div>
    </main>
  );
}
