import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  // CREATE USER //
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // UPDATE A USER PROFILE //
  const updateUserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };
  // LOGIN WITH EMAIL AND PASSWORD //

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   OBSERVER USER IS HE/SHE LOGIN OR NOT //

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (observerFunc) => {
      setUser(observerFunc);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [reload]);

  //   SIGN OUT USER //
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // -----SOCIAL LOGIN----- //

  // GOOGLE LOGIN //
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // GITHUB LOGIN //
  const githubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };
  // FACEBOOK LOGIN //
  const facebookLogin = () => {
    return signInWithPopup(auth, facebookProvider);
  };

  // UPDATE PROFILE //
  // const updateYourProfile = (res, { displayName, photoURL }) => {
  //   updateProfile(res, { displayName, photoURL });
  // };
  const allValues = {
    createUser,
    loginUser,
    signOutUser,
    googleLogin,
    githubLogin,
    updateUserProfile,
    setReload,
    setUser,
    facebookLogin,
    user,
    loading,
  };
  return (
    <div>
      <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
    </div>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
