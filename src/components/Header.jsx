import AbLogo from '../assets/img/argentBankLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../redux/services/api'; // 🔹 On utilise directement RTK Query
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';

import '../stylesheet/components/header.css';
import React from 'react';

const HeaderComponent = () => {
  const navigate = useNavigate();

  // Vérifier si un token est présent pour lancer la requête
  const token = localStorage.getItem("autorisationToken") || sessionStorage.getItem("autorisationToken");

  // 🔹 Récupération du profil utilisateur via RTK Query
  const { data: profile, isLoading, isError } = useGetProfileQuery(undefined, { skip: !token });

  // 🔹 Déconnexion : Suppression du token et redirection
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
        {token && !isLoading && !isError ? ( // 🔹 Si un token existe et que la requête est terminée
          <div className="user_loggedin">
            <div className="user_avatar">
              <FaUserCircle />
              <p>{profile?.firstName || 'User'}</p> {/* 🔹 Utilise RTK Query pour récupérer le prénom */}
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

const Header = React.memo(HeaderComponent);

export default Header;
