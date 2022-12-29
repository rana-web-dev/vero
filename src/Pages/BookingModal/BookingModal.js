import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./BookingModal.css";

const BookingModal = ({ userDetails, userData, isLoading, refetch }) => {
  // Rana update something here
  const userEmail = userData[0]?.email;

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    // Rana delete email target
    const university = form.university.value;
    const address = form.address.value;

    const update = {
      name: name,
      university: university,
      // Rana delete email target
      address: address,
    };

    fetch(`http://localhost:5000/usersQueryEmail?email=${userEmail}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          toast.success("Profile Updated");
          navigate("/message");
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="cursor-pointer btn-xs absolute right-2 top-2"
          >
            ✕
          </label>

          {/* Rana update something here. Need to map here */}
          {userDetails?.map((user) => (
            <div key={user._id}>
              <form onSubmit={handleSubmit} className="m-3">
                <label>Name:</label>
                <input
                  name="name"
                  type="text"
                  placeholder={user.name}
                  className="w-full border border-black bookingModalFormInput"
                />
                <label>Email:</label>
                <input
                  name="email"
                  type="email"
                  placeholder={userEmail}
                  className=" w-full border border-black bookingModalFormInput"
                  disabled
                />
                <label>University/College/Schools:</label>
                <input
                  name="university"
                  type="text"
                  placeholder={user.university}
                  className=" w-full border border-black bookingModalFormInput"
                />
                <label>Address:</label>
                <input
                  name="address"
                  placeholder={user.address}
                  type="text"
                  className=" w-full border border-black bookingModalFormInput"
                />
                <input
                  type="submit"
                  value="Update"
                  className=" border-black border cursor-pointer bookingModalFormInput"
                />
              </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingModal;
