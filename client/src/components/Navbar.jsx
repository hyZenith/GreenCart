import React, { useEffect }  from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useAppContext} from '../context/AppContext'
import toast from 'react-hot-toast'
const Navbar = () => {
    const [open, setOpen] = React.useState(false)

    const { user, setUser , setShowUserLogin , navigate , setSearchQuery, searchQuery  , getCartItemCount , getTotalCartAmount, axios: appAxios } = useAppContext();
    
    const logOut = async () => {
        try {
           const http = appAxios;
           const { data } = await http.get('/api/user/logout');

           if (data && data.success) {
             toast.success(data.message);
             setUser(null);
             navigate('/');
           } else {
             toast.error(data?.message || 'Logout failed');
           }
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || 'Logout failed';
            toast.error(message);
        }
    }

    useEffect(() => {
        if (searchQuery.length >0) {
            navigate('/products');
        }
    },[searchQuery])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to="/" onClick={() => setOpen(false)}>
                <img src={assets.logo} alt='logo'  className="h-8" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All products</NavLink>
                <NavLink to="/contact">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search" className='w-4 h-4' />
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartItemCount()}</button>
                </div>

                {/* Login Button */}
                {/* ternary operator is used for conditional renderingq */}
                {/* condition ? expression_if_true : expression_if_false */}
                {/* if there is no user login button shows */}
               {!user ? ( <button onClick={ () => setShowUserLogin(true) } className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>)
                : 
                // if there is a user profile icon shows
                ( <div className='relative group'>
                    <img src={assets.profile_icon} className='w-10' alt="user icon" />
                    <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                        <li onClick={()=> navigate('/my-orders')} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                        <li onClick={logOut} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                    </ul>
                </div> )}
            </div> 

            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.cart_icon} alt="cart" className='w-6 opacity-80' />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartItemCount()}</button>
                </div>

                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt="menu" />
                </button>
                
            </div>


            {/* Mobile Menu */}
            {/* open = true --> menu shows */}
            {/* open = false --> menu hides */}
           { open && (
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/" className="block" onClick={() => setOpen(false)} >Home</NavLink>
                <NavLink to="/about" className="block" onClick={() => setOpen(false)} >All Products</NavLink>
                {user && (
                    <NavLink to="/my-orders" className="block" onClick={() => setOpen(false)} >My Orders</NavLink>
                )}
                <NavLink to="/contact" className="block" onClick={() => setOpen(false)} >Contact</NavLink>

                {!user ? (
                    <button onClick={() =>{
                        setOpen(false);
                        setShowUserLogin(true);
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Login
                    </button>
                ) : (
                    <button onClick={logOut} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Logout
                    </button>
                )}
            </div>
        )}
    </nav>
)
}
export default Navbar
