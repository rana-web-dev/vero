import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import './Loader.css';

const Loader = ({children}) => {
  const { user,loading } = useContext(AuthContext);
  console.log(user)
  const location = useLocation();

  if (loading) {
    return (
      <div className="loaderMain">
        <div
          className="loader spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-red-400"
          role="status"
        >
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }
  if(user){
    return children;
}
return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default Loader;
