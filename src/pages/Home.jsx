import { useState, useEffect, useMemo } from 'react';
import Map from '../components/map/Map'; 
import FeaturedParks from '../components/FeaturedParks/FeaturedParks';
import { fetchParks } from '../services/npsAPI'; 

export default function Home() {
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const getParksData = async () => {
      try {
        setIsLoading(true);
        const cachedParks = sessionStorage.getItem('npsParks');
        let actualNationalParks = [];

        if (cachedParks) {
          actualNationalParks = JSON.parse(cachedParks);
        } else {
          const parkData = await fetchParks(); 
          actualNationalParks = parkData.filter(park => 
            park.designation && park.designation.includes("National Park")
          );
          sessionStorage.setItem('npsParks', JSON.stringify(actualNationalParks));
        }
        setParks(actualNationalParks);
        const parksWithImages = actualNationalParks.filter(p => p.images && p.images.length > 0);
        const randomPark = parksWithImages.length > 0 
          ? parksWithImages[Math.floor(Math.random() * parksWithImages.length)]
          : null;
          
        if (randomPark) {
          setHeroImage({
            url: randomPark.images[0].url,
            name: randomPark.fullName,
          });
        }

      } catch (err) {
        console.error("Error fetching parks:", err);
        setError("Failed to load national parks data.");
      } finally {
        setIsLoading(false);
      }
    };

    getParksData();
  }, []); 

  const filteredParks = useMemo(() => {
    return parks.filter(park => 
      park.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [parks, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="text-xl font-semibold text-stone-600">Loading explorer...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="text-red-500 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 font-sans text-stone-900 pb-20">
      <div className="relative h-[60vh] flex flex-col items-center justify-center text-center px-4">
        {heroImage && (
          <>
            <img 
              src={heroImage.url} 
              alt={heroImage.name} 
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/60 z-0"></div>
          </>
        )}
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight">
            National Park Explorer
          </h1>
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl mx-auto">
            Learn more about America's 63 national parks.
          </p>
          {heroImage && (
            <p className="text-stone-400 text-sm mt-8">
              Pictured: {heroImage.name}
            </p>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-12">
        
        <div className="max-w-xl mx-auto mb-12">
          <input 
            type="text" 
            placeholder="Search for a park" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 bg-white border border-stone-300 rounded-lg text-stone-900 placeholder-stone-400 
            focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 shadow-sm"
          />

        </div>
        <div className="bg-stone-200 h-[600px] w-full rounded-xl shadow-md border border-stone-300 overflow-hidden mb-16">
          <Map parks={filteredParks} />
        </div>
        
        <div>
          <FeaturedParks parks={filteredParks} />
        </div>
        
      </div>
    </div>
  );
}