import React from "react";
// import logo from './logo.svg';
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

import { BrowserRouter as Router, Routes, Route, Link as RouteLink } from "react-router-dom";
import LogIn from "./Pages/Utils/Account";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="login" element={<LogIn />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
