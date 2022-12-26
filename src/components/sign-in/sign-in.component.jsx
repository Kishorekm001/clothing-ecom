import React, { useEffect, useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "../sign-up/sign-up.styles.scss";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const SignIn = ({ logGoogleUser }) => {
  const defaultFormFields = {
    email: "",
    password: "",
  };

  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const handleInputFieldChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  // ***********************************Signin with Redirect method ******************************************

  //   const fetchUserData = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchUserData();
  //   }, []);

  // ***********************************Signin with Redirect method ----- end ******************************************

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("No account associated with this Email");
          break;
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        default:
          console.log(error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an account </h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSignIn}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleInputFieldChange}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleInputFieldChange}
          required
        />
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
          {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button> */}
        </div>
      </form>
    </div>
  );
};

export default SignIn;
