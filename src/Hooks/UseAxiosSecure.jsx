import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './UseAuth';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    withCredentials:true
  });

const UseAxiosSecure = () => {
    const {signOutUser}=useAuth();
    const Navigate = useNavigate()
    useEffect(()=>{
        instance.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
          }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            //console.log("error",error)
            if(error.status ===401 || error.status === 403){
                signOutUser()
                .then(() => {
                    //console.log("log out user",res);
                    Navigate("/login")
                })
            }
            return Promise.reject(error);
          });
    },[Navigate,signOutUser])
    return instance;
};

export default UseAxiosSecure;