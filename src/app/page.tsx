import Image from "next/image";
import { db } from "@/db";
import { productsTable } from "@/db/schema";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <form action={async () => {
          'use server'
          await db.insert(productsTable).values({
            id: 1,
            name: "udin",
            category: "ganja",
            restaurant: "kontlo",
            price: 20000,
            rating: 5,
          });
        }}>
          <button>submit</button>
        </form>
      </div>
    </main>
  );
}
