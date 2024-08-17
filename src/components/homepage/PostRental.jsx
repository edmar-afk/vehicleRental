import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../../assets/img/user-icon.png";
import {
	faExclamationTriangle,
	faHeart,
	faLocationDot,
	faMessage,
	faThumbsUp,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // Import Swal
import { useNavigate } from "react-router-dom";
function PostRental() {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const isLoggedIn = userData !== null && userData !== undefined;

	const navigate = useNavigate();

	const handleAddToFavorites = () => {
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
			navigate("/");
		}
	};

	const handleMessageSeller = () => {
		if (!isLoggedIn) {
			Swal.fire({
				title: "Login Required",
				text: "You must be logged in to message this Seller.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Login",
				cancelButtonText: "Continue Browsing",
			}).then((result) => {
				if (result.isConfirmed) {
					// Handle login logic here (e.g., redirect to login page)
					console.log("Redirect to login page");
				}
			});
		} else {
			// Message seller logic
			console.log("Message seller");
		}
	};

	const handleLikePost = () => {
		if (!isLoggedIn) {
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
					// Handle login logic here (e.g., redirect to login page)
					console.log("Redirect to login page");
				}
			});
		} else {
			// Message seller logic
			console.log("Message seller");
		}
	};

	return (
		<div className="rounded-md shadow-2xl w-full bg-[#f6f6f6] text-gray-800 mt-8">
			<div className="flex items-center justify-between p-3">
				<div className="flex items-center space-x-2">
					<img
						src={icon}
						alt=""
						className="object-cover object-center w-8 h-8 rounded-ful"
					/>
					<div className="-space-y-1">
						<h2 className="text-sm font-semibold leading-none flex flex-row justify-center">
							Rimark Tumala{" "}
							<span className="text-white ml-1 bg-blue-600 text-[8px] py-0.5 px-2 rounded-full pt-[3px]">Owner</span>
						</h2>
						<span className="inline-block text-xs leading-none text-gray-600">Posted a rent 1m ago</span>
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
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWrTLxJ73jn7dAl0S7urT3ef9gecb6j_61RQ&s"
				alt=""
				className="object-cover object-center w-full h-72 bg-gray-500"
			/>
			<div className="p-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-left">
						<FontAwesomeIcon
							icon={faLocationDot}
							className="text-xl"
						/>
						<span className="text-[9px] ml-1 text-gray-600"> Pob. Guipos ZDS</span>
					</div>
					<div className="flex items-center justify-center">
						<motion.button
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 1.5 }}
							onClick={handleAddToFavorites}>
							<FontAwesomeIcon
								icon={faHeart}
								className="text-xl"
							/>
						</motion.button>
						<span className="text-[9px] ml-2 text-gray-600">Add to favorites</span>
					</div>
				</div>

				<div className="flex flex-row justify-between items-center py-3">
					<div className="flex flex-wrap ml-0.5">
						<div className="flex space-x-2">
							<div
								className="flex"
								onClick={handleLikePost}>
								<FontAwesomeIcon
									icon={faThumbsUp}
									className="text-lg"
								/>
							</div>
							<span className="text-xs pt-1">1 Likes</span>
						</div>
					</div>
					<div
						className="flex items-center justify-between"
						onClick={handleMessageSeller}>
						<div className="flex items-center justify-left">
							<FontAwesomeIcon
								icon={faMessage}
								className="text-lg"
							/>
							<span className="text-[9px] ml-1 text-gray-600">Message Seller</span>
						</div>
					</div>
				</div>

				<div className="my-2">
					<p className="text-gray-700 text-xs">Libre rent pang dakop sa mga walay uyab HAAHAHAHAH</p>
				</div>
			</div>
		</div>
	);
}

export default PostRental;
