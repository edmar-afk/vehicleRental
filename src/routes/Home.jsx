import userIcon from "../assets/img/user-icon.png";
function Home() {
	// Get all user data from local storage
	const userData = JSON.parse(localStorage.getItem("userData"));
	return (
		<>
			<p>Home</p>
			{userData ? (
				<div>
					<p>Welcome, {userData.first_name}!</p>
					<p>Email: {userData.email}</p>
					<p>Username: {userData.username}</p>
					<div>
						<img
							src={
								userData.profile && userData.profile.profile_pic
									? `http://127.0.0.1:8000${userData.profile.profile_pic}`
									: userIcon
							}
							className=""
							alt="Profile Pic"
						/>
					</div>
				</div>
			) : (
				<p>Unauthorized!</p>
			)}
		</>
	);
}

export default Home;
