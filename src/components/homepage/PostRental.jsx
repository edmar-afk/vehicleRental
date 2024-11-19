import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../../assets/img/user-icon.png";
import {
	faExclamationTriangle,
	faHeart,
	faLocationDot,
	faMessage,
	faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import api from "../../assets/api";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import RateModal from "../rates/RateModal";
import RateCountModal from "../rates/RateCountModal";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
function PostRental() {
	const [rentals, setRentals] = useState([]); // State to hold rentals
	const [likedRentals, setLikedRentals] = useState({});
	const [likeCounts, setLikeCounts] = useState({}); // Store the like counts for each rental
	const userData = JSON.parse(localStorage.getItem("userData"));
	const isLoggedIn = userData !== null && userData !== undefined;
	const navigate = useNavigate();
	console.log(rentals);
	// useEffect to fetch rental data on component mount
	useEffect(() => {
		let isMounted = true;

		api
			.get("/api/rentals/")
			.then((response) => {
				if (isMounted) {
					setRentals(response.data);
				}
			})
			.catch((error) => {
				console.error("There was an error fetching the rental data!", error);
			});

		return () => {
			isMounted = false;
		};
	}, []);

	useEffect(() => {
		rentals.forEach((rental) => {
			api
				.get(`/api/displayLikes/${rental.id}/`)
				.then((response) => {
					setLikeCounts((prevCounts) => ({
						...prevCounts,
						[rental.id]: response.data.likes_count,
					}));
				})
				.catch((error) => {
					console.error("Error fetching like count:", error);
				});
		});
	}, [rentals]); // This will run again whenever rentals change

	const handleAddToFavorites = async (postId) => {
		if (!isLoggedIn) {
			Swal.fire({
				title: "Login Required",
				text: "You must be logged in to add this to your Favorites.",
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
			try {
				const response = await api.post("/api/favorites/", {
					post: postId,
					favorite: true,
				});

				console.log("Post added to favorites:", response.data);
				Swal.fire({
					title: "Added to Favorites",
					text: "The post has been added to your favorites.",
					icon: "success",
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Okay",
				});
			} catch (error) {
				console.error("Error adding post to favorites:", error);
				Swal.fire({
					title: "Error",
					text: "There was an error adding the post to favorites. Please try again later.",
					icon: "error",
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Okay",
				});
			}
		}
	};

	const handleMessageSeller = () => {
		if (!isLoggedIn) {
			Swal.fire({
				title: "Login Required",
				text: "You must be logged in to message this Owner.",
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
			console.log("Message seller");
		}
	};

	const handleLikePost = async (rentalId) => {
		if (!isLoggedIn) {
			Swal.fire({
				title: "Login Required",
				text: "You must be logged in to Like or Unlike this Post.",
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
			try {
				// Call the toggle-like API
				const response = await api.post(`/api/rental/${rentalId}/toggle-like/`);
				const { detail } = response.data;

				// After toggling, fetch the latest like count
				api
					.get(`/api/displayLikes/${rentalId}/`)
					.then((response) => {
						setLikeCounts((prevCounts) => ({
							...prevCounts,
							[rentalId]: response.data.likes_count,
						}));
					})
					.catch((error) => {
						console.error("Error fetching latest like count:", error);
					});
			} catch (error) {
				console.error("Error toggling like:", error);
				Swal.fire({
					title: "Error",
					text: "There was an error processing your like/unlike. Please try again later.",
					icon: "error",
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Okay",
				});
			}
		}
	};

	const handleReportClick = () => {
		if (!isLoggedIn) {
			Swal.fire({
				title: "Login Required",
				text: "You must be logged in to Report this Owner.",
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
			console.log("Like post");
		}
	};

	return (
		<div className="rounded-md w-full text-gray-800 mt-8">
			{rentals.map((rental) => (
				<div
					key={rental.id}
					className="mb-4 bg-white shadow-sm">
					<div className="flex items-center justify-between p-3">
						<div className="flex items-center space-x-2">
							<img
								src={rental.posted_by.profile?.profile_pic || icon} // Inline check
								alt=""
								className="object-cover object-center w-8 h-8 rounded-full"
							/>
							<div className="-space-y-1">
								<h2 className="text-sm font-semibold leading-none flex flex-row justify-start items-center">
									{rental.posted_by.last_name}, {rental.posted_by.first_name}{" "}
									<span className="text-white ml-1 bg-blue-600 text-[8px] py-0.5 px-2 rounded-full pt-[3px]">
										<RateCountModal
											ownerId={rental.posted_by.id}
											ownerName={rental.posted_by.first_name}
										/>
									</span>
								</h2>
								<span className="inline-block text-xs leading-none text-gray-600">
									Posted a rent on{" "}
									<span className="inline-block text-xs leading-none text-gray-600">
										{new Date(rental.date_posted).toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "short",
											year: "numeric",
										})}
										,{" "}
										{new Date(rental.date_posted).toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
											second: "2-digit",
											hour12: true,
										})}
									</span>
								</span>
							</div>
						</div>

						{userData && userData.is_superuser ? null : (
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 1.5 }}
								onClick={handleReportClick}>
								{isLoggedIn ? (
									<div // Replace with your actual report link or action
										className="flex items-center justify-left">
										<RateModal
											ownerId={rental.posted_by.id}
											ownerName={rental.posted_by.first_name}
										/>
									</div>
								) : (
									<span className="flex items-center justify-left text-gray-600">
										<button className="flex flex-col items-center">
											<ThumbsUpDownOutlinedIcon />
											<p className="text-xs">Rate</p>
										</button>
									</span>
								)}
							</motion.div>
						)}
					</div>
					<Zoom>
						<img
							src={rental.images}
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
							{(!userData || (userData && !userData.is_superuser)) && (
								<div className="flex items-center justify-center">
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 1.5 }}
										onClick={() => handleAddToFavorites(rental.id)} // Pass postId here
									>
										<FontAwesomeIcon
											icon={faHeart}
											className="text-xl"
										/>
									</motion.button>
									<span className="text-[9px] ml-2 text-gray-600">Add to favorites</span>
								</div>
							)}
						</div>

						<div className="flex flex-row justify-between items-center py-3">
							<div className="flex flex-wrap ml-0.5">
								<div className="flex space-x-1">
									<div
										className={`flex ${likedRentals[rental.id] ? "text-red-500" : ""}`} // Change icon color based on like state
										onClick={() => handleLikePost(rental.id)}>
										<FontAwesomeIcon
											icon={faThumbsUp}
											className="text-lg"
										/>
									</div>
									<span className="text-xs pt-1">{likeCounts[rental.id] || 0}</span>
									<button className="text-xs pt-1">{likedRentals[rental.id] ? "Unlike" : "Like"}</button>
								</div>
							</div>

							{(!userData || (userData && !userData.is_superuser)) && (
								<div
									className="flex items-center justify-between"
									onClick={handleMessageSeller}>
									{userData !== null ? (
										<Link
											to={`/room/${rental.posted_by.id}`}
											className="flex items-center justify-left">
											<FontAwesomeIcon
												icon={faMessage}
												className="text-lg"
											/>
											<span className="text-[9px] ml-1 text-gray-600">Message Owner</span>
										</Link>
									) : (
										<span className="flex items-center justify-left text-gray-600">
											<FontAwesomeIcon
												icon={faMessage}
												className="text-lg"
											/>
											<span className="text-[9px] ml-1">Message Owner</span>
										</span>
									)}
								</div>
							)}
						</div>

						<div className="my-2">
							<p className="text-gray-700 text-xs">{rental.description}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default PostRental;
