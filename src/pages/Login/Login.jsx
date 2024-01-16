import { useState } from "react";
import "./style.css";
import Container from "@mui/material/Container";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../config/axiosConfig";

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/users/login", formData);
			localStorage.setItem("jwt", response?.data?.data?.jwtToken);
			localStorage.setItem("role", response?.data?.data?.user?.role);
			navigate("/home")
		} catch (error) {
			console.error("Error submitting the form:", error);
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
						<form onSubmit={handleSubmit}>
							<div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
								<div className="">
									<input
										type="email"
										name="email"
										value={formData.email}
										placeholder="Email"
										onChange={handleChange}
										className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
									/>
								</div>
								<div className="">
									<input
										type="password"
										name="password"
										value={formData.password}
										placeholder="Password"
										onChange={handleChange}
										className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
									/>
								</div>
							</div>
							<div className="text-center mt-7">
								<button
									type="submit"
									className="uppercase px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-violet-500 hover:bg-violet-600  font-medium "
								>
									login
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
