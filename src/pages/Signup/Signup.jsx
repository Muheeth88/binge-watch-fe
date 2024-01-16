import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../config/axiosConfig";
import { useState } from "react";

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		userName: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/users/register", formData);
			navigate("/login");
		} catch (error) {
			console.error("Error submitting the form:", error);
		}
	};
	return (
		<div className="grid">
			<div className="bg-purple-900 h-60 flex items-center justify-center">
				<div className="flex flex-col max-w-4xl items-center justify-center">
					<div className=" text-white text-4xl font-bold">Register</div>
					<div className="m-2 text-white">Register to BingeWatch by filling this form.</div>
				</div>
			</div>
			<div className="bg-white h-auto flex justify-center">
				<div className="h-auto bg-white -mt-20 w-[80%] md:w-1/2 text-stone-700 font-medium shadow-lg">
					<form onSubmit={handleSubmit}>
						<div className="m-4 font-bold">Your E-mail Address </div>{" "}
						<input
							name="email"
							onChange={handleChange}
              value={formData.email}
							placeholder="Email"
							className="border-2 ml-4 border-gray-400 h-10 w-3/4 px-4 text-gray-400 rounded"
						/>
						<div className="m-4 font-bold"> User Name</div>
						<input
							name="userName"
							onChange={handleChange}
              value={formData.userName}
							placeholder="User Name"
							className="border-2 ml-4 border-gray-400 h-10 w-3/4 text-gray-400 px-4 rounded"
						/>
						<div className="m-4 font-bold">Password</div>
						<input
							name="password"
							onChange={handleChange}
              value={formData.password}
							placeholder="Password"
							className="border-2 ml-4 border-gray-400 h-10 w-3/4 text-gray-400 px-4 rounded"
						/>
						<div>
							<button
								type="submit"
								className="bg-purple-900 p-2 m-4 text-white w-max font-normal hover:bg-purple-700 cursor-pointer"
							>
								Register
							</button>
						</div>
					</form>
					<div className="text-center mt-2  mb-6 flex flex-col">
						<a className="text-sm font-bold text-gray-400 hover:text-violet-500 m-1">Alredy have an account? Login!</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
