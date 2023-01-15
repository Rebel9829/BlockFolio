import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EthProvider } from "./contexts/EthContext";
import Form from "./components/Form";
import Home from "./Home";

function App() {
  return (
    <div>
      <EthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </Router>
      </EthProvider>
    </div>
  );
}

export default App;
