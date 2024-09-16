'use client';

import { useState, useEffect } from "react";
import { FoodCard } from "@/components/foodcard";
import SearchBar from "@/components/searchbar";
import { Restaurant } from "@/types/components";
import { useLocation } from "@/utils/LocationContext";
import { fetchPlaceCoordinates } from "@/utils/mapUtils";
import Link from 'next/link'; // Import Link for navigation

interface SearchProps {
  restaurants: Restaurant[];
  type?: 'recommended' | 'leaderboard' | 'default';
  isNearMePage?: boolean;
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const extractPlaceId = (url: string): string | null => {
  const match = url.match(/place_id:([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

function Search({ restaurants, type: initialType, isNearMePage = false }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);  
  const [maxDistance, setMaxDistance] = useState(3); 
  const [type, setType] = useState<'recommended' | 'leaderboard' | 'default'>(initialType || 'default');
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]); 
  const totalItemsPerPage = 12;
  const { location } = useLocation(); 

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.matchMedia("(max-width: 640px)").matches; 
      if (isSmallScreen) {
        setType('leaderboard');
      } else {
        setType(initialType || 'default');
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); 
  }, [initialType]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      const updatedRestaurants = await Promise.all(
        restaurants.map(async (restaurant) => {
          const placeId = extractPlaceId(restaurant.link || "");
          if (placeId) {
            const coords = await fetchPlaceCoordinates(placeId);
            if (coords && location.coords) {
              const distance = calculateDistance(
                location.coords.latitude,
                location.coords.longitude,
                coords.latitude,
                coords.longitude
              );
              return { ...restaurant, distance };
            }
          }
          return { ...restaurant, distance: null };
        })
      );

      setRestaurantData(updatedRestaurants);
    };

    fetchRestaurantData();
  }, [restaurants, location]);

  const filteredRestaurants = isNearMePage
    ? restaurantData
        .filter(restaurant => restaurant.distance !== null && restaurant.distance <= maxDistance)
        .filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0))
    : restaurantData
        .filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()))
        //.sort(() => Math.random() - 0.5); 

  const indexOfLastItem = currentPage * totalItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - totalItemsPerPage;
  const currentItems = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRestaurants.length / totalItemsPerPage);

  const gridColumnsClass = type === 'recommended' ? "grid-cols-3" : type === "leaderboard" ? "grid-cols-1" : "grid-cols-2";

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> 
      
      {isNearMePage && (
        <div className="my-4 w-full flex flex-col">
          <label htmlFor="maxDistance" className="text-black">
            Max Distance: {maxDistance} km
          </label>
          <input
            id="maxDistance"
            type="range"
            min="1"
            max="3"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-[240px] bg-black"
          />
        </div>
      )}

      <div className={`grid ${gridColumnsClass} gap-4 gap-y-6 mt-12`}>
        {currentItems.map((restaurant) => (
          <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id}>
              <FoodCard restaurant={restaurant} />
          </Link>
        ))}
      </div>

      {filteredRestaurants.length > totalItemsPerPage && (
        <div className="flex w-full justify-between items-center mt-4">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 rounded disabled:bg-gray-100"
          >
            Previous
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  currentPage === index + 1 ? 'bg-black' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>

          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 rounded disabled:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Search;
