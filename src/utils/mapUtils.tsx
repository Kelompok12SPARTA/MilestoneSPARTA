export const fetchPlaceCoordinates = async (placeId: string): Promise<{ latitude: number; longitude: number } | null> => {
  const url = `/api/place-details?placeId=${placeId}`;
  
  try {
    const response = await fetch(url); // Default method is GET
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.result?.geometry?.location) {
      const { lat, lng } = data.result.geometry.location;
      return { latitude: lat, longitude: lng };
    }
    
    console.error('Failed to fetch coordinates for placeId:', placeId);
    return null;
  } catch (error) {
    if (error instanceof Error) {
      // TypeScript now knows that error is an instance of Error
      console.error('Error fetching place coordinates:', error.message);
    } else {
      // In case it's some other type of error, handle it here
      console.error('An unknown error occurred while fetching place coordinates.');
    }
    return null;
  }
};
