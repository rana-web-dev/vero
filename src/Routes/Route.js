import Loader from "../Loader/Loader";
import Login from "../Login/Login";
import About from "../Pages/About/About";
import Home from "../Pages/Home/Home";
import Media from "../Pages/Media/Media";
import Message from "../Pages/Message/Message";
import PostDetails from "../Pages/PostDetails/PostDetails";
import SignUp from "../SignUp/SignUp";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../Outlet/Main");

export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/media',
                element:<Media></Media>
                // loader: ()=> fetch('http://localhost:5000/posts')
            },
            {
                path:'/message',
                element:<Message></Message>
            },
            {
                path:'/about',
                element:<Loader><About></About></Loader>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signUp',
                element:<SignUp></SignUp>
            },
            {
                path:'/posts/:id',
                element:<PostDetails></PostDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/posts/${params.id}`)
            }
        ]
    }
])