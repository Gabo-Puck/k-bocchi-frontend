import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { signInWithGoogle } from "../firebase";
function Login() {  
  return (
    <>
      <div>
        Login
        <p></p>
        <button onClick={signInWithGoogle}>Googe</button>
      </div>
    </>
  );
}

export default Login;
