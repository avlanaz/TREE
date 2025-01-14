import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMoralis } from "react-moralis";

import Navbar from "./component/Navbar";
import Pages from "./component/Pages";
import pageContent from "./PageContent";

const CryptoAuthContext = React.createContext();
const EmailAuthContext = React.createContext();

export { CryptoAuthContext, EmailAuthContext };

function App(props) {
  const { login, isAuthenticated, authenticate, Moralis, user } = useMoralis();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [popupStatus, setPopupStatus] = useState("");

  const POPUP_RESET_DELAY_MS = 3000;

  const resetPopup = () => {
    setTimeout(() => setPopupStatus(""), POPUP_RESET_DELAY_MS);
  };

  const signupFunc = async () => {
    setPopupStatus("Please wait...");
    console.log(username, password, email);

    const user = new Moralis.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    try {
      await user.signUp();
      setPopupStatus("Succesfully Signed up");
      resetPopup();
    } catch (error) {
      setPopupStatus(`Sign up failed: ${error.message}`);
      resetPopup();
    }
  };

  //Login Only using MetaMask
  const loginUsingMetamask = () => {
    authenticate();
  };

  const loginUsingUsername = async () => {
    const result = await login(username, password);

    if (result === undefined) {
      setPopupStatus("Invalid Credentials.");
      resetPopup();
    } else {
      setPopupStatus("Logged in!");
      resetPopup();
    }
  };

  const resetPassword = () => {
    //getting email from email input
    setPopupStatus("Please wait...");
    if (email) {
      Moralis.User.requestPasswordReset(email)
        .then(() => {
          setPopupStatus("Success. Check your email!");
          resetPopup();
        })
        .catch((error) => {
          setPopupStatus(`Password reset failed: ${error.message}`);
          resetPopup();
        });
    } else {
      setPopupStatus(`Enter your email...`);
      resetPopup();
    }
  };

  return (
    <Router>
      <CryptoAuthContext.Provider
        value={{ authenticate, isAuthenticated, user }}
      >
        <EmailAuthContext.Provider
          value={{
            setEmail,
            setUsername,
            setPassword,
            signupFunc,
            loginUsingUsername,
            popupStatus,
            setPopupStatus,
          }}
        >
          <Navbar></Navbar>
          <Routes>
            <Route exact path="/" element={<Pages columns={pageContent.home} />}></Route>
            <Route exact path="/governance" element={<Pages columns={pageContent.governance} />}></Route>
            <Route exact path="/transaction" element={<Pages columns={pageContent.transaction}/>}></Route>
            <Route exact path="/about" element={<Pages columns={pageContent.about}/>}></Route>
            <Route exact path="/profile" element={<Pages columns={pageContent.profile} />}></Route>
          </Routes>
        </EmailAuthContext.Provider>
      </CryptoAuthContext.Provider>
    </Router>
  );
}

export default App;
