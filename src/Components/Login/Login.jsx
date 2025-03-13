import Lottie from 'lottie-react';
import React, { useContext, useState } from 'react';
import loginLottieData from '../../assets/Lottie/login.json'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import { AuthContext } from '../../Context/AuthContext/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../Pages/Shared/GoogleLogin';
// import axios from 'axios';

const Login = () => {

    const Navigate = useNavigate();
    const location = useLocation();
    //console.log(location);
    const from = location.state || '/';
    const { login } = useContext(AuthContext)
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setError('')
 
        login(email, password)
            .then(() => {
                //console.log("Logged in successfully:", result.user);
                
                // setLoading(false);
                form.reset();
                alert("Login Successful!");
                Navigate(from);
            })
            .catch((error) => {
                console.error("Login error:", error);
                if (error.code === "auth/invalid-credential") {
                    setError("Invalid email or password. Please try again.");
                } else {
                    setError(error.message);
                }
            });

        //console.log("Email:", email);
        //console.log("Password:", password);
    };
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={loginLottieData}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">Login</h1>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <fieldset className="fieldset">
                                {/* Email Field */}
                                <label className="fieldset-label">Email</label>
                                <input type="email" name="email" className="input w-full" placeholder="Email" required />

                                {/* Password Field */}
                                <label className="fieldset-label">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="input w-full pr-10"
                                        placeholder="Password"
                                        required
                                    />
                                    <span
                                        className="absolute right-3 top-3 text-xl cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </span>
                                </div>

                                {error && <p className="text-red-500 mt-2">{error}</p>}

                                <div>
                                    <a href="#" className="link link-hover">Forgot password?</a>
                                </div>

                                <button type="submit" className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                        </form>

                        <p className="mt-4 text-center">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-500 hover:underline">
                                Register here
                            </Link>
                        </p>
                        <GoogleLogin></GoogleLogin>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;