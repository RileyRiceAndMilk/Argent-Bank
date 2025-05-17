import React from 'react';
import NavBar from '../components/NavBar';
import HeroBanner from '../components/HeroBanner';
import FeaturesSection from '../components/FeaturesSection';
import Footer from "../components/Footer";
import "../css/style.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <NavBar /> 

      <main>
        <HeroBanner />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;


