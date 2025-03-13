import {
    createBrowserRouter
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import JobDetails from "../Pages/JobDetails/JobDetails";
import PrivateRoute from "./PrivateRoute";
import JobApply from "../Pages/JobApply/JobApply";
import MyApplication from "../Pages/MyApplication/MyApplication";
import AddJob from "../Pages/AddJob/AddJob";
import MyPostedJob from "../Pages/MyPostedJob/MyPostedJob";
import ViewApplication from "../Pages/ViewApplication/ViewApplication";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/jobs/:id",
                element:<PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/${params.id}`)
            },
            {
                path:"/myapplication",
                element:<PrivateRoute><MyApplication></MyApplication></PrivateRoute>,
            },
            {
                path:"/jobApply/:id",
                element:<PrivateRoute><JobApply></JobApply></PrivateRoute>,
            },
            {
                path:"/myPostedJob",
                element:<PrivateRoute><MyPostedJob></MyPostedJob></PrivateRoute>,
            },
            {
                path:"/viewApplication/:job_id",
                element:<PrivateRoute><ViewApplication></ViewApplication></PrivateRoute>,
                loader:({params})=>fetch(`${import.meta.env.VITE_API_BASE_URL}/job-application/jobs/${params.job_id}`)
            },
            {
                path:"/addjob",
                element:<PrivateRoute><AddJob></AddJob></PrivateRoute>,
            },
            {
                path:"/login",
                element:<Login></Login>
            },
            {
                path:"/register",
                element:<Register></Register>
            }
        ]
    },
]);

export default router;