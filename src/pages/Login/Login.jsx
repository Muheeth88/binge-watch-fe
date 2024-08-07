import "./style.css";
import Container from "@mui/material/Container";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../config/axiosConfig";
import { useDispatch } from "react-redux";
import { setUserName } from "@/features/profile/myProfileSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false)

	const loginFormSchema = z.object({
		email: z.string().email(),
		password: z.string().min(4),
	});
	toast
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(loginFormSchema),
	});

	const onSubmit = async (formData) => {
		setLoading(true)
		try {
			const response = await api.post("/users/login", formData);
			localStorage.setItem("jwt", response?.data?.data?.jwtToken);
			localStorage.setItem("role", response?.data?.data?.user?.role);
			localStorage.setItem("username", response?.data?.data.user?.userName);
			dispatch(setUserName(response?.data?.data.user?.userName));
			setLoading(false)
			navigate("/home");
		} catch (error) {
			setLoading(false)
			toast("Something went wrong!", {description: error?.response?.data?.message, action: {label: "Close"}})
		}
	};

	return (
		<div>
			<Container maxWidth="sm">
				<div className="flex justify-center my-auto items-center h-full mt-8">
					<div className="my-auto h-[90%] w-full md:w-3/4 mx-4">
						<div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0">
							<h1 className="font-semibold text-3xl text-gray-700 m-2">Log In</h1>
						</div>
						<form onSubmit={handleSubmit(onSubmit)} noValidate>
							<div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-4 md:space-y-4">
								{errors.root && <div className="text-red-500">{errors.root.message}</div>}
								<div className="">
									<input
										{...register("email")}
										placeholder="Enter your email"
										className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
									/>
									{errors.email && <div className="text-red-500 text-sm mt-2 mx-2">{errors?.email?.message}</div>}
								</div>
								<div className="">
									<input
										{...register("password")}
										type="password"
										placeholder="Enter the password"
										className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
									/>
									{errors.email && <div className="text-red-500 text-sm mt-2 mx-2">{errors?.password?.message}</div>}
								</div>
							</div>
							<div className="text-center mt-7">
								<button
									type="submit"
									disabled={loading}
									className={`uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium `}
								>
									{isSubmitting ? "Loading..." : "Login"}
								</button>
							</div>
						</form>
						<div className="text-center my-6 flex flex-col text-sm font-bold text-gray-400 hover:text-violet-500 m-1">
							<Link to="/signup">Not a User? Create New Account</Link>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Login;
