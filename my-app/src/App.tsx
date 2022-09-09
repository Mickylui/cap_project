import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Products from './Pages/Product/Products';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* everything between navbar & footer are in routes */}
      <Products />
      <Footer />
    </div>
  );
}

export default App;
