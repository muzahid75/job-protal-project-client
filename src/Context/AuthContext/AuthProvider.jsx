import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.init';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const GooogleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user,setUser] =useState(null);
    const [loading,setLoading] =useState(true);

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signWithGoogle =()=>{
        return signInWithPopup(auth, GooogleProvider)
    }

    const signOutUser=()=>{
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            //console.log("User loaded:", currentUser);
    
            if (currentUser) {  // ✅ Check if currentUser exists before accessing email
                //console.log("User Email:", currentUser.email);
                const user = { email: currentUser.email };
                axios.post(`${import.meta.env.VITE_API_BASE_URL}/jwt`, user, { withCredentials: true })
                    .then(() => {
                        //console.log("Login", res.data);
                        setLoading(false);
                    })
                    .catch(error => console.error("JWT Error:", error));
            } else {
                axios.post(`${import.meta.env.VITE_API_BASE_URL}/logout`, {}, { withCredentials: true })
                    .then(() => {
                        //console.log("Logout", res.data);
                        setLoading(false);
                    })
                    .catch(error => console.error("Logout Error:", error));
            }
    
            setUser(currentUser); // ✅ Safe to set user (can be null)
            
        });
    
        return () => {
            unSubscribe(); // ✅ Correct cleanup
        };
    }, []);
    

    const authInfo={
        user,
        loading,
        createUser,
        login,
        signOutUser,
        signWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;