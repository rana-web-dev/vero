import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const Loader = ({children}) => {
  const { user,loading } = useContext(AuthContext);
  console.log(user)
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
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
