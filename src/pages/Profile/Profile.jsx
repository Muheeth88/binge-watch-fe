import React from "react";
import {Link} from 'react-router-dom'

const Profile = () => {
    // const userName = localStorage.getItem("jwt")
	return (
		<>
			<div>Profile</div>
            <div><Link to="/login">Login</Link></div>
            <div><Link to="/logout">Logout</Link></div>
		</>
	);
};

export default Profile;
