import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../config/axiosConfig";
import { format } from "date-fns";
import { pink } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const MovieDetails = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState({});
	const [reviews, setReviews] = useState([]);
	const username = localStorage.getItem("username");
	const [comment, setComment] = useState("");
	const [open, setOpen] = useState(false);
	const [commentId, setCommentId] = useState("");

	useEffect(() => {
		fetchMovieDetails();
		fetchReviews();
	}, []);

	const fetchMovieDetails = async () => {
		try {
			const response = await api.get(`/movies/get-movie/${movieId}`);
			const movie = response.data.data[0];
			setMovie(movie);
		} catch (error) {
			console.error(error.message);
		}
	};

	const fetchReviews = async () => {
		try {
			const response = await api.get(`/reviews/movie-reviews/${movieId}`);
			const reviews = response.data.data;
			setReviews(reviews);
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleCommentField = (e) => {
		const comment = e.target.value;
		setComment(comment);
	};

	const addReview = async () => {
		try {
			await api.post(`reviews/add-review/${movieId}`, { comment });
			fetchReviews();
			handleClose();
			setCommentId("");
			setComment("");
		} catch (error) {
			console.error(error.message);
		}
	};

	const editReview = async () => {
		try {
			await api.patch(`reviews/edit-review/${commentId}`, { comment });
			fetchReviews();
			handleClose();
			setCommentId("");
			setComment("");
		} catch (error) {
			console.error(error.message);
		}
	};

	const deleteReview = async (reviewId) => {
		try {
			await api.delete(`reviews/delete-review/${reviewId}`);
			setCommentId("");
			setComment("");
			fetchReviews();
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleClickOpen = async (reviewId) => {
		if (reviewId) {
			setCommentId(reviewId);
			const res = await api.get(`/reviews/get-review/${reviewId}`);
			setComment(res.data.data.comment);
		}
		setOpen(true);
	};

	const handleClose = () => {
		setCommentId("");
		setComment("");
		setOpen(false);
	};

	return (
		<>
			<div className="flex justify-center">
				<div className="flex flex-col justify-center">
					<div className="flex flex-col md:flex-row max-w-7xl justify-center items-center ">
						<div className="overflow-hidden w-full m-4 shadow-sm flex flex-col md:flex-row justify-center">
							<div className="flex flex-col md:flex-row items-center">
								<div className=" w-96 overflow-hidden">
									<img src="https://source.unsplash.com/500x350/?city" alt="" className="" />
								</div>
								<div className="md:w-2/3 m-4 ">
									<div className="flex text-gray-500 text-sm m-2">
										<div className="m-1 font-bold">Released on</div>
										{/* <div className="m-1">{format((new Date(movie?.releaseDate)), "dd MMMM yyyy")}</div> */}
									</div>
									<div className="font-bold text-black text-xl m-2">{movie.title}</div>
									<div className="text-sm text-gray-500 mt-4 m-2">
										<p>{movie.tagline}</p>
									</div>
									<div className="">
										<p className="py-2">
											<span className="mx-2 text-lg font-bold text-left">Language</span>
											<span>{movie.originalLanguage}</span>
										</p>
										<p className="flex">
											<span className="mx-2 text-lg font-bold text-left">Genre</span>
											<span className="flex justify-center">
												<span className="mx-1">{movie.genre}</span>
											</span>
										</p>
										<p>
											<span className="mx-2 text-lg font-bold text-left">Rating</span>
											<span> 9/ 10</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-1/2">
						<p className="text-xl font-bold">Comments</p>
						<p className="flex justify-end">
							<button onClick={() => handleClickOpen()} className="button-blue text-end mb-4">
								+ Add Review
							</button>
						</p>
						{reviews &&
							reviews.map((r) => (
								<div key={r._id}>
									<div className="flex justify-between">
										<p>{r.comment}</p>
										{username === r.reviewBy[0].userName && (
											<span className="flex gap-2">
												<span onClick={() => handleClickOpen(r._id)} className="icon">
													<EditIcon color="primary" />
												</span>

												<span onClick={() => deleteReview(r._id)} className="icon">
													<DeleteIcon sx={{ color: pink[500] }} />
												</span>
											</span>
										)}
									</div>
									<span className="ml-auto flex justify-start text-xs text-gray-400">
										<span>-by {r.reviewBy[0].userName}</span>
									</span>
									<hr className="my-2" />
								</div>
							))}
					</div>
				</div>
			</div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{movie.title}</DialogTitle>
				<DialogContent>
					<DialogContentText>Add your comment here.</DialogContentText>
					<TextField
						sx={{ width: 500 }}
						autoFocus
						required
						margin="dense"
						id="name"
						name="comment"
						value={comment}
						onChange={handleCommentField}
						label="Comment"
						type="text"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					{commentId && (
						<Button onClick={editReview} type="submit">
							Edit Comment
						</Button>
					)}
					{!commentId && (
						<Button onClick={addReview} type="submit">
							Post Comment
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default MovieDetails;