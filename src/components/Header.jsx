/**
 * @file Composant d'en-tête de l'application.
 * Affiche le logo et gère la connexion/déconnexion de l'utilisateur.
 */

import AbLogo from '../assets/img/argentBankLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../redux/services/api'; 
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import '../stylesheet/components/header.css';
import React from 'react';

/**
 * Composant représentant l'en-tête de l'application.
 * @returns {JSX.Element} - Composant d'en-tête avec gestion de l'authentification.
 */
const HeaderComponent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("autorisationToken") || sessionStorage.getItem("autorisationToken");
  const { data: profile, isLoading, isError } = useGetProfileQuery(undefined, { skip: !token });

  /**
   * Gère la déconnexion de l'utilisateur.
   */
  const handleLogout = () => {
    localStorage.removeItem("autorisationToken");
    sessionStorage.removeItem("autorisationToken");
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img src={AbLogo} alt="Argent Bank Logo" className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="main-nav-items">
        {token && !isLoading && !isError ? ( 
          <div className="user_loggedin">
            <div className="user_avatar">
              <FaUserCircle />
              <p>{profile?.firstName || 'User'}</p> 
            </div>
            <button
              onClick={handleLogout}
              className="logout-button"
              aria-label="Sign out"
            >
              <IoLogOut />
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="main-nav-item">
            <FaUserCircle />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

/**
 * Composant mémorisé pour éviter les re-rendus inutiles.
 */
const Header = React.memo(HeaderComponent);

export default Header;
