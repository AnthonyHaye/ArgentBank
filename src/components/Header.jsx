import AbLogo from '../assets/img/argentBankLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { FaUserCircle } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'

import '../stylesheet/components/header.css'

const Header = () => {
  //connecte le header au store
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //récupération des infos d'authentification depuis Redux
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile) || {}
  console.log(user?.name)

  //déconnexion
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          src={AbLogo}
          alt="argent Bank Logo"
          className="main-nav-logo-image"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="main-nav-items">
        {isAuthenticated ? (
          <div className="user_loggedin">
            <div className="user_avatar">
              <FaUserCircle />
              <p>{user?.firstName || 'User'}</p>
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
  )
}

export default Header
