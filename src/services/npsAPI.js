const BASE_URL = 'https://developer.nps.gov/api/v1';
const API_KEY = import.meta.env.VITE_NPS_API_KEY;

export const fetchParks = async (limit = 500) => {
    try {
        const response = await fetch(`${BASE_URL}/parks?limit=${limit}&api_key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Failed to fetch parks", error);
        return [];
    }
};

export const fetchParkDetails = async (parkCode) => {
  try {
    const response = await fetch(`${BASE_URL}/parks?parkCode=${parkCode}&api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.data && data.data.length > 0) {
      return data.data[0]; 
    } else {
      console.warn(`No data array returned for park ${parkCode}. API sent:`, data);
      return null;
    }

  } catch (error) {
    console.error(`Failed to fetch details for park ${parkCode}:`, error);
    return null; 
  }
};