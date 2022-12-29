import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import BookingModal from "../BookingModal/BookingModal";

const About = () => {
  // Rana need to use useState for store user.
  const [userDetails, setUserDetails] = useState();

  // Rana update something here.
  const { user } = useContext(AuthContext);

  // const email = user?.email;
  console.log(user?.email);

  // const url = '';
  // console.log(url)

  const {
    data: userData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      const res = await fetch(
        // Rana update url
        `http://localhost:5000/usersQueryEmail?email=${user?.email}`
      );
      const data = await res.json();
      setUserDetails(data);
      console.log(data);
      return data;
    },
  });

  // function fn(){
  //   fetch('http://localhost:5000/users',{
  //     method:"DELETE"
  //   })
  // }
  // return fn();

  // useEffect(() =>{
  //   fetch('http://localhost:5000/users')
  // .then(res => res.json())
  // .then(data =>console.log(data))
  // },[])
  return (
    <div className="flex justify-center">
      <div className="mt-12">
        <div className="h-[800px] flex justify-center items-center">
          <div className="w-96 p-7">
            <h2 className="text-3xl text-center">Profile</h2>

            {/* Rana need to map here */}
            {userDetails?.map((user) => (
              <div key={user._id}>
                <form>
                  <div className="form-control my-6 w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      defaultValue={user.name}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control my-6 w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      defaultValue={user.email}
                      type="email"
                      disabled
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control my-6 w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">
                        University/School/College
                      </span>
                    </label>
                    <input
                      defaultValue={user.university}
                      disabled
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                  <div className="form-control my-6 w-full max-w-xs">
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <input
                      defaultValue={user.address}
                      disabled
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </div>
                </form>
              </div>
            ))}

            <label htmlFor="my-modal-3" className="btn">
              Update Profile
            </label>
            <BookingModal
              userData={userData}
              userDetails={userDetails}
              refetch={refetch}
              isLoading={isLoading}
            ></BookingModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
