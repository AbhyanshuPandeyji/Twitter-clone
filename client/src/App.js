//
import './App.css';

import Navbar from '../src/components/Navbar/Navbar.jsx' 
import Home from '../src/pages/Home/Home.jsx' 
import Profile from '../src/pages/Profile/Profile.jsx' 
import Explore from '../src/pages/Explore/Explore.jsx' 
import Signin from '../src/pages/Signin/Signin.jsx' 

import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';


const Layout = () => {
    return (
        <div className='md:8/12 mx-auto container'>
          {/* constant component */}
          <Navbar />
          {/* swap different pages routes */}
          <Outlet></Outlet>
        </div>
    );
};

const router = createBrowserRouter([
  {
    // Page layout
    path : "/",
    element: <Layout/>,
    children: [
      {
        // home page
        path: "/",
        element: <Home/>,
      },
      {
        // different profile page - dependent uopn the user id
        path: "/profile/:id",
        element: <Profile/>,
      },
      {
        // explore page for all tweets on the app
        path: "/explore",
        element: <Explore/>,
      },
      {
        // go to signinpage
        path: "/signin",
        element: <Signin/>,
      },
      {
        // go back to singin after logout
        path: "/signout",
        element: <Signin/>,
      }
    ]
  }
])


function App() {
    return (
        <div>
           <RouterProvider router={router}></RouterProvider>
        </div>
    );
}

export default App;
