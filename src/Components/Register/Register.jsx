import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons
import registerLottieData from "../../assets/Lottie/Regisster.json";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "../../Pages/Shared/GoogleLogin";

const Register = () => {

    const Navigate = useNavigate()
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { createUser,signOutUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Password validation regex (allows any special character)
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters long, include uppercase, lowercase, a number, and a special character.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Clear error if validation passes
        setError("");

        createUser(email, password)
            .then((result) => {
                //console.log(result.user);
                form.reset();
                alert("User created successfully!");
                
                // Immediately sign out the user after creation
                return signOutUser();
            })
            .then(() => {
                // Navigate after successful sign-out
                Navigate('/login');
            })
            .catch((error) => {
                console.error("Registration error:", error);
                setError(error.message);
            });

        //console.log("Email:", email);
        //console.log("Password:", password);
        //console.log("Confirm Password:", confirmPassword);
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left w-96">
                    <Lottie animationData={registerLottieData}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 ">
                    <div className="card-body">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
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

                                {/* Confirm Password Field */}
                                <label className="fieldset-label">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className="input w-full pr-10"
                                        placeholder="Confirm Password"
                                        required
                                    />
                                    <span
                                        className="absolute right-3 top-3 text-xl cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                    </span>
                                </div>

                                {error && <p className="text-red-500 mt-2">{error}</p>}

                                <div>
                                    <a href="#" className="link link-hover">Forgot password?</a>
                                </div>

                                <button type="submit" className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </form>
                        <p className="mt-4 text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-500 hover:underline">
                                Login here
                            </Link>
                        </p>
                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
