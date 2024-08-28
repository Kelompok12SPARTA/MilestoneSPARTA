'use client';
import React, { createContext, useState, useEffect, useContext } from 'react';

interface LocationContextProps {
  location: { address: string | null; coords: { latitude: number; longitude: number } | null };
  isLoading: boolean;
}

const LocationContext = createContext<LocationContextProps>({
  location: { address: null, coords: null },
  isLoading: true,
});


export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<LocationContextProps["location"]>({
    address: null,
    coords: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Fetch address from coordinates using Google Maps Geocoding API
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyArvOXJWyyD7mAu6xSb_zM1DAXgr59zcog`
          )
            .then((response) => response.json())
            .then((data) => {
              if (data.results && data.results.length > 0) {
                const addressComponents = data.results[0].address_components;
                const streetNumber = addressComponents.find((component: any) =>
                  component.types.includes("street_number")
                );
                const streetName = addressComponents.find((component: any) =>
                  component.types.includes("route")
                );
                const fullAddress = `${streetName ? streetName.long_name : ""} ${
                  streetNumber ? streetNumber.long_name : ""
                }`;

                setLocation({
                  address: fullAddress.trim() || "Address not found",
                  coords: { latitude, longitude },
                });
              } else {
                setLocation({ address: "Address not found", coords: { latitude, longitude } });
              }
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              setLocation({ address: "Address not found", coords: { latitude, longitude } });
            })
            .finally(() => setIsLoading(false));
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          setLocation({ address: "Location unavailable", coords: null });
        }
      );
    } else {
      setIsLoading(false);
      setLocation({ address: "Geolocation not supported", coords: null });
    }
  }, []);

  return (
    <LocationContext.Provider value={{ location, isLoading }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);