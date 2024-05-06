import { BrowserRouter as Router, Routes, Route,Link } from "react-router-dom";
import DevisList from "./components/devis/DevisList";
import DevisForm from "./components/devis/DevisForm";
import NotfoundComponent from "./components/NotfoundComponent";
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
             <Link to="/devis">New Devis</Link>  
          </li>
          <li>

          </li>
        </ul>
        <Routes>
          <Route path="" element={<DevisList />} />
          <Route path="devis" element={<DevisForm />} />
          <Route path="devis/:numero" element={<DevisForm />} />
          <Route path="*" element={<NotfoundComponent />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
