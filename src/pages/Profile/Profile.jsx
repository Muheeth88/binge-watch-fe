import { useEffect, useState } from "react";
import { api } from "../../config/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from '@mui/material/DialogActions';
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from '@mui/material/Button';

const Profile = () => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState();
	const [open, setOpen] = useState(false);
	const [openFavDialog, setOpenFavDialog] = useState(false);

	const [watchlist, setWatchlist] = useState([]);
	const [favourites, setFavourites] = useState([]);

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		try {
			const response = await api.get("/users/get-user-profile");
			setIsLoggedIn(true);
			setName(response.data.data[0].userName);
			setEmail(response.data.data[0].email);
			setRole(response.data.data[0].role);
			setFavourites(response.data.data[0].favouriteMovies);
			setWatchlist(response.data.data[0].watchlistMovies);
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

	const handleClickOpen = (e) => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleFavDiaOpen = (e) => {
		setOpenFavDialog(true);
	};
	const handleFavDiaClose = () => {
		setOpenFavDialog(false);
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
											<button onClick={handleClickOpen} className="button-blue my-1">
												My WatchList
											</button>
											<button onClick={handleFavDiaOpen} className="button-blue my-1">Favourite Movies</button>
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
							<Dialog onClose={handleClose} open={open}>
								<DialogTitle>My Watchlist</DialogTitle>
								<List sx={{ pt: 0 }}>
									{watchlist &&
										watchlist.map((w) => (
											<ListItem disableGutters key={w._id}>
												<ListItemButton>
													<ListItemText primary={w.title} />
												</ListItemButton>
											</ListItem>
										))}
								</List>
								<DialogActions>
									<Button onClick={handleClose}>Close</Button>
								</DialogActions>
							</Dialog>
							<Dialog onClose={handleFavDiaClose} open={openFavDialog}>
								<DialogTitle>My Favourites</DialogTitle>
								<List sx={{ pt: 0 }}>
									{favourites &&
										favourites.map((w) => (
											<ListItem disableGutters key={w._id}>
												<ListItemButton>
													<ListItemText primary={w.title} />
												</ListItemButton>
											</ListItem>
										))}
								</List>
								<DialogActions>
									<Button onClick={handleFavDiaClose}>Close</Button>
								</DialogActions>
							</Dialog>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
