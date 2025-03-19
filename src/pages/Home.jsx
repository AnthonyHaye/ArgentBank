/**
 * @file Composant de la page d'accueil.
 * Présente les fonctionnalités et avantages de l'application.
 */

import FeatureItem from '../components/FeatureItem';
import Header from '../components/Header';
import Footer from '../components/Footer';
import constants from '../constants';
import '../stylesheet/pages/home.css';

/**
 * Composant représentant la page d'accueil de l'application.
 * @returns {JSX.Element} - Page d'accueil avec présentation des fonctionnalités.
 */
const Home = () => {
  const { features } = constants;
  
  return (
    <>
      <Header />
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {features.map((feat, index) => (
            <FeatureItem
              key={index}
              icon={feat.icon}
              title={feat.title}
              desc={feat.desc}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
