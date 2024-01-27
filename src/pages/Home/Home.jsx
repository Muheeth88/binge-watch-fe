import React, { useEffect, useState } from "react";
import MovieCard from "../../components/Card/MovieCard";
import { api } from "../../config/axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/components/Loader/Loader";

const Home = () => {
	const navigate = useNavigate();
	const [loader, setLoader] = useState(true);
	const [movies, setMovies] = useState([]);
	const [queries, setQueries] = useState({
		title: "",
		sort: "title",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setQueries({ ...queries, [name]: value });
	};

	const resetSearch = () => {
		setQueries({
			title: "",
			sort: "title",
		});
	};

	useEffect(() => {
		fetchMovies();
	}, [queries]);

	const fetchMovies = async () => {
		try {
			const response = await api.get(`/movies/all-movies?title=${queries.title}&sort=${queries.sort}`);
			setMovies(response.data.data.movies);
			setLoader(false);
		} catch (error) {
			setLoader(false);
			console.error(error.message);
		}
	};

	const onMovieCardClick = (movieId) => {
		navigate(`/movie-details/${movieId}`);
	};

	return (
		<div>
			{loader && (
				<Loader/>
			)}
			{!loader && (
				<div>
					<div>
						<label htmlFor="title">Search by Name</label>
						<input type="text" name="title" value={queries.title} onChange={handleChange} />
						<button onClick={fetchMovies}>Search</button>
						<button onClick={resetSearch}>Reset</button>
					</div>
					<div className="flex flex-wrap flex- mx-auto w-full justify-center">
						{movies &&
							movies.map((movie) => (
								<span key={movie._id} onClick={() => onMovieCardClick(movie._id)}>
									<MovieCard
										key={movie._id}
										movieId={movie._id}
										title={movie.title}
										tagline={movie.tagline}
										releaseDate={movie.releaseDate}
										countryOfOrigin={movie.countryOfOrigin}
										originalLanguage={movie.originalLanguage}
										genre={movie.genre}
										isFavourite={movie.isFavourite}
										isInWatchlist={movie.isInWatchlist}
										reload={fetchMovies}
										poster={movie.poster}
									/>
								</span>
							))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;
