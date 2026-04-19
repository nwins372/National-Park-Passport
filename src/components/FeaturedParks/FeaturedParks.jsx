import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

export default function FeaturedParks({ parks }) {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    if (parks.length > 0) {
      const shuffled = [...parks].sort(() => 0.5 - Math.random()).slice(0, 3);
      setFeatured(shuffled);
    }
  }, [parks]); 

  if (featured.length === 0) return null;

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-stone-900 mb-8">Featured Destinations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {featured.map((park) => {
          const imageUrl = park.images && park.images.length > 0 
            ? park.images[0].url 
            : 'https://via.placeholder.com/400x200?text=No+Image+Available';

          return (
            <Link 
                to={`/park/${park.parkCode}`} 
                key={park.id} 
                className="group" 
            >

                <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  
   
                  <img 
                    src={imageUrl} 
                    alt={park.images?.[0]?.altText || park.fullName} 
                    className="w-full h-56 object-cover"
                    loading="lazy" 
                  />
                  
     
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-stone-800 mb-3 group-hover:text-emerald-700 transition-colors">
                      {park.fullName}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {park.description.substring(0, 120)}...
                    </p>
                  </div>

                </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}