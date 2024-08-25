import FoodCard from "@/components/foodcard";
import SearchBar from "@/components/searchbar";
import { GET } from "../api/sort/route";


export default async function Home() {
  const data1 = await GET('1');
  const data2 = await GET('2');
  const data3 = await GET('3');
  const data4 = await GET('4');
  const data5 = await GET('5');
  return (
    <main className="bg-[#F1F0F0] flex min-h-screen flex-col items-center p-24 pt-28">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-[#46404F] text-left w-full text-6xl font-extrabold mb-6">Near me</h1>
        <div className="grid grid-cols-2 gap-y-6 gap-x-2">
          {data1.map((restaurant) => (
          <FoodCard
            title={restaurant.name}
            location={restaurant.address}
            image={restaurant.photo}
            rating={restaurant.rating}
            review="1000"
          />))}
          {data2.map((restaurant) => (
          <FoodCard
            title={restaurant.name}
            location={restaurant.address}
            image={restaurant.photo}
            rating={restaurant.rating}
            review="1000"
          />))}
          {data3.map((restaurant) => (
          <FoodCard
            title={restaurant.name}
            location={restaurant.address}
            image={restaurant.photo}
            rating={restaurant.rating}
            review="1000"
          />))}
          {data4.map((restaurant) => (
          <FoodCard
            title={restaurant.name}
            location={restaurant.address}
            image={restaurant.photo}
            rating={restaurant.rating}
            review="1000"
          />))}
          {data5.map((restaurant) => (
          <FoodCard
            title={restaurant.name}
            location={restaurant.address}
            image={restaurant.photo}
            rating={restaurant.rating}
            review="1000"
          />))}
        </div>
      </div>
    </main>
  );
}
