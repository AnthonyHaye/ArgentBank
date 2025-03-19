/**
 * @file Définit les routes principales de l'application en utilisant React Router.
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/UserProfile';
import NotFound from '../pages/NotFound';

/**
 * Composant de routage principal de l'application.
 *
 * @returns {JSX.Element} Le composant de gestion des routes.
 */
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Route vers la page d'accueil */}
        <Route path="/" element={<Home />} />
        
        {/* Route vers la page de connexion */}
        <Route path="/login" element={<Login />} />        
        
        {/* Route vers la page de profil utilisateur */}
        <Route path="/profile" element={<Profile />} />
        
        {/* Route par défaut pour les pages non trouvées */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
