import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
export const AppContext = createContext();
import toast from "react-hot-toast";

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(false); // track someone is logged in or not
  const [isSeller, setIsSeller] = useState(false); //controls login popup visibility
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [product, setProducts] = useState([])

  const [cartItems, setCartItems] = useState({})
  const [searchQuery, setSearchQuery] = useState({})


  // we need to call the fetchProducts  when the page is loaded , so we use useEffect
  //fetch all products
  const fetchProducts = async () =>{
    setProducts(dummyProducts)
  }

  // add product to cart

  const addToCart = (itemID) =>{
    let cartData = structuredClone(cartItems)

    if (cartData[itemID]){
      cartData[itemID] += 1;
    }else{
      cartData[itemID] = 1;
    }

    setCartItems(cartData);
    toast.success("Product added to cart");
  }

  // update cart item quantity
  const updateCartItems = (itemID, quantity) =>{
    let cartData = structuredClone(cartItems)

    cartData[itemID] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
      
  }

  // remove cart item
  const removeCartItem = (itemID) =>{
    let cartData = structuredClone(cartItems)

    if (cartData[itemID]){
      cartData[itemID] -= 1;
      if (cartData[itemID] === 0){
        delete cartData[itemID];
     }
    }
    toast.success("removed from cart");
    setCartItems(cartData);
  }

//  Get cart item count

  const getCartItemCount = () => {
    let totalItem = 0;
    for (const items in cartItems) {
      totalItem += cartItems[items];
    }
     return totalItem;
  }

  // Get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = product.find((product) => product._id === items);
      if (cartItems[items] > 0){ // counting the quantity of the item in the cart
        totalAmount += itemInfo.offerPrice * cartItems[items]; // multipy price by quantity
      }
    }
    return Math.floor(totalAmount * 100) / 100; // round to 2 decimal places
  }



  useEffect(() => {
    fetchProducts();
  }, []); // dependency array is empty because we want to call the fetchProducts when the page is loaded


  const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, product , currency, cartItems , addToCart, updateCartItems, removeCartItem, searchQuery, setSearchQuery, getTotalCartAmount , getCartItemCount};

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
