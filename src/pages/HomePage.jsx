import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import HeroBanner from '../components/HeroBanner';
import FeaturesSection from '../components/FeaturesSection';
import Footer from "../components/Footer";
import "../css/style.css";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const firstName = localStorage.getItem('userFirstName');
    const lastName = localStorage.getItem('userLastName');

    if (firstName && lastName) {
      setUser({ firstName, lastName });
    }
  }, []);

  return (
    <div className="homepage">
      <NavBar user={user} />

      <main>
      <HeroBanner />
      <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

