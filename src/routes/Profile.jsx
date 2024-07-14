import { Link } from "react-router-dom";import userIcon from "../assets/img/user-icon.png";import BackgroundProfile from "../components/profile/BackgroundProfile";import ProfileDetails from "../components/profile/ProfileDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../assets/api";
import { motion } from "framer-motion";

function Profile() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const userId = userData?.id; // Adjust according to how your user data structure
	const fileInputRef = useRef(null);
	const [imageUrl, setImageUrl] = useState(userIcon);
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log(userId);
		const fetchProfilePicture = async () => {
			try {
				const response = await api.get(`/api/profile/${userId}/`);
				setProfile(response.data);
				console.log(response);
				if (response.data.profile_pic) {
					setImageUrl(response.data.profile_pic);
				} else {
					console.log("No profile picture found.");
				}
			} catch (error) {
				console.error("Error fetching profile picture:", error);
			} finally {
				setLoading(false); // Set loading to false after data is fetched
			}
		};

		if (userId) {
			fetchProfilePicture();
		}
	}, [userId]); // Depend on userId to avoid infinite loops

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("profile_pic", file);

		try {
			const res = await api.post("/api/upload_picture/", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token if you are using authentication
				},
			});

			if (res.status === 200) {
				Swal.fire({
					title: "Success!",
					text: "Profile picture updated successfully.",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					window.location.reload(); // Reload the page to show the updated profile picture
				});
			} else {
				Swal.fire({
					title: "Error!",
					text: "Failed to update profile picture.",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		} catch (error) {
			Swal.fire({
				title: "Error!",
				text: error.response?.data?.detail || "Failed to update profile picture.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	return (
		<div>
			<BackgroundProfile />
			<Link
				to="/logout"
				className="relative">
				<button className="px-2 py-1.5 bg-red-500 text-white hover:bg-red-600 absolute top-2 left-2 rounded-full">
					<div className="flex flex-col items-center">
						<FontAwesomeIcon icon={faPersonWalkingDashedLineArrowRight} />
						<p className="text-[8px]">Logout</p>
					</div>
				</button>
			</Link>
			{userData ? (
				<div className="flex flex-col justify-center items-center">
					<motion.div
						drag
						dragConstraints={{
							top: -50,
							left: -50,
							right: 50,
							bottom: 50,
						}}
						className="mt-14 bg-white rounded-full relative">
						<img
							src={imageUrl}
							className="w-40 h-40 object-cover rounded-full"
							draggable="false"
							alt="Profile Pic"
						/>
						<div className="flex items-center justify-center rounded-full bg-gray-100 absolute bottom-0 -right-1 animate-pulse">
							{/* Hidden File Input */}
							<input
								type="file"
								ref={fileInputRef}
								className="hidden"
								accept="image/*"
								onChange={handleFileChange}
							/>

							{/* Camera Icon Button */}
							<button
								onClick={handleButtonClick}
								className="bg-blue-500 text-white py-0 px-1.5 rounded-full shadow-md hover:bg-blue-700 outline-none ring-2 ring-offset-2 ring-blue-500">
								<FontAwesomeIcon
									icon={faCamera}
									className="text-[12px]"
								/>
							</button>
						</div>
					</motion.div>
					<p className="text-white font-bold mt-4 text-xl">
						{userData.last_name}, {userData.first_name} ({userData.username})
					</p>

					<div className="mb-32">
						<ProfileDetails
							email={userData.email}
							mobile_number={profile.mobile_num}
							loading={loading}
						/>
					</div>
				</div>
			) : (
				<p>Unauthorized!</p>
			)}
		</div>
	);
}

export default Profile;
