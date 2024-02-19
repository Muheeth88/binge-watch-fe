import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import Typography from "@mui/material/Typography";

const RatingComp = ({ pickRating }) => {
	// const [rating, setRating] = useState(2);

	return (
		<Box sx={{ "& > legend": { mt: 2 } }}>
			<Typography component="legend">Controlled</Typography>
			<Rating
				name="simple-controlled"
				// value={rating}
				onChange={(event, newValue) => {
					// setRating(newValue);
					pickRating(newValue);
					console.log("in Child", newValue);
				}}
			/>
		</Box>
	);
};

export default RatingComp;
