import React from "react";
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
import { toast } from "react-toastify";

const MovieCard = (props) => {
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
	} = props;

	const handleFavourite = async (event, movieId) => {
		event.stopPropagation();
		try {
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
		<Card className="m-5" sx={{ width: 300 }}>
			<CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{tagline}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Country: {countryOfOrigin}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Language: {originalLanguage}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Release Date: {format(releaseDate, "dd MMMM yyyy")}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Genre: {genre}
				</Typography>
			</CardContent>
			<CardActions>
				{!isFavourite && (
					<Button onClick={(e) => handleFavourite(e, movieId)} size="small">
						<span className="icon mx-2">
							<FavoriteBorderIcon color="primary" />
						</span>
						Favourite
					</Button>
				)}

				{isFavourite && (
					<Button onClick={(e) => handleFavourite(e, movieId)} size="small">
						<span className="icon mx-2">
							<FavoriteIcon color="primary" />
						</span>
						Favourited
					</Button>
				)}
				{!isInWatchlist && (
					<Button onClick={(e) => handleWatchlist(e, movieId)} size="small">
						<span className="icon mx-2">
							<AddBoxIcon />
						</span>
						Watchlist
					</Button>
				)}
				{isInWatchlist && (
					<Button onClick={(e) => handleWatchlist(e, movieId)} size="small">
						<span className="icon mx-2">
							<AddToQueueIcon />
						</span>
						Watchlisted
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default MovieCard;
