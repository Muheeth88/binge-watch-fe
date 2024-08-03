import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup";
// import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import AddMovie from "./adminPages/AddMovie/AddMovie";
import AdminRoutes from "./utils/AdminRoutes";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader/Loader";
const Home = lazy(() => import("./pages/Home/Home.jsx"))
import { Toaster } from "@/components/ui/sonner"
import { Toaster as Toaster2 } from "@/components/ui/toaster"

function App() {
	return (
		<>
			<Router>
				<Header />
				<div className="body">
					<Routes>
						<Route path="/" element={<Navigate to="/home" replace />} />
						<Route path="/login" element={<Login />}></Route>
						<Route path="/signup" element={<Signup />}></Route>

						<Route
							path="/home"
							element={
								<Suspense fallback={<Loader />}>
									<Home />
								</Suspense>
							}
						></Route>
						<Route path="movie-details/:movieId" element={<MovieDetails />} />

						<Route path="/profile" element={<Profile />} />
						{/* Admin Routes */}
						<Route element={<AdminRoutes />}>
							<Route path="/add-movie" element={<AddMovie />} />
						</Route>
					</Routes>
				</div>
				<Footer />
			</Router>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<Toaster position="top-right"/>
			<Toaster2 position="center" />
		</>
	);
}

export default App;
