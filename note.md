### creating a eccomerce website for practice
tech stack:: 
react vite

npm create vite@latest 

first created a AppContext in src/context/AppContext.jsx
creating global state management for user authentication and seller status.


create navigation components for the website in component folder

changing the navbar for the mobile 
- if user is logged in show `my orders` and `logout` button
- if user is not logged in show `login` button

conditional rendering in react

```js
{ user && (
   <>
      <button>My Orders</button>
      <button>Logout</button>
   </>
 ) : (
   <button>Login</button>
 )}
```
If user is falsy (null, undefined, or false → meaning user is not logged in), then render what’s inside ( ... )


#### error ::
const [ user, setUser, setUserLogin ] = useAppContext();
 solution ::
`const { user, setUser , setUserLogin} = useAppContext();`

because in the [appContext.jsx](c:/Users/Zenith/personal/Testing/Backend/client/src/context/AppContext.jsx) we are returning an object not an array   -->
 ```js 
   const value = { Navigate, user, setUser, isSeller, setIsSeller }; 
```
 that means `useAppContext()` will return an object , not an array.
 
 
#### Banner ::
creating the main banner for the website



creating the banne for normal people and if the url contains `?seller=true` then show  the seller banner
also creating if the `?seller=false` then navbar value is null:
```js
const isSeller = useLocation().pathname.includes('seller');

// for the nav
{isSeller ? null : <Navbar />}
```


<!-- note -->
change product to products in the context.jsx file
add adress
6: 29
