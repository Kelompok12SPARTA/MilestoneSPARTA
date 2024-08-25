import { SelectRestaurant } from "@/db/schema";
import Image from "next/image";

export function FoodCard({ restaurant }: { restaurant: SelectRestaurant }) {
  const { name, address, photo, rating, distance, price } = restaurant;
  return (
    <div
      className={`flex items-start  rounded-lg overflow-hidden transition-transform duration-200`}
    >
      {/* Gambar */}
      {photo !== "No photo available" && (
        <div className="w-1/3">
          <Image
            src={photo}
            alt={name}
            width={200}
            height={200}
            className=" object-cover rounded-lg"
          />
        </div>
      )}

      {/* Isi */}
      <div className="w-2/3 p-4">
        <h3 className="text-[#000000] font-bold">
          {name} - {address}
        </h3>
        <div className="flex flex-col gap-2">
          {rating && (
            <p className="text-[#000000] mt-1">
              ⭐ {rating} <span className="text-[#000000]">({})</span>
            </p>
          )}
          {distance && (
            <span className="mt-0 text-[#000000]">
               {(distance / 1000).toFixed(1)} km -> {(distance / 500).toFixed(1)} mins
            </span>
          )}
          {price !== "Unknown" && (
            <span className="mt-0 text-[#000000]">{price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
