import React, { useEffect, useState } from "react";
import MovieCard from "../../components/Card/MovieCard";
import { api } from "../../config/axiosConfig";
import Container from '@mui/material/Container';

const Home = () => {
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

	return (
    <Container>
		<div className="flex flex-wrap">
			{movies &&
				movies.map((movie) => (
					<MovieCard
            key= {movie._id}
						title={movie.title}
						tagline={movie.tagline}
						releaseDate={movie.releaseDate}
						countryOfOrigin={movie.countryOfOrigin}
            originalLanguage={movie.originalLanguage}
						genre={movie.genre}
					/>
				))}
		</div>
    </Container>
	);
};

export default Home;
