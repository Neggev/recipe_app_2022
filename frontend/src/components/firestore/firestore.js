// react imports

import React, { useNavigate } from 'react-router-dom';



// firebase initialization
import { initializeApp } from "firebase/app";

// firebase auth functions
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider,
    deleteUser
} from "firebase/auth";

// firebase function imports
import {
    getFirestore,
    query,
    getDocs,
    updateDoc,
    collection,
    where,
    addDoc,
    setDoc,
    doc,
    getDoc,
    deleteField,
    deleteDoc
} from "firebase/firestore";


// firebase connection configuration variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// fire base config imports
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();



// google sign in/ register
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                id: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                favorites: {},
                avatar: "http://www.piconsulting.org/wp-content/uploads/2015/10/Photo-Not-Available-Male.jpg",
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// login with email/password
const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// register with email/password
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email,
            favorites: {},
            avatar: "http://www.piconsulting.org/wp-content/uploads/2015/10/Photo-Not-Available-Male.jpg",

        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// sends password reset link to users email
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// logout
const Logout = () => {
    signOut(auth)
    localStorage.clear();
};

// deletes user and user data
const DeleteCurrentUser = async (password) => {

    const navigate = useNavigate()
    // console.log(password);
    const docRef = doc(db, "users", auth.currentUser.uid)
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    )


    // console.log(user);
    const result = await reauthenticateWithCredential(
        auth.currentUser,
        credential
    )

    try {
        await deleteDoc(docRef)
        await deleteUser(result.user)
        navigate("/")
        alert("User Deleted")
    } catch (error) {
        alert(error)
    }
};


// updates user bio
const updateBio = async (newBio) => {

    const docRef = doc(db, "users", auth.currentUser.uid)

    try {
        await updateDoc(docRef, { bio: newBio });
        alert("Bio updated");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// adds items to user favorites
const updateFavorites = async (newFav) => {

    if (auth.currentUser === null) {
        alert("You are not logged in")
    } else {


        const docRef = doc(db, "users", auth.currentUser.uid)
        console.log(docRef);

        try {
            await updateDoc(docRef, { favorites: newFav });
            alert("favorites updated");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
};

// gets user favorites
const GetFavorites = async () => {

    const docRef = doc(db, "users", auth.currentUser.uid)
    console.log("get faves");

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(data.favorites);
            return data.favorites
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// removes items from favorites list
const deleteFavorite = async (newFavorites) => {
    console.log(newFavorites);

    const docRef = doc(db, "users", auth.currentUser.uid)

    try {
        await updateDoc(docRef, { favorites: newFavorites })
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


// change user avatar
const updateAvatar = async (newAvatar) => {

    console.log("update:" + newAvatar);
    const docRef = doc(db, "users", auth.currentUser.uid)

    try {
        await updateDoc(docRef, { avatar: newAvatar });
        alert("Avatar updated");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

// change user email
const setNewEmail = async (updatedEmail, password) => {
    console.log(updatedEmail, password);

    const user = auth.currentUser
    const creds = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
    )
    // console.log(creds);
    const ver = await reauthenticateWithCredential(user, creds)
    // console.log(ver);
    try {
        const update = await updateEmail(user, updatedEmail);
        console.log(update);
    } catch (error) {
        console.log(error);
    }
};





export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    Logout,
    setNewEmail,
    updateBio,
    updateAvatar,
    updateFavorites,
    GetFavorites,
    deleteFavorite,
    DeleteCurrentUser
};