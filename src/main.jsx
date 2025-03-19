/**
 * @file Point d'entrée principal de l'application React.
 * Il configure le rendu de l'application avec React StrictMode et Redux.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router/AppRouter.jsx';
import './stylesheet/index.css';
import { Provider } from 'react-redux';
import store from './redux/store.js';

/**
 * Récupère l'élément HTML racine dans lequel l'application sera rendue.
 * @type {HTMLElement | null}
 */
const rootElement = document.getElementById('root');

if (rootElement) {
  /**
   * Crée une racine React et y rend l'application.
   */
  createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </StrictMode>
  );
} else {
  console.error("Élément root introuvable. Assurez-vous qu'il existe dans le fichier HTML.");
}
