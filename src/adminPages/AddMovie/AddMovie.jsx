import "./style.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { api } from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		tagline: "",
		originalLanguage: "",
		countryOfOrigin: "",
		genre: [],
		releaseDatedate: null,
	});

	const [genres, setGenres] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/movies/add-movie", formData);
			navigate("/home");
		} catch (error) {
			console.error(error.messgae);
		}
	};

	useEffect(() => {
		getGenres();
	}, []);

	const getGenres = async () => {
		const response = await api.get("/genres/all-genres");
		setGenres(response.data.data);
	};

	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: 48 * 4.5 + 8,
				width: 250,
			},
		},
	};

	return (
		<div className="mx-40">
			<div className="">
				<div className="mt-3 mb-2">
					<p className="text-xl font-semibold text-gray-700">Add Movie</p>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col justify-between">
						<div className="my-2">
							<label className="frmLbl" htmlFor="title">
								Movie Name
							</label>
							<br />
							<div className="searchBox mt-2 w-2/3">
								<input
									name="title"
									onChange={handleChange}
									value={formData.title}
									className="filterInput w-full"
									type="text"
									placeholder="Add movie title"
								/>
							</div>
						</div>
						<div className="my-2">
							<label className="frmLbl" htmlFor="tagline">
								Tag Line
							</label>
							<br />
							<div className="searchBox mt-2 w-2/3">
								<input
									name="tagline"
									onChange={handleChange}
									value={formData.tagline}
									className="filterInput w-full"
									type="text"
									placeholder="Add movie caption"
								/>
							</div>
						</div>
						<div className="my-2">
							<label className="frmLbl" htmlFor="originalLanguage">
								Language
							</label>
							<br />
							<div className="searchBox mt-2 w-2/3">
								<input
									name="originalLanguage"
									onChange={handleChange}
									value={formData.originalLanguage}
									className="filterInput w-full"
									type="text"
									placeholder="Original Language"
								/>
							</div>
						</div>

						<div className="my-2">
							<label className="frmLbl" htmlFor="countryOfOrigin">
								Country of Origin
							</label>
							<br />
							<div className="searchBox mt-2 w-2/3">
								<input
									name="countryOfOrigin"
									onChange={handleChange}
									value={formData.countryOfOrigin}
									className="filterInput w-full"
									type="text"
									placeholder="Country of Origin"
								/>
							</div>
						</div>

						<div className="my-2">
							<label className="frmLbl" htmlFor="releaseDate">
								Release Date
							</label>
							<br />
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker
										onChange={(date) => setFormData({ ...formData, releaseDate: date.toString() })}
										value={formData.releaseDate}
										label="Pick a date"
									/>
								</DemoContainer>
							</LocalizationProvider>
						</div>

						<div className="my-2">
							<InputLabel className="frmLbl" id="demo-multiple-name-label">
								Genre
							</InputLabel>
							<Select
								labelId="demo-multiple-name-label"
								id="demo-multiple-name"
								multiple
								name="genre"
								value={formData.genre}
								onChange={handleChange}
								input={<OutlinedInput label="Name" />}
								MenuProps={MenuProps}
							>
								{genres.map((g) => (
									<MenuItem key={g._id} value={g.genre}>
										{g.genre}
									</MenuItem>
								))}
							</Select>
						</div>
					</div>
					<button type="submit" className="text-end mb-6 mt-2 button-blue">
						Add Movie
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddMovie;
