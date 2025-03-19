/**
 * @file Composant de la page de profil utilisateur.
 * Permet d'afficher et de modifier les informations du profil.
 */

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery, useUpdateProfileMutation } from "../redux/services/api";
import AccountCard from "../components/AccountCard";
import Button from "../components/Button";
import constants from "../constants";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Header from "../components/Header";
import "../stylesheet/pages/userprofile.css";

/**
 * Composant représentant la page de profil utilisateur.
 * @returns {JSX.Element} Composant de la page de profil.
 */
const Profile = () => {
    const navigate = useNavigate();
    const { data: profile, error, isLoading, refetch } = useGetProfileQuery();
    const [updateProfile] = useUpdateProfileMutation();
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState('');
    const { account } = constants;

    useEffect(() => {
        if (profile) {
            setFirstname(profile.firstName);
            setLastname(profile.lastName);
        }
    }, [profile]);

    // 🔹 Redirige vers /notfound en cas d'erreur de chargement du profil
    useEffect(() => {
        if (error) {
            console.error("Erreur de chargement du profil, redirection vers NotFound.");
            navigate("/notfound");
        }
    }, [error, navigate]);

    /**
     * Active le mode édition du profil.
     */
    const handleEditClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    /**
     * Annule les modifications et réinitialise les valeurs du profil.
     */
    const handleCancelClick = useCallback(() => {
        setIsEditing(false);
        setHasChanges(false);
        setFirstname(profile?.firstName || '');
        setLastname(profile?.lastName || '');
    }, [profile]);

    /**
     * Envoie la mise à jour du profil utilisateur.
     * @param {Event} e - Événement du formulaire de mise à jour.
     */
    const handleUpdateProfile = useCallback(async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccess('');

        try {
            const updatedData = { firstName: firstname, lastName: lastname };
            await updateProfile(updatedData).unwrap();

            setSuccess('Profil mis à jour avec succès');
            setIsEditing(false);
            setHasChanges(false);

            refetch();
        } catch (err) {
            console.error('Erreur mise à jour du profil :', err);
            setErrorMsg('Erreur lors de la mise à jour du profil utilisateur');
        }
    }, [firstname, lastname, updateProfile, refetch]);

    if (isLoading) return <p>Chargement du profil...</p>;

    return (
        <>
            <Header />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back</h1>
                    {isEditing ? (
                        <form onSubmit={handleUpdateProfile} className="profile-form">
                            <div className="form-inputs">
                                <Input
                                    id="first-name"
                                    label=""
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => {
                                        setFirstname(e.target.value);
                                        setHasChanges(true);
                                    }}
                                    placeholder="Prénom"
                                    autoComplete="given-name"
                                />
                                <Input
                                    id="last-name"
                                    label=""
                                    type="text"
                                    value={lastname}
                                    onChange={(e) => {
                                        setLastname(e.target.value);
                                        setHasChanges(true);
                                    }}
                                    placeholder="Nom"
                                    autoComplete="family-name"
                                />
                            </div>
                            {hasChanges && (
                                <div className='form-buttons'>
                                    <button type="submit" className='save-button'>Save</button>
                                    <button className="cancel-button" type="button" onClick={handleCancelClick}>Cancel</button>
                                </div>
                            )}
                            {errorMsg && <p className="error-message">{errorMsg}</p>}
                            {success && <p className="success-message">{success}</p>}
                        </form>
                    ) : (
                        <>
                            <h1>{profile?.firstName} {profile?.lastName}</h1>
                            <Button className="edit-button" onClick={handleEditClick}>
                                Edit Name
                            </Button>
                        </>
                    )}
                </div>
                <h2 className="sr-only">Accounts</h2>
                {account.map((acc, index) => (
                    <AccountCard
                        key={index}
                        title={acc.title}
                        amount={acc.amount}
                        description={acc.description}
                    />
                ))}
            </main>
            <Footer />
        </>
    );
};

// ✅ Empêcher les re-renders inutiles
export default React.memo(Profile);
