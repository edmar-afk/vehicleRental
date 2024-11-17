import FilterSearch from "../components/homepage/FilterSearch";
import PostRental from "../components/homepage/PostRental";
import Greetings from "../components/homepage/Greetings";
import Navbar from "../components/Navbar";

function Home() {
	// Get all user data from local storage
	const userData = JSON.parse(localStorage.getItem("userData"));
	return (
		<>
			<Greetings />
			<FilterSearch/>
			<div className="mb-24 mt-2">
				<PostRental />
				
			</div>
			{/* Conditionally render Navbar if userId (or id) exists */}
			{userData?.id && <Navbar />}
		</>
	);
}

export default Home;
