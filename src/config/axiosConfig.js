import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("jwt");
		if (!token) {
			return config;
		}
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { api };
