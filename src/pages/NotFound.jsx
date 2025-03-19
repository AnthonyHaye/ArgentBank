/**
 * @file Composant de la page 404 Not Found.
 * Affiche un message d'erreur lorsque l'utilisateur tente d'accéder à une page inexistante.
 */

import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../stylesheet/pages/notfound.css';

/**
 * Composant de la page Not Found (404).
 * @returns {JSX.Element} - Page d'erreur 404 avec un lien vers l'accueil.
 */
const NotFound = () => {
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
        <div className="notfound_content">
          <h1>404</h1>
          <h2>Oups! La page que vous demandez n&apos;existe pas.</h2>
          <Link to="/">Retourner sur la page d’accueil</Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;
