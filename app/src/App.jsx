import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DevisList from "./components/devis/DevisList";
import NotfoundComponent from "./components/NotfoundComponent";
import "./App.css";
import DevisPage from "./components/devis/DevisPage";
import { Flex, Heading } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Router>
        <Flex flexDirection={"row"} gap={"3rem"} p={".5rem"} m={".5rem"}>
          <Heading as="h3" fontSize={"sm"} _hover={{backgroundColor:"teal:900"}}>
            <Link to="/">Home</Link>
          </Heading>
          <Heading as="h3" fontSize={"sm"}>
            <Link to="/devis">New Devis</Link>
          </Heading>
        </Flex>

        <Routes>
          <Route path="" element={<DevisList />} />
          <Route path="devis" element={<DevisPage />} />
          <Route path="devis/:numero" element={<DevisPage />} />
          <Route path="*" element={<NotfoundComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
