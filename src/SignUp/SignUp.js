import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
const SignUp = () => {

    const {
        register,handleSubmit,formState: { errors },} = useForm();
        const {createUser,updateUser} = useContext(AuthContext)
        const navigate = useNavigate();
        const location = useLocation();
        const from = location.state?.from?.pathname || "/";

        const handleSignUp = (data) => {
            console.log(data);
        
            createUser(data.email,data.password)
            .then(result =>{
                const user = result.user;
                toast.success('User created successfully!!!')
                navigate(from, { replace: true });
                console.log(user)
                
                const userInfo = {
                    displayName:data.name
                  }
                  updateUser(userInfo)
                  .then(()=>{
                    saveUserInfo(data.name,data.email)
                  })
                  .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
          };
          
          const saveUserInfo = (name,email) =>{
            const user = {name,email};
            fetch('http://localhost:5000/users',{
              method:"POST",
              headers:{
                'content-type':'application/json'
              },
              body: JSON.stringify(user)
            })
            .then(res =>res.json())
            .then(data => {
              console.log(data)
            })
          }
        
    return (
        <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-3xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name must be included" })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && <p className="text-red-600">Name is required</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email")}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {/* <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select {...register("role")} className="select select-bordered  w-full max-w-xs">
              <option disabled selected>
                Pick your Role
              </option>
              <option>Buyer</option>
              <option>Seller</option>
            </select>
          </div> */}

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "password must be 8 characters or more",
                },
                // pattern:{value:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"/,message:'password must be strong'}
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <input className="btn mt-6 btn-info w-full" type="submit" />
        </form>
        <p className="my-4">
          Already have an account?{" "}
          <Link className="text-info" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
    );
};

export default SignUp;