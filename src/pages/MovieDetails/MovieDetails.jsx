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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import CustomDialog from "@/components/Dialog/CustomDialog";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import RatingComp from "@/components/Rating/RatingComp";

const MovieDetails = () => {
	const navigate = useNavigate();
	const { movieId } = useParams();
	const [movie, setMovie] = useState({});
	const [reviews, setReviews] = useState([]);
	const username = localStorage.getItem("username");
	const [comment, setComment] = useState("");
	const [open, setOpen] = useState(false);
	const [commentId, setCommentId] = useState("");
	const [openAlert, setOpenAlert] = useState(false);
	let [formatedDate, setFormatedDate] = useState();
	const [openLoginDialog, setOpenLoginDialog] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [rating, setRating] = React.useState(0);
	const [avgRating, setAvgRating] = React.useState(0);
	useEffect(() => {
		fetchMovieDetails();
		fetchReviews();
		fetchUser();
		fetchAvgRating();
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

	const fetchMovieDetails = async () => {
		try {
			const response = await api.get(`/movies/get-movie/${movieId}`);
			const movie = response.data.data;
			setMovie(movie);
			setFormatedDate(format(new Date(movie.releaseDate), "dd MMMM yyyy"));
		} catch (error) {
			console.error(error.message);
		}
	};

	const fetchAvgRating = async () => {
		try {
			const response = await api.get(`ratings/get-avg-rating/${movieId}`);
			const avgRating = response?.data?.data?.avg_rating;
			setAvgRating(avgRating);
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleFavourite = async () => {
		try {
			if (!isLoggedIn) {
				setOpenLoginDialog(true);
				return;
			}
			if (!movie.isFavourite) {
				await api.post(`/favourites/add-to-favourites/${movieId}`);
				toast.success("Added to favourites!");
			} else if (movie.isFavourite) {
				await api.post(`/favourites/remove-from-favourites/${movieId}`);
				toast.error("Removed from favourites!");
			}
			fetchMovieDetails();
		} catch (error) {
			console.error(error.message);
		}
	};

	const handleWatchlist = async () => {
		try {
			if (!isLoggedIn) {
				setOpenLoginDialog(true);
				return;
			}
			if (!movie.isInWatchlist) {
				await api.post(`/watchlist/add-to-watchlist/${movieId}`);
				toast.success("Added to Watchlist!");
			} else if (movie.isInWatchlist) {
				await api.post(`/watchlist/remove-from-watchlist/${movieId}`);
				toast.error("Removed from Watchlist!");
			}
			fetchMovieDetails();
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
			toast.success("Comment posted!");
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
			toast.success("Comment edited!");
			fetchReviews();
			handleClose();
			setCommentId("");
			setComment("");
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

	// ---------------- Delete Comment
	const onDialgInit = async (review) => {
		if (review._id) {
			setCommentId(review._id);
			setComment(review.comment);
		}
	};

	const onRatingDialgInit = async () => {

	}

	const handleCancelRating = () => {
		setRating(0)
	}

	const handleRateMovie = async () => {
		try {
			await api.post(`ratings/give-rating/${movieId}/${rating}`);
			fetchAvgRating();
		} catch (error) {
			console.error(error.message);
		}
	}

	const pickRating = (pickedRating) => {
		setRating(pickedRating)
	}

	const handleCloseAlert = () => {
		setCommentId("");
		setComment("");
	};

	const handleDeleteComment = async () => {
		try {
			await api.delete(`reviews/delete-review/${commentId}`);
			toast.success("Comment deleted!");
			setCommentId("");
			setComment("");
			fetchReviews();
		} catch (error) {
			console.error(error.message);
		}
	};

	// ---------------------------

	const closeLoginDialog = (event) => {
		setOpenLoginDialog(false);
	};

	return (
		<>
			<div className="flex justify-center">
				<div className="flex flex-col justify-center">
					<div className="flex flex-col md:flex-row max-w-7xl justify-center items-center ">
						<div className="overflow-hidden w-full m-4 shadow-sm flex flex-col md:flex-row justify-center">
							<div className="flex flex-col md:flex-row items-center">
								<div className=" w-96 overflow-hidden">
									<img src={movie.poster} alt="" className="" />
								</div>
								<div className="md:w-2/3 m-4 ">
									<div className="flex text-gray-500 text-sm m-2">
										<div className="m-1 font-bold">Released on</div>
										<div className="m-1">{formatedDate}</div>
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
												<span className="mx-1">
													{movie.genre && movie.genre.map((g) => <span key={g}> {g} | </span>)}
												</span>
											</span>
										</p>
										<p className="flex items-center">
											<span className="mx-2 text-lg font-bold text-left">Rating</span>
											<span className="pt-2">
												<Box sx={{ "& > legend": { mt: 2 } }}>
													<Rating name="read-only" value={avgRating} readOnly />
												</Box>
											</span>
											{ avgRating && <span className="font-medium text-gray-600 mx-3">{avgRating}</span>}
										</p>
										<p>
											<span onClick={() => onRatingDialgInit()}>
												<CustomDialog
													triggerBtnText={"Rate Movie"}
													heading={"Give Rating to the Movie!"}
													desc={<RatingComp pickRating={pickRating}/>}
													handleCancel={handleCancelRating}
													handleContinue={handleRateMovie}
													continueBtnText={"Rate"}
													cancelBtnText={"Cancel"}
												/>
											</span>
										</p>
									</div>
									<div className="my-2">
										{!movie.isFavourite && (
											<Button onClick={() => handleFavourite()} size="small">
												<span className="icon mx-2">
													<FavoriteBorderIcon color="primary" />
												</span>
												Favourite
											</Button>
										)}

										{movie.isFavourite && (
											<Button onClick={() => handleFavourite()} size="small">
												<span className="icon mx-2">
													<FavoriteIcon color="primary" />
												</span>
												Favourited
											</Button>
										)}
										{!movie.isInWatchlist && (
											<Button onClick={(e) => handleWatchlist(e, movieId)} size="small">
												<span className="icon mx-2">
													<AddBoxIcon />
												</span>
												Watchlist
											</Button>
										)}
										{movie.isInWatchlist && (
											<Button onClick={(e) => handleWatchlist(e, movieId)} size="small">
												<span className="icon mx-2">
													<AddToQueueIcon />
												</span>
												Watchlisted
											</Button>
										)}
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
										{username === r.reviewBy.userName && (
											<span className="flex gap-2">
												<span onClick={() => handleClickOpen(r._id)} className="icon">
													<EditIcon color="primary" />
												</span>

												<span onClick={() => onDialgInit(r)}>
													<CustomDialog
														triggerBtnText={<DeleteIcon sx={{ color: pink[500] }} />}
														heading={"You are about to delete the comment!"}
														desc={comment}
														handleCancel={handleCloseAlert}
														handleContinue={handleDeleteComment}
														continueBtnText={"Delete"}
														cancelBtnText={"Cancel"}
													/>
												</span>
											</span>
										)}
									</div>
									<span className="ml-auto flex justify-start text-xs text-gray-400">
										<span>-by {r.reviewBy.userName}</span>
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
			<Dialog open={openLoginDialog} onClose={(event) => closeLoginDialog(event)}>
				<DialogTitle id="alert-dialog-title">Login</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Login to perform this action!</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={(event) => closeLoginDialog(event)}>Cancel</Button>
					<Button onClick={() => navigate("/login")} autoFocus>
						Login
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default MovieDetails;
