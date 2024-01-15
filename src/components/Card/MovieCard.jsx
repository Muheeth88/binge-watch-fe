import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MovieCard = (props) => {
	const { title, tagline, countryOfOrigin, originalLanguage, releaseDate, genre } = props;
	return (
		<Card className="m-5" sx={{ maxWidth: 250 }}>
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
					Release Date: {releaseDate}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Genre: {genre}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Favourite</Button>
				<Button size="small">Watchlist</Button>
			</CardActions>
		</Card>
	);
};

export default MovieCard;
