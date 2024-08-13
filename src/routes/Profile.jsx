import { useEffect, useState } from "react";import api from "../../assets/api"; // Make sure this points to your API instance
import logo from "../../assets/img/logo.png";

function Background() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const userId = userData?.id; // Adjust according to how your user data structure
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				if (userId) {
					const response = await api.get(`/api/profile/${userId}/`);
					setProfile(response.data);
				} else {
					setError("User ID not found");
				}
			} catch (error) {
				console.error("Error fetching profile data:", error);
				setError("Error fetching profile data");
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [userId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
			<div className="bg-red-400 h-[224px] overflow-hidden relative">
				<img
					src={logo}
					alt=""
				/>
				<img
					src={logo}
					className="w-[100px] z-50 fixed top-[170px] right-4 bg-white rounded-full border-4 border-blue-800"
					alt=""
				/>
			</div>
			{profile && (
				<div className="profile-container">
					<h2>{profile.user.username}</h2>
					{profile.business_permit && (
						<div>
							<h3>Business Permit:</h3>
							<a
								href={`${api.defaults.baseURL}/media/${profile.business_permit}`}
								target="_blank"
								rel="noopener noreferrer">
								View Business Permit
							</a>
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default Background;
