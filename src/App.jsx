import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ParkDetail from './pages/ParkDetail';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/park/:parkCode" element={<ParkDetail/>}/>


        </Routes>
    </Router>

  );
}
export default App;