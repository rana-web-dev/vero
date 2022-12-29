import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';

const Login = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const {signIn,providerLogin} = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider();
    const [logInError,setLogInError] = useState('')
  
    const navigate = useNavigate();
    const location = useLocation()
  
    const from = location.state?.from?.pathname || "/"

    const handleLogin = data => {
        setLogInError('')
        console.log(data)
    
        signIn(data.email,data.password)
        .then(result =>{
          const user = result.user;
          console.log(user)
          navigate(from, {replace: true});
        })
        .catch(err =>{
            setLogInError(err.message)
        })
      }

      const handleGoogleLogIn = () => {
        providerLogin(googleProvider)
          .then((result) => {
            const user = result.user;
            toast.success('User created successfully!!!')
            navigate(from, { replace: true });
          })
          .catch((err) => {
            console.error(err);
          });
      };
    
    return (
        <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-3xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Email</span></label>
            <input {...register("email",{required:"Email Address is required"})} type="email" className="input input-bordered w-full max-w-xs"/>
            {errors.email && <p className="text-red-600">{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Password</span></label>
            <input {...register("password",{required:"Password is required"})} type="password"  className="input input-bordered w-full max-w-xs"/>
            {errors.password && <p className="text-red-600">{errors.password?.message}</p>}
            {/* {errors.password && errors.password.type === "minLength" && <p className="text-red-600">Password must be more than 10 characters</p> } */}
          </div>
        <input className="btn btn-info my-6 w-full" type="submit" />
        {logInError && <p className="text-red-600">{logInError}</p>}
        </form>
        <p className='mt-4'>New to Doctor's Portal? <Link className="text-info font-bold" to="/signUp">Register</Link></p>
        <div className="divider">OR</div>
        <button onClick={ handleGoogleLogIn} className="btn btn-outline w-full">Login with Google</button>
      </div>
    </div>
    );
};

export default Login;