// components/FoodCard.tsx
'use client';
import { useState, useEffect } from "react";
import { SelectRestaurant } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { useLocation } from "@/utils/LocationContext";
import { fetchPlaceCoordinates } from "@/utils/mapUtils"; // Import the function here

export function FoodCard({ restaurant }: { restaurant: SelectRestaurant }) {
  const { name, address, photo, rating, price, link } = restaurant;
  const defaultImage = "/food.jpg";
  const [imgSrc, setImgSrc] = useState(photo !== "unknown" && photo ? photo : defaultImage);
  const [restaurantCoords, setRestaurantCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const { location } = useLocation();

  const extractPlaceId = (url: string): string | null => {
    const match = url.match(/place_id:([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };


  useEffect(() => {
    const placeId = extractPlaceId(link)
    if (placeId) {
      fetchPlaceCoordinates(placeId).then(coords => {
        setRestaurantCoords(coords);
      })
    }
  }, [link]);

  const handleImageError = () => {
    setImgSrc("/food.jpg");
  };

  const calculateDistance = () => {
    if (location.coords && restaurantCoords) {
      const { latitude: lat1, longitude: lon1 } = location.coords;
      const { latitude: lat2, longitude: lon2 } = restaurantCoords;

      const toRad = (value: number) => (value * Math.PI) / 180;
      const R = 6371; // Radius of the Earth in km

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceInKm = R * c;
      return distanceInKm.toFixed(1); // Return distance in kilometers with one decimal point
    }
    return null;
  };

  const distanceInKm = calculateDistance();

  return (
    <div className="flex items-start hover:scale-[1.01] rounded-lg h-full overflow-hidden transition-transform duration-200">
      {photo !== "No photo available" && (
        <div className="flex w-auto h-full max-h-[144px] object-cover">
          <Image
            src={imgSrc}
            alt={name}
            width={200}
            height={200}
            className="object-cover rounded-lg"
            onError={handleImageError}
          />
        </div>
      )}
      <div className="w-2/3 px-4">
        <h3 className="text-[#000000] font-bold">
          {name} - {address}
        </h3>
        <div className="flex flex-col gap-2">
          {rating && (
            <p className="text-[#000000] mt-1">
              ⭐ {rating} <span className="text-[#000000]">({})</span>
            </p>
          )}
          {distanceInKm && (
            <span className="mt-0 text-[#000000]">
              {distanceInKm} km
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
