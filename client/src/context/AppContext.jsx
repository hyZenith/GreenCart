import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
export const AppContext = createContext();
import toast from "react-hot-toast";
import axios from "axios";

// for sending cookies with every request
axios.defaults.withCredentials = true;
// During development we proxy /api to backend via Vite; keep baseURL empty so requests are same-origin
axios.defaults.baseURL = '';

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(false); // track someone is logged in or not
  const [isSeller, setIsSeller] = useState(false); //controls login popup visibility
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [product, setProducts] = useState([])

  const [cartItems, setCartItems] = useState({})
  const [searchQuery, setSearchQuery] = useState({})

  // fetch seller status for every page load
  const fetchSeller = async () => {
    try {
      const {data} = await axios.get('/api/seller/is-auth') 
      if (data.success) {
        setIsSeller(true);
      }else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  }

  // fetch user auth status , user Data, and Cart items
  const fetchUser = async() => {
    try{
      const {data} = await axios.get('/api/user/is-auth')
      if (data.success) {
        setUser(data.user)
        setCartItems(data.user.cartItems)
      }
    }catch(error) {
      setUser(null)
    }
  }

  // we need to call the fetchProducts  when the page is loaded , so we use useEffect
  //fetch all products
  const fetchProducts = async () =>{
    try {
      const {data} = await axios.get('/api/product/list') 
      if (data.success) {
        setProducts(data.products);
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message); 
    }

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



  const location = useLocation();

  useEffect(() => {
    fetchUser();
    // only check seller auth when the current location is a seller route
    if (location.pathname.includes('seller')) {
      fetchSeller();
    }
    fetchProducts();
  }, [location.pathname]); // re-run when location changes

  //update db cart when cartItems change
  useEffect(()=> {
      const updateCart = async () => {
        try {
          // include userId explicitly to be robust
          const userId = user?._id || user?.userId || null;
          const {data} = await axios.post('/api/cart/update', { userId, cartItems })

          if (!data.success) {
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message);
        }
      }

      if (user) {
        updateCart();
      }
  },[cartItems])

  const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, product , currency, cartItems , addToCart, updateCartItems, removeCartItem, searchQuery, setSearchQuery, getTotalCartAmount , getCartItemCount, axios, fetchProducts, setCartItems};
  // expose setCartItems so pages can clear the cart when needed
  value.setCartItems = setCartItems;

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
