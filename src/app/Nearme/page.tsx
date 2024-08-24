import FoodCard from "@/components/foodcard";
import SearchBar from "@/components/searchbar";



export default function Home() {
  return (
    <main className="bg-[#F1F0F0] flex min-h-screen flex-col items-center p-24 pt-28">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-[#46404F] text-left w-full text-6xl font-extrabold mb-6">Near me</h1>
        <div className="grid grid-cols-2 gap-y-6 gap-x-2">
          <FoodCard
            title="Bakmi GM"
            location="Jl. Ganesha No. 10, Bandung"
            image="/logo.png"
            rating={50}
            review="1000"
          />
          <FoodCard
            title="Bakmi GM"
            location="Jl. Ganesha No. 10, Bandung"
            image="/logo.png"
            rating={50}
            review="1000"
          />
          <FoodCard
            title="Bakmi GM"
            location="Jl. Ganesha No. 10, Bandung"
            image="/logo.png"
            rating={50}
            review="1000"
          />
          <FoodCard
            title="Bakmi GM"
            location="Jl. Ganesha No. 10, Bandung"
            image="/logo.png"
            rating={50}
            review="1000"
          />
          <FoodCard
            title="Bakmi GM"
            location="Jl. Ganesha No. 10, Bandung"
            image="/logo.png"
            rating={50}
            review="1000"
          />
        </div>
      </div>
    </main>
  );
}
