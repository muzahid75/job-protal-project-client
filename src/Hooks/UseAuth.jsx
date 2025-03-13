import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext/AuthProvider"

const useAuth =()=>{
    const content =useContext(AuthContext);
    return content;
}
export default useAuth;