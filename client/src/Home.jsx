import { EthProvider } from "./contexts/EthContext";
import React from "react";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Form from "./components/Form";
import Footer from "./components/Footer";
import "./Home.css";

function Home(){
    return(
        <EthProvider>
        <div id="App" >
          <div className="container">
            <Intro />
            <hr />
            <Setup />
            <hr />
            <Demo />
            <hr />
            <Footer />
          </div>
        </div>
      </EthProvider>
    )
}

export default Home;