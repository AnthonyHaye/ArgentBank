console.clear(); // 🔥 Efface la console pour bien voir l'ordre
console.time("Chargement du main.js"); // 🔥 Démarre un timer
console.log("1️⃣ main.js chargé");

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './router/AppRouter.jsx'
import './stylesheet/index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>,
)

