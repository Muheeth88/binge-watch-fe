import { useEffect, useState } from "react";
import { api } from "../../config/axiosConfig";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState();

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		try {
			const response = await api.get("/users/get-user-profile");
			setIsLoggedIn(true);
			setName(response.data.data.userName);
			setEmail(response.data.data.email);
			setRole(response.data.data.role);
			response.data.data.role === "ADMIN" ? setIsAdmin(true) : setIsAdmin(false);
			console.log(isAdmin);
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleLogOut = async () => {
		try {
			await api.post("/users/logout");
			localStorage.clear();
			navigate("/login");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="flex justify-center p-4">
			<div className="flex flex-col justify-center items-center ">
				<div className="flex flex-col md:flex-row justify-center items-center ">
					<div className="overflow-hidden md:w-3/4 m-4 flex justify-center bg-white  ">
						<div className="flex flex-col md:flex-row items-center justify-center md:w-3/4  ">
							<div className="flex flex-col items-center justify-center py-2">
								<div className="text-3xl font-bold text-stone-700 text-center md:-ml-24">{name}</div>
								<div className="text-md text-stone-700 font-medium text-center md:-ml-24 m-2">{email}</div>
								<div className="flex flex-col md:flex-row   items-center justify-center   mx-10">
									<div className="pl-2 pt-2 w-60 bg-gradient-to-r from-blue-700 via-blue-600 to-stone-700 rounded-full ">
										<img
											src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
											alt="my dp"
											className="dp w-80  rounded-full"
										/>
									</div>
									<div className="flex flex-col w-full md:w-2/3  mx-10">
										<div className="my-2">
											<button className="button-blue my-1">My WatchList</button>
											<button className="button-blue my-1">Liked Movies</button>
										</div>

										<div className="font-bold text-2xl text-blue-500 ">{role}</div>
										<div className="text-stone-500 text-sm">
											<a href="#">-BingeWatch</a>
										</div>
										{isAdmin && (
											<div className="cursor-pointer text-white my-2 py-2 w-full bg-slate-500 flex justify-center">
												<Link to="/add-movie">+ Add Movie</Link>
											</div>
										)}

										<div className="my-2 flex justify-end">
											{!isLoggedIn && (
												<button className="button-blue">
													<Link to="/login">Sign In</Link>
												</button>
											)}

											{isLoggedIn && (
												<button onClick={handleLogOut} className="button-pink">
													Log Out
												</button>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
