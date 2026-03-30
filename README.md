# National Park Explorer

## Description.
A full-stack web application designed to help users learn more about and track visits to any of the 63 official US National Parks. The National Park Service API was used to retrieve detailed park data. Also features an interactive map for exploration & dynamic park detail pages.

## Technologies Used

* React.js
* Leaflet.js 
* National Park Service (NPS) API
* TailwindCSS

## Installation and Setup

### Prerequisites
* Node.js and React.js installed
* An active API key from the National Park Service (NPS API)

### Environment Variables
Create a `.env` file in the root of your backend directory and add the following:
```env
DATABASE_URL="neon_connection_string"
NPS_API_KEY="your_nps_api_key"
PORT=5000
```

### TODO:
- Save visited parks
- Ability to to review parks
- Search for national monuments, trails, historic sites, and other places that are part of the NPS
