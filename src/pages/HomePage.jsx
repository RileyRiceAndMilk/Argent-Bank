import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import HeroBanner from '../components/HeroBanner';
import FeaturesSection from '../components/FeaturesSection';
import Footer from "../components/Footer";
import "../css/main.css";

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
    <div>
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

