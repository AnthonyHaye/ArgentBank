import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { getUserProfile, loginUser } from "../api/serviceApi";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button"
import Footer from "../components/Footer"
import { FaUserCircle } from "react-icons/fa";
import "../stylesheet/pages/login.css"
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { fetchProfileFailure, fetchProfileStart, fetchProfileSuccess } from "../redux/slices/profileSlice";


const Login = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false)

        /**
         * Gère la soumission du formulaire de connexion.
         * Envoie une requête de connexion à l'API et met à jour l'état de l'application en fonction de la réponse.
         * Affiche les messages d'erreur en cas d'échec de connexion.
         * 
         * @param {Event} event - L'événement de soumission du formulaire.
         */
        const handleSubmit = async (event) =>{
                event.preventDefault();
                setLoading(true)
                setError('');

                try{
                        const response = await loginUser(email,password)
                        //accès au token depuis response.body
                        const { token } = response.body;
                        if (!token){
                                throw new Error('Token de connexion manquant')
                        }
                        localStorage.setItem('autorisationToken', token)
                        dispatch(login({ token}));
                        //dispatch de l'action pour fetch user profile
                        dispatch(fetchProfileStart());
                        const userProfile =await getUserProfile(token)
                        dispatch(fetchProfileSuccess(userProfile.body))
                        navigate('/profile')
                } catch(error){
                        console.error('Login Error :', error);
                        setError(error.message || 'Echec de la connection, vérifiez vos identifiants.');
                        dispatch(fetchProfileFailure(error.message));
                } finally{
                        setLoading(false)
                }
        }

        return (
                <>
                 <Header/>
                 <main className="main bg-dark">
                     <section className="sign-in-content">
                         <FaUserCircle className="sign-in-icon"/>
                         <h1>Sign In</h1>
                         <form onSubmit={handleSubmit}>
                             <Input
                                 id="username" 
                                 label="Username" 
                                 type="text"
                                 autocomplete="username" 
                                 onChange={(e) => setEmail(e.target.value)}
                             />
                             <Input 
                                 id="password" 
                                 label="Password" 
                                 type="password"
                                 autocomplete="current-password" 
                                 onChange={(e) => setPassword(e.target.value)}
                             />
                             <Input 
                                 id="remember-me" 
                                 label="Remember me" 
                                 type="checkbox"
                                 autocomplete="off" 
                             />
                             {error && <p className="error-message">{error}</p>}
                             <Button type="submit" className="sign-in-button">
                                 {loading ? 'Connexion en cours...' : 'Sign In'}
                             </Button>
         
                         </form>
                     </section>
                 </main>
                 <Footer/>
                </>
             )
         }
         
         export default Login



