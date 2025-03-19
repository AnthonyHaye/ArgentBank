/**
 * @file Composant de la page de connexion.
 * Permet aux utilisateurs de se connecter en fournissant leurs identifiants.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useGetProfileQuery } from "../redux/services/api";
import Header from "../components/Header";
import Input from "../components/Input";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { FaUserCircle } from "react-icons/fa";
import "../stylesheet/pages/login.css";

/**
 * Composant représentant la page de connexion.
 * @returns {JSX.Element} - Page de connexion avec formulaire.
 */
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [login, { isLoading, error }] = useLoginMutation();    
    const token = localStorage.getItem("autorisationToken") || sessionStorage.getItem("autorisationToken");
    const { data: profile } = useGetProfileQuery(undefined, { skip: !token });  
 
    /**
     * Gère la soumission du formulaire de connexion.
     * @param {Event} event - Événement de soumission du formulaire.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await login({ email: email.trim(), password: password.trim(), rememberMe }).unwrap();
            const accessToken = result.body?.token;
            if (!accessToken) throw new Error("Token de connexion manquant");
            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem("autorisationToken", accessToken);
            navigate('/profile');
        } catch (err) {
            console.error("Login Error:", err);
        }
    };

    return (
        <>
            <Header />
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <FaUserCircle className="sign-in-icon" />
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            id="username"
                            label="Username"
                            type="text"
                            autoComplete="username"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                            id="remember-me"
                            label="Remember me"
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        {error && <p className="error-message">{error.data?.message || "Erreur de connexion"}</p>}
                        <Button type="submit" className="sign-in-button" disabled={isLoading}>
                            {isLoading ? "Connexion en cours..." : "Sign In"}
                        </Button>
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Login;
