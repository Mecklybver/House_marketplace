import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { useState } from "react";
import GoogleIcon from "../assets/svg/googleIcon.svg";
import GithubIcon from "../assets/svg/githubIcon.svg";

function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onGoogleClick = () => {
    const provider = new GoogleAuthProvider(); // Google provider
    onAuthClick(provider); // Call the refactored function with Google provider
  };

  const onGithubClick = () => {
    const provider = new GithubAuthProvider(); // GitHub provider
    onAuthClick(provider); // Call the refactored function with GitHub provider
  };

  const onAuthClick = async (provider) => {
    try {
      const auth = getAuth(); // Initialize Firebase auth
      const result = await signInWithPopup(auth, provider); // Sign in with the passed provider
      const user = result.user; // Get the signed-in user

      const docRef = doc(db, "users", user.uid); // Reference Firestore document
      const docSnap = await getDoc(docRef); // Get document snapshot

      // If the user doesn't exist in Firestore, create a new record
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      toast.success("Login Successful");
      // Navigate the user after successful login
      navigate("/");
    } catch (error) {
      console.error("Login error:", error); // Log the error
      toast.error("Could not authorize with provider"); // Show error message to the user
    }
  };




  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/sign-up" ? "up" : "in"} with</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="socialIconDiv" onClick={onGoogleClick}>
          <img className="socialIconImg" src={GoogleIcon} alt="google" />
        </button>
        <button className="socialIconDiv" onClick={onGithubClick}>
          <img className="socialIconImg" src={GithubIcon} alt="google" />
        </button>
      </div>
    </div>
  );
}
export default OAuth;
