import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DevisList from "./components/devis/DevisList";
import DevisForm from "./components/devis/DevisForm";
import NotfoundComponent from "./components/NotfoundComponent";
import "./App.css";
import DevisPage from "./components/devis/DevisPage";
import { Flex, Heading } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Router>
        <Flex flexDirection={"row"} gap={"3rem"} p={".5rem"} m={".5rem"}>
          <Heading>
            <Link to="/">Home</Link>
          </Heading>
          <Heading>
            <Link to="/devis">New Devis</Link>
          </Heading>
        </Flex>

        <Routes>
          <Route path="" element={<DevisList />} />
          <Route path="devis" element={<DevisPage />} />
          <Route path="devis/:numero" element={<DevisForm />} />
          <Route path="*" element={<NotfoundComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
