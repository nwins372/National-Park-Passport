import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchParkDetails } from '../services/npsAPI';
import { usePassport } from '../context/PassportContext';
import StampButton from '../components/passport/StampButton';
import './ParkDetail.css';

export default function ParkDetail() {
  const { id } = useParams(); 
  const { visitedParks, stampPark } = usePassport();

  const [park, setPark] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getDetails = async () => {
      setIsLoading(true);
      const data = await fetchParkDetails(id);
      
      if (data) {
        setPark(data);
      } else {
        setError("Could not load park details.");
      }
      setIsLoading(false);
    };

    getDetails();
  }, [id]);

  if (isLoading) return <h2 className="status-message">Loading park details...</h2>;
  if (error || !park) return <h2 className="status-message error">{error}</h2>;

  const heroImage = park.images && park.images.length > 0 ? park.images[0].url : '';

  const allFeesAndPasses = [
    ...(park.entranceFees || []),
    ...(park.entrancePasses || []).map(pass => ({ ...pass, isPass: true }))
  ];
  
  const displayedFees = allFeesAndPasses.slice(0, 3);

  return (
    <div className="park-detail-container">
      {heroImage && (
        <img src={heroImage} alt={park.fullName} className="park-hero" />
      )}
      
      <div className="park-content">
        <Link to="/" className="back-link">
          &larr; Back to Map
        </Link>

        <div className="park-header">
          <div className="park-title">
            <h1>{park.fullName}</h1>
            <p>{park.designation} • {park.states}</p>
          </div>
          
            <StampButton park={park} />
        </div>

        <p className="park-description">{park.description}</p>
        
        {park.url && (
          <a href={park.url} target="_blank" rel="noopener noreferrer" className="official-link">
            Visit Official NPS Website ↗
          </a>
        )}

        <div className="info-grid">
          
          <div className="info-section">
            <h3>Plan Your Visit</h3>
            {park.operatingHours?.[0] && (
              <div className="info-text.spaced">
                <strong>Operating Hours: </strong> 
                <p className="info-text">
                  {park.operatingHours[0].description}
                </p>
              </div>
            )}
            {park.directionsInfo && (
              <div>
                <strong>Directions: </strong>
                <p className="info-text spaced">
                  {park.directionsInfo}
                </p>
                {park.directionsUrl && (
                  <a href={park.directionsUrl} target="_blank" rel="noopener noreferrer" className="directions-link">
                    Get Detailed Directions ↗
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>Entrance Fees & Passes</h3>
            <div className={`fees-list`}>
              {allFeesAndPasses.length > 0 ? (
                <>
                  {displayedFees.map((fee, index) => (
                    <div key={index} className="fee-item">
                      <span className="fee-cost">${parseFloat(fee.cost).toFixed(2)}</span>
                      <span className="fee-title">{fee.title} {fee.isPass ? "(Pass)" : ""}</span>
                      <span className="fee-desc">{fee.description}</span>
                    </div>
                  ))}
                  
                </>
              ) : (
                <p>No fee information available.</p>
              )}
            </div>
          </div>

          <div className="info-section full-width">
            <h3>Weather Overview</h3>
            <p className="info-text large">
              {park.weatherInfo || "No weather information available."}
            </p>
          </div>

          <div className="info-section full-width">
            <h3>Popular Activities</h3>
            <div className="activity-tags">
              {park.activities?.slice(0, 15).map(activity => (
                <span key={activity.id} className="activity-tag">
                  {activity.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {park.images && park.images.length > 1 && (
          <div className="gallery-section">
            <h3>Photo Gallery</h3>
            <div className="gallery-grid">
              {park.images.slice(1, 5).map((image, index) => (
                <img 
                  key={index}
                  src={image.url} 
                  alt={image.altText || park.fullName}
                  className="gallery-img"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}

        <div className="contact-footer">
          <div>
            <h4>Contact Email</h4>
            <p>{park.contacts?.emailAddresses?.[0]?.emailAddress || 'Not provided'}</p>
          </div>
          <div>
            <h4>Phone Number</h4>
            <p>{park.contacts?.phoneNumbers?.[0]?.phoneNumber || 'Not provided'}</p>
          </div>
          <div>
            <h4>Location</h4>
            <p>{park.addresses?.[0]?.city}, {park.addresses?.[0]?.stateCode} {park.addresses?.[0]?.postalCode}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}