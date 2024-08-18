import Paper from "@mui/material/Paper";import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting

function FilterSearch() {
	const navigate = useNavigate(); // Initialize navigate

	const userData = JSON.parse(localStorage.getItem("userData"));
	const isLoggedIn = userData !== null && userData !== undefined;

	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent the default form submission

		if (!isLoggedIn) {
			Swal.fire({
				title: "Login Required",
				text: "You must be logged in to search.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Login",
				cancelButtonText: "Continue Browsing",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/login");
				}
			});
		} else {
			console.log("Proceed with search");
			// Add search logic here
		}
	};

	return (
		<>
			<div className="sticky top-0 z-50 backdrop-blur-2xl">
				<div className="w-full top-0"></div>
				<div className="p-2 top-0 w-full">
					<Paper
						component="form"
						onSubmit={handleSubmit} // Use onSubmit for form submission
						sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="Search"
							inputProps={{ "aria-label": "Search" }}
						/>
						<IconButton
							type="submit" // Change button type to submit
							sx={{ p: "10px" }}
							aria-label="search">
							<SearchIcon />
						</IconButton>
						<Divider
							sx={{ height: 28, m: 0.5 }}
							orientation="vertical"
						/>
					</Paper>
				</div>
			</div>
		</>
	);
}

export default FilterSearch;
