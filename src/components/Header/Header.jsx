import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const Header = () => {
	const userName = useSelector((state) => state.userName)
	return (
		<header className="nav-bar">
			<div className="flex justify-between">
				<span className="logo mx-3">
					<img className="h-16 nav-logo" src="/images/NavLogo.png" alt="logo" />
				</span>
				<span className="nav-links flex items-center font-medium text-base text-white gap-5 mx-4">
					<button>
						{userName}
					</button>
					<button>
						<Link to="/home">Home</Link>
					</button>

					<button>
						<Link to="/profile">My Profile</Link>
					</button>
				</span>
			</div>
		</header>
	);
};

export default Header;
