import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/UserProfile'
import NotFound from '../pages/NotFound'

//Composant pour protéger des routes
const ProtectedRoute = ({children}) => {
  const { isAuthenticated} = useSelector(state => state.auth)
  return isAuthenticated ? children : <Navigate to= "/login"/>
}

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
