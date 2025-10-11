import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

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
  const { navigate, axios: http, user } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const userId = user?._id || user?.userId || user?.id;
      if (!userId) {
        toast.error('You must be logged in to add address');
        return navigate('/');
      }
      let res;
      if (http) {
        // use axios instance provided by context
        const response = await http.post('/api/address/add', { address, userId });
        res = response.data;
      } else {
        // fallback to fetch if axios isn't available
        const response = await fetch('/api/address/add', {
          method: 'POST',
          // when using fetch fallback in case http isn't available (shouldn't happen)
          body: JSON.stringify({ address, userId }),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        res = await response.json();
      }

      if (res && res.success) {
        toast.success('Address added successfully');
        navigate('/cart');
      } else {
        toast.error((res && res.message) || 'Failed to add address');
      }
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Server Error';
      toast.error(message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/cart');
    }
  }, [user, navigate]);

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
                name="lastName"
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
            <InputField handleChange={handleChange} address={address} type="number" name="phone" placeholder="Phone" />
            <button className="w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase rounded-md"> Save address </button>
          </form>
        </div>
        <img src={assets.add_address_iamge} alt="Add Address" />
      </div>
    </div>
  );
};

export default AddAddress;
