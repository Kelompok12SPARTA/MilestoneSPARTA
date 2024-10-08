import Card from "@/components/card";
import location from "../../public/location.svg";
import fifty from "../../public/50.svg";
import chart from "../../public/chart.svg";
import thumbs from "../../public/thumbs.svg";
import { db } from "@/db";
import { restaurantTable } from "@/db/schema";
import Search from "@/components/search";
import ReviewForm from "@/components/reviewForm";
import RestaurantReviews from "@/components/restaurantReviews";

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

  return (
    <main className="bg-[#F1F0F0] flex min-h-screen flex-col items-center p-12 sm:p-24 pt-28">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-[#46404F] text-5xl sm:text-6xl font-extrabold mb-6">
          FOODIE ITB
        </h1>
        {/* <SearchBar /> */}
      </div>
      <div className="mt-12 w-full flex flex-col sm:grid sm:grid-cols-2 gap-x-12 gap-y-6">
        {cardData.map((card) => (
          <Card
            id={card.id}
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
            altText={card.altText}
            path={card.path}
          />
        ))}
      </div>
      <div className="flex flex-col mt-12 w-full justify-center items-center">
        <h1 className="text-[#46404F] text-4xl font-extrabold mb-6">
          Places To Eat
        </h1>
        <Search restaurants={restaurants} type='recommended' isNearMePage={false}/>
      </div>
    </main>
  );
}
