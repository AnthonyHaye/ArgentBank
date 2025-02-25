import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUserData } from "../api/serviceApi";
import { updateUserProfile } from "../redux/slices/profileSlice";
import AccountCard from "../components/AccountCard";
import Button from "../components/Button";
import constants from "../constants"
import Footer from "../components/Footer";
import Input from "../components/Input";
import Header from "../components/Header"
import "../stylesheet/pages/userprofile.css"

/**
 * Composant pour afficher et modifier le profil utilisateur.
 * Permet à l'utilisateur de voir ses informations et de les modifier.
 * Affiche également des informations de compte à l'utilisateur.
 * 
 * @component
 */
const Profile = () => {
        const dispatch = useDispatch();
        const {token} = useSelector((state)=> state.auth)
        const {user} = useSelector((state) => state.profile)        
        const [isEditing, setIsEditing] = useState(false);
        const [hasChanges, setHasChanges] = useState(false);
        const [firstname, setFirstname] = useState(user?.firstName || '');
        const [lastname, setLastname] = useState(user?.lastName || '');
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');

        const { account } = constants;

        /**
         * Active le mode édition pour le profil utilisateur.
         */
        const handleEditClick = () =>{
                setIsEditing(true)
        }

        /**
         * Annule les modifications et retourne à l'affichage des informations du profil.
         */
        const handleCancelClick = () => {
        setIsEditing(false);
        setHasChanges(false);
        setFirstname(user?.firstName || '');
        setLastname(user?.lastName || '');
        };

         /**
         * Gère la mise à jour du profil utilisateur en envoyant les données modifiées à l'API.
         * Affiche un message de succès ou d'erreur en fonction du résultat de la mise à jour.
         * 
         * @param {Event} e - L'événement de soumission du formulaire.
         */
        const handleUpdateProfile = async (e) => {
                e.preventDefault();
                setError('');
                setSuccess('');

                try{
                        if(!token){
                                throw new Error('Token manquant pour la mise à jour du profil')
                        }
                        const updatedData = { firstName: firstname, lastName: lastname}
                        const updatedUser = await updateUserData(updatedData)

                        dispatch(updateUserProfile(updatedUser.body));
                        setSuccess('Profil à jour')
                        setIsEditing(false);
                        setHasChanges(false);
                } catch (err) {
                        console.error('Update Profile Error :' ,err);
                        setError('Erreur lors de la mise à jour du profil utilisateur')
                }
        };

        return(
                <>
                <Header/>
                <main className="main bg-dark">
                        <div className="header">
                                <h1>Welcome back</h1>
                                {isEditing ?(
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
                                                                placeholder={user?.firstName || 'Prénom'}
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
                                                                placeholder={user?.lastName || 'Nom'}
                                                                autoComplete="family-name"
                                                        />                                                        
                                                </div>
                                                {hasChanges && (
                                                                        <div className='form-buttons'>
                                                                                <button type="submit" className='save-button'>Save</button>
                                                                                <button className="cancel-button" type="button" onClick={handleCancelClick}>Cancel</button>
                                                                        </div>
                                                                )}
                                                {error && <p className="error-message">{error}</p>}
                                                {success && <p className="success-message">{success}</p>}

                                        </form>
                                ) : (
                                        <>
                                                <h1>{user?.firstName} {user?.lastName}</h1>
                                                <Button className="edit-button" onClick={handleEditClick}>
                                                        Edit Name
                                                </Button>
                                        </>
                                )}
                        </div>
                        <h2 className="sr-only">Accounts</h2>
                        {account.map((acc, index) =>(
                                <AccountCard
                                key={index}
                                title={acc.title}
                                amount={acc.amount}
                                description={acc.description}
                                />
                        ))}
                </main>
                <Footer/>
                </>
                
        )
}
export default Profile
