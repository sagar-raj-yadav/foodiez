import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './components/Cart';
import Orderpage from './screens/Orderpage';
import MyOrders from './components/MyOrders';


import Profile from './screens/Profile';
import RestaurantMain from './MyRestaurant/RestaurantMain';

//blog
import Blog from '../src/Blog/pages/Blog/BlogHome';
import BlogHome from '../src/Blog/pages/Home/index';
import Blogcard from '../src/Blog/Blogcard';
import Addnote from '../src/Blog/blogwriting/Addnote';
import Mystate from '../src/Blog/context/mystate';
//blog end
import Restaurnt from './MyRestaurant/Body'


const res = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/cart", element: <Cart /> },
   { path: "/orderpage", element: <Orderpage /> },
  { path: "/my-orders", element: <MyOrders /> },
  { path: "/restaurant", element: <Restaurnt /> },
  {path: "restaurant/:resId",element: <RestaurantMain /> },
  { path: "/profile", element: <Profile /> },

//blog
{
  path: '/blog',
  element: <BlogHome />,
},

{
  path: '/blog/:id',
  element: <Blog />,
},
{
  path: '/card',
  element: <Blogcard />,
},
{
  path: '/addnote',
  element: <Addnote />,
},


//blog
]);
function App() {

  
  return (
   
    <Mystate>
      <RouterProvider router={res} />
    </Mystate>
  );
}

export default App;
