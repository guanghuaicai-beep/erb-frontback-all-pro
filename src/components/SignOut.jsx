import React,{ useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SignOut = () => {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    signOut();          // 清除 Context + localStorage
    navigate("/");
  }, [signOut, navigate]);

  //return null; // 唔需要 UI

   return  (
    <>
  <div className="btn-signout"></div>
  </>
  );
};




export default SignOut;