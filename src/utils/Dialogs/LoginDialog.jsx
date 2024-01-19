import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// const LoginDialog = () => {
//     const navigate = useNavigate();
//     if(localStorage.getItem("jwt")){
//         return null
//     }
//     toast.info('Login! - ');
//     navigate("/login");
//     return null
// }

// export default LoginDialog

export const LoginDialog = () => {
	// Your common logic here
	console.log("Common function called");
	const navigate = useNavigate();
	if (localStorage.getItem("jwt")) {
		return null;
	}
	toast.info("Login! - ");
	navigate("/login");
	return null;
};
