import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify"

const firebaseConfig = {
  apiKey: "AIzaSyCHEAkSIjZGDf_5r7mEvIVuO8ywkavjfiI",
  authDomain: "netflix-clone-29580.firebaseapp.com",
  projectId: "netflix-clone-29580",
  storageBucket: "netflix-clone-29580.firebasestorage.app",
  messagingSenderId: "241577990490",
  appId: "1:241577990490:web:d6c1b0c5673167e99e3b63"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app); 

const signup = async (name,email,password)=>{
     try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
     } catch (error) {
         console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "));
         
     }
}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
         console.log(error);
         toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout =() =>{
    signOut(auth);
}

export {auth,db,login,signup,logout};