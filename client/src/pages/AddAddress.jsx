import React, { useState } from "react";
import { assets } from "../assets/assets";

// imput field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-16 pb-16">
      <p className="text-2xl md:text-3xl text-gray-500">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-4" >
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                placeholder="First Name"
                type="text"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastname"
                placeholder="Last Name"
                type="text"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              placeholder="Email Address"
              type="email"
              name="email"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              placeholder="Street"
              type="text"
              name="street"
            />
            <div className=" grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                placeholder="City"
                type="text"
                name="city"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                placeholder="State"
                type="text"
                name="state"
              />
            </div>

            <div className=" grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                placeholder="Zip Code"
                type="number"
                name="zipcode"
              />
            
              <InputField
                handleChange={handleChange}
                address={address}
                placeholder="Country"
                type="text"
                name="country"
              />
            </div>
            <InputField handleChange={handleChange} address={address} type="number" name="Phone" placeholder="Phone" />
            <button className="w-full mt-6 bg-primary text-whitep py-3 hover:bg-primary-dull transition cursor-pointer uppercase rounded-md"> Save address </button>
          </form>
        </div>
        <img src={assets.add_address_iamge} alt="Add Address" />
      </div>
    </div>
  );
};

export default AddAddress;
