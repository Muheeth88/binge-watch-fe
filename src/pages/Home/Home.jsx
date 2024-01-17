import React, { useEffect, useState } from "react";
import MovieCard from "../../components/Card/MovieCard";
import { api } from "../../config/axiosConfig";
import Container from "@mui/material/Container";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		fetchMovies();
	}, []);

	const fetchMovies = async () => {
		try {
			const response = await api.get("/movies/all-movies");
			setMovies(response.data.data.movies);
		} catch (error) {
			console.error(error.message);
		}
	};

	const onMovieCardClick = (movieId) => {
		navigate(`/movie-details/${movieId}`);
	};

	return (
		// <Container>
		<div className="flex flex-wrap mx-auto w-full justify-center">
			{movies &&
				movies.map((movie) => (
					<span key={movie._id} onClick={() => onMovieCardClick(movie._id)}>
						<MovieCard
							key={movie._id}
							title={movie.title}
							tagline={movie.tagline}
							releaseDate={movie.releaseDate}
							countryOfOrigin={movie.countryOfOrigin}
							originalLanguage={movie.originalLanguage}
							genre={movie.genre}
							isFavourite={movie.isFavourite}
							isInWatchlist={movie.isInWatchlist}
						/>
					</span>
				))}
		</div>
		// </Container>
	);
};

export default Home;
