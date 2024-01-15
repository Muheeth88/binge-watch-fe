import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Home from "./pages/Home/Home";
import PrivateRoutes from "./utils/PrivateRoutes";
import Profile from "./pages/Profile/Profile";

function App() {
	return (
		<>
			<Router>
			<Header />
				<Routes>
					<Route path="/" element={<Navigate to="/home" replace />} />
					<Route path="/login" element={<Login />}></Route>
					<Route path="/signup" element={<Signup />}></Route>
					<Route element={<PrivateRoutes />}>
						<Route path="/home" element={<Home />} />
					</Route>
					<Route path="/profile" element={<Profile />} />
				</Routes>
			<Footer />
			</Router>
		</>
	);
}

export default App;
