import { useEffect, useState } from "react";import { useParams } from "react-router-dom";import Zoom from "react-medium-image-zoom";import RateCountModal from "../rates/RateCountModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import api from "../../assets/api";
import userIcon from '../../assets/img/user-icon.png';
function Body() {
	const { postId } = useParams(); // Get postId from the URL params
	const [rental, setRental] = useState(null); // State to store rental data
	const [profilePicture, setProfilePicture] = useState(""); // State to store profile picture
	const userData = JSON.parse(localStorage.getItem("userData")); // Get logged-in user data

	// Fetch rental data and profile picture when the component mounts or postId/userData changes
	useEffect(() => {
		const fetchRentalAndProfile = async () => {
			try {
				// Fetch rental data
				const rentalResponse = await api.get(`/api/rental/${postId}/`);
				setRental(rentalResponse.data); // Set the fetched rental data to state

				// Fetch profile picture of the logged-in user
				const profileResponse = await api.get(`/api/profile/${userData.id}/`);
				setProfilePicture(profileResponse.data.profile_pic); // Set profile picture URL
			} catch (error) {
				console.error("Error fetching rental data or profile picture:", error);
			}
		};

		if (postId && userData.id) {
			fetchRentalAndProfile();
		}
	}, [postId, userData.id]);

	// If rental data is not loaded yet, show loading or placeholder
	if (!rental) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div className="bg-white shadow-sm">
				<div className="flex items-center justify-between p-3">
					<div className="flex items-center space-x-2">
						<img
							src={profilePicture || rental.posted_by.profile_picture || userIcon} // Use profilePic state or rental's posted_by profile_picture
							alt={rental.posted_by.name || "User"}
							className="object-cover object-center w-8 h-8 rounded-full"
						/>
						<div className="-space-y-1">
							<h2 className="text-sm font-semibold leading-none flex flex-row justify-start items-center">
								{rental.posted_by.first_name || "hehehe"}
								<span className="text-white ml-1 bg-blue-600 text-[8px] py-0.5 px-2 rounded-full pt-[3px]">
									<RateCountModal
										ownerId={rental.posted_by.id}
										ownerName={rental.posted_by.first_name}
									/>
								</span>
							</h2>
							<span className="inline-block text-xs leading-none text-gray-600">Posted a rent on </span>
						</div>
					</div>
				</div>

				<Zoom>
					<img
						src={rental.images || userIcon} // Assuming images is an array
						alt="Rental"
						className="object-cover object-center w-full h-72 bg-gray-500"
					/>
				</Zoom>

				<div className="p-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-left">
							<FontAwesomeIcon
								icon={faLocationDot}
								className="text-xl"
							/>
							<span className="text-[9px] ml-1 text-gray-600">{rental.location}</span>
						</div>
					</div>

					<div className="my-2">
						<p className="text-gray-700 text-xs">{rental.description}</p>
					</div>
					<hr className="mt-6 shadow-2xl" />
				</div>
			</div>
		</>
	);
}

export default Body;
