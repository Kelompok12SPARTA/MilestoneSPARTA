import SearchBar from "@/components/searchbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-[#46404F] text-6xl font-extrabold mb-6">FOODIE ITB</h1>
        <SearchBar/>
      </div>
    </main>
  );
}
