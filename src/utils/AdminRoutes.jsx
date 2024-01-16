import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoutes = async () => {
	const user = await api.get("/users/get-user-profile");
	return user.data.data.role === "ADMIN" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
