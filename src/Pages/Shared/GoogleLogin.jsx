import { FcGoogle } from "react-icons/fc"; // Google Icon
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleLogin = () => {

    const { signWithGoogle } = useContext(AuthContext);
    const Navigate = useNavigate();
    const location = useLocation();
    //console.log(location);
    const from = location.state || '/';

    const handleGoogleLogin = () => {
        signWithGoogle()
            .then(result => {
                //console.log(result.user)
                Navigate(from);
            })
            .catch(error => {
                //console.log(error)
            }
            )
    }
    return (
        <motion.button
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ x: "-10%" }} // Animation starts slightly left
            animate={{ x: "10%" }} // Moves slightly right
            transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
            }}
            onClick={handleGoogleLogin}
        >
            <FcGoogle className="text-2xl" /> {/* Google Icon */}
            Sign in with Google
        </motion.button>
    );
}
export default GoogleLogin;
