import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EthProvider } from "./contexts/EthContext";
import Form from "./components/Form";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <EthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </Router>
      </EthProvider>
    </div>
  );
}

export default App;
