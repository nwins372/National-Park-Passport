import { createContext, useState, useContext, useEffect } from 'react';
import { fetchParks } from '../services/npsAPI'; 
const PassportContext = createContext();

export function PassportProvider({ children }) {

  const [visitedParks, setVisitedParks] = useState([]);
  
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getParkData = async () => {
      if (parks.length === 0) {
        setIsLoading(true);
        const parkData = await fetchParks(500);
        
        const officialParks = parkData.filter((park) => {
          const designation = park.designation || "";
          const isStandardPark = designation.includes("National Park");
          const isRedwood = park.parkCode === "redw";
          const isAmericanSamoa = park.parkCode === "npsa";

          return isStandardPark || isRedwood || isAmericanSamoa;
        });
        console.log(officialParks);
        setParks(officialParks);
        setIsLoading(false);
      }
    };

    getParkData();
  }, [parks.length]); 

  const stampPark = (park) => {
    if (!visitedParks.some(p => p.id === park.id)) {
      setVisitedParks([...visitedParks, park]);
    }
  };

  const removePark = (parkId) => {
    setVisitedParks(visitedParks.filter(p => p.id !== parkId));
  };

  const value = {
    visitedParks,
    stampPark,
    removePark,
    parks,       
    isLoading  
  };

  return (
    <PassportContext.Provider value={value}>
      {children}
    </PassportContext.Provider>
  );
}

export function usePassport() {
  return useContext(PassportContext);
}