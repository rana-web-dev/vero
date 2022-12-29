import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    console.log(user)
    const [loading, setLoading] = useState(true);

    //create user with email password
    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    //login with email,password
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
      };


    //googlesignIn  
  const providerLogin = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const updateUser = (userInfo) =>{
    return updateProfile(auth.currentUser,userInfo)
  }

  const logOut = () =>{
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
        console.log('user observing')
        setUser(currentUser)
        setLoading(false)
    })
    return () =>{
        unsubscribe()
    }
  },[])

  const authInfo = {
    createUser,
    user,
    signIn,
    providerLogin,
    loading,
    updateUser,
    logOut
   
  };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;