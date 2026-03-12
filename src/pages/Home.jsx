import { usePassport } from '../context/PassportContext'; 
import Map from '../components/Map/Map';
import FeaturedParks from '../components/FeaturedParks/FeaturedParks';
import './Home.css'; 

export default function Home() {
  const { parks, isLoading } = usePassport();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>National Park Explorer</h1>
        <p>Learn more about American national parks and keep track of ones visited.</p>
      </div>

      {isLoading ? (
        <p className="loading-text">Loading park data from the National Park Service...</p>
      ) : (
        <>
            <div className="map-wrapper">
                <Map parks={parks} />
            </div>
            <FeaturedParks parks={parks} />
        </>
      )}
    </div>
  );
}