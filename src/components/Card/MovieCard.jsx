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

const MovieCard = (props) => {
	const { title, tagline, countryOfOrigin, originalLanguage, releaseDate, genre, isInWatchlist, isFavourite } = props;
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
					<Button size="small">
						<span className="icon mx-2">
							<FavoriteBorderIcon color="primary" />
						</span>
						Favourite
					</Button>
				)}

				{isFavourite && (
					<Button size="small">
						<span className="icon mx-2">
							<FavoriteIcon color="primary" />
						</span>
						Favourited
					</Button>
				)}
				{!isInWatchlist && (
					<Button size="small">
						<span className="icon mx-2">
							<AddBoxIcon />
						</span>
						Watchlist
					</Button>
				)}
				{isInWatchlist && (
					<Button size="small">
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
