import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { api } from "../../config/axiosConfig";
import { useToast } from "@/components/ui/use-toast"
import LoginPopup from "@/utils/Dialogs/LoginPopup";
import LoginDialog from "@/utils/Dialogs/LoginDialog";

const MovieCard = (props) => {
	const { toast } = useToast()
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [openLoginDialog, setOpenLoginDialog] = useState(false);
	const {
		title,
		tagline,
		countryOfOrigin,
		originalLanguage,
		releaseDate,
		genre,
		isInWatchlist,
		isFavourite,
		movieId,
		reload,
		poster,
	} = props;

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		try {
			const username = localStorage.getItem("username");
			if (username) {
				setIsLoggedIn(true);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleFavourite = async (event, movieId) => {
		event.stopPropagation();
		try {
			if (!isLoggedIn) {
				setOpenLoginDialog(true);
				return;
			}
			if (!isFavourite) {
				await api.post(`/favourites/add-to-favourites/${movieId}`);
				toast.success("Added to favourites!");
			} else if (isFavourite) {
				await api.post(`/favourites/remove-from-favourites/${movieId}`);
				toast.error("Removed from favourites!");
			}
			reload();
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleWatchlist = async (event, movieId) => {
		event.stopPropagation();
		try {
			if (!isLoggedIn) {
				setOpenLoginDialog(true);
				return;
			}
			if (!isInWatchlist) {
				await api.post(`/watchlist/add-to-watchlist/${movieId}`);
				toast.success("Added to Watchlist!");
			} else if (isInWatchlist) {
				await api.post(`/watchlist/remove-from-watchlist/${movieId}`);
				toast.error("Removed from Watchlist!");
			}
			reload();
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<>
			<Card className="m-5" sx={{ width: 300, cursor: "pointer" }}>
				<CardMedia sx={{ height: 300 }} image={poster} title="green iguana" />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{tagline}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Release Date: {format(releaseDate, "dd MMMM yyyy")}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Genre:
						{genre.map((g) => (
							<span key={g}> {g} | </span>
						))}
					</Typography>
				</CardContent>
				<CardActions>
					<Button onClick={(e) => handleFavourite(e, movieId)} size="small">
						<span className="icon mx-2">
							{isFavourite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon color="primary" />}
						</span>
						{isFavourite ? "Favourited" : "Favourite"}
					</Button>

					<Button onClick={(e) => handleWatchlist(e, movieId)} size="small">
						<span className="icon mx-2">{isInWatchlist ? <AddToQueueIcon /> : <AddBoxIcon />}</span>
						{isInWatchlist ? "Watchlisted" : "Watchlist"}
					</Button>
				</CardActions>
			</Card>

			<LoginDialog openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog}/>
			{openLoginDialog && <LoginPopup/>}
		</>
	);
};

export default MovieCard;
