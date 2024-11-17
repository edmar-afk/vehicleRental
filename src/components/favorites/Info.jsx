import { useEffect, useState } from "react";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../../assets/img/user-icon.png";
import {
	faExclamationTriangle,
	faHeart,
	faLocationDot,
	faMessage,
	faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import api from "../../assets/api";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

function Info() {
	const [favorites, setFavorites] = useState([]);
	const [likeCounts, setLikeCounts] = useState({}); // To hold like counts for each post
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch user data from localStorage or any other source
		const user = JSON.parse(localStorage.getItem("userData"));
		setUserData(user);

		if (user) {
			// Fetch favorites for the logged-in user
			api
				.get("/api/user/favorites/", {
					headers: {
						Authorization: `Bearer ${user.token}`, // Include token in headers
					},
				})
				.then((response) => {
					setFavorites(response.data); // Set favorites data
				})
				.catch((error) => {
					console.error("Error fetching favorites:", error);
					Swal.fire({
						title: "Error",
						text: "There was an error fetching your favorites. Please try again later.",
						icon: "error",
						confirmButtonColor: "#3085d6",
						confirmButtonText: "Okay",
					});
				});
		}
	}, []);

	// Fetch the like count for each post
	useEffect(() => {
		favorites.forEach((favorite) => {
			api
				.get(`/api/displayLikes/${favorite.post.id}/`)
				.then((response) => {
					setLikeCounts((prevCounts) => ({
						...prevCounts,
						[favorite.post.id]: response.data.likes_count,
					}));
				})
				.catch((error) => {
					console.error("Error fetching like count:", error);
				});
		});
	}, [favorites]);

	const handleLikePost = async (postId) => {
		if (!userData) {
			Swal.fire({
				title: "Login Required",
				text: "You must be logged in to Like this Post.",
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
				if (likeCounts[postId] > 0) {
					// If the post has already been liked, send DELETE request to unlike
					await api.delete(`/api/rental/${postId}/unlike/`);
					setLikeCounts((prevCounts) => ({
						...prevCounts,
						[postId]: prevCounts[postId] - 1,
					}));
				} else {
					// If the post hasn't been liked, send POST request to like
					await api.post(`/api/rental/${postId}/likes/`);
					setLikeCounts((prevCounts) => ({
						...prevCounts,
						[postId]: (prevCounts[postId] || 0) + 1,
					}));
				}
			} catch (error) {
				console.error("Error liking/unliking the post:", error);
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

	const handleRemoveFavorite = async (postId) => {
		if (!userData) {
			Swal.fire({
				title: "Login Required",
				text: "You must be logged in to remove this from your favorites.",
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
				await api.delete(`/api/favorites/remove/${postId}/`, {
					headers: {
						Authorization: `Bearer ${userData.token}`,
					},
				});
				// Remove the favorite from the local state after successful deletion
				setFavorites(favorites.filter((fav) => fav.post.id !== postId));
				Swal.fire({
					title: "Removed from Favorites",
					text: "This rental has been removed from your favorites.",
					icon: "success",
					confirmButtonColor: "#3085d6",
				});
			} catch (error) {
				console.error("Error removing from favorites:", error);
				Swal.fire({
					title: "Error",
					text: "There was an error removing this rental from your favorites. Please try again later.",
					icon: "error",
					confirmButtonColor: "#3085d6",
					confirmButtonText: "Okay",
				});
			}
		}
	};

	return (
		<div className="mb-32">
			<div className="bg-white h-screen w-full fixed -z-50"></div>
			<div className="rounded-md shadow-2xl w-full bg-[#f6f6f6] text-gray-800 mt-8">
				{favorites.map((favorite) => (
					<div
						key={favorite.post.id}
						className="mb-8">
						<div className="flex items-center justify-between p-3">
							<div className="flex items-center space-x-2">
								<img
									src={favorite.post.posted_by?.profile?.profile_pic || icon} // Inline check
									alt=""
									className="object-cover object-center w-8 h-8 rounded-full"
								/>
								<div className="-space-y-1">
									<h2 className="text-sm font-semibold leading-none flex flex-row justify-start">
										{favorite.post.posted_by?.last_name}, {favorite.post.posted_by?.first_name}{" "}
										<span className="text-white ml-1 bg-blue-600 text-[8px] py-0.5 px-2 rounded-full pt-[3px]">
											Owner
										</span>
									</h2>
									<span className="inline-block text-xs leading-none text-gray-600">
										Posted a rent on{" "}
										<span className="inline-block text-xs leading-none text-gray-600">
											{new Date(favorite.post.date_posted).toLocaleDateString("en-GB", {
												day: "2-digit",
												month: "short",
												year: "numeric",
											})}
											,{" "}
											{new Date(favorite.post.date_posted).toLocaleTimeString("en-US", {
												hour: "2-digit",
												minute: "2-digit",
												second: "2-digit",
												hour12: true,
											})}
										</span>
									</span>
								</div>
							</div>
							<motion.div
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 1.5 }}>
								<FontAwesomeIcon
									icon={faExclamationTriangle}
									className="text-2xl"
								/>
							</motion.div>
						</div>
						<img
							src={favorite.post.images}
							alt="Rental"
							className="object-cover object-center w-full h-72 bg-gray-500"
						/>
						<div className="p-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center justify-left">
									<FontAwesomeIcon
										icon={faLocationDot}
										className="text-xl"
									/>
									<span className="text-[9px] ml-1 text-gray-600">{favorite.post.location}</span>
								</div>
								<div
									className="flex items-center justify-center"
									onClick={() => handleRemoveFavorite(favorite.post.id)}>
									<motion.button
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 1.5 }}>
										<FontAwesomeIcon
											icon={faHeart}
											className="text-xl text-red-600"
										/>
									</motion.button>
									<span className="text-[9px] ml-2 text-gray-600">Remove from favorites</span>
								</div>
							</div>

							<div className="flex flex-row justify-between items-center py-3">
								<div className="flex flex-wrap ml-0.5">
									<div className="flex space-x-2">
										<div
											className="flex"
											onClick={() => handleLikePost(favorite.post.id)}>
											<FontAwesomeIcon
												icon={faThumbsUp}
												className="text-lg"
											/>
										</div>
										<span className="text-xs pt-1">{likeCounts[favorite.post.id] || 0}</span>
									</div>
								</div>
								{userData !== null ? (
									<Link
										to={`/room/${favorite.post.posted_by.id}`}
										className="flex items-center justify-left">
										<FontAwesomeIcon
											icon={faMessage}
											className="text-lg"
										/>
										<span className="text-[9px] ml-1 text-gray-600">Message Seller</span>
									</Link>
								) : (
									<span className="flex items-center justify-left text-gray-600">
										<FontAwesomeIcon
											icon={faMessage}
											className="text-lg"
										/>
										<span className="text-[9px] ml-1">Message Seller</span>
									</span>
								)}
							</div>

							<div className="my-2">
								<p className="text-gray-700 text-xs">{favorite.post.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Info;
