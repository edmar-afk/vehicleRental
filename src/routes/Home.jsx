import FilterSearch from "../components/homepage/FilterSearch";
import PostRental from "../components/homepage/PostRental";

function Home() {
	// Get all user data from local storage
	const userData = JSON.parse(localStorage.getItem("userData"));

	console.log(userData);
	return (
		<>
			<FilterSearch />
			<div className="p-2 mb-24 mt-2">
				<PostRental />
				<PostRental />
			</div>
		</>
	);
}

export default Home;
