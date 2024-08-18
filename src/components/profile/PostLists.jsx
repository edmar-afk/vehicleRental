import { useEffect, useState } from "react";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faThumbsUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import icon from "../../assets/img/user-icon.png";
import api from "../../assets/api";
import Swal from "sweetalert2";

function PostLists({ ownerId }) {
	const [rentals, setRentals] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchRentals = async () => {
			try {
				const userId = userData?.id; // Adjust according to your user data structure
				const response = await api.get(`/api/my-rentals/${ownerId}/`);
				setRentals(response.data);
			} catch (error) {
				console.error("Error fetching rentals:", error);
			}
		};

		const checkLoginStatus = async () => {
			const userDataFromStorage = JSON.parse(localStorage.getItem("userData"));
			const userId = userDataFromStorage?.id; // Adjust according to your user data structure

			if (userId) {
				try {
					const response = await api.get(`/api/profile/${userId}/`);
					setIsLoggedIn(true);
					setUserData(response.data);
					fetchRentals();
				} catch (error) {
					setIsLoggedIn(false);
					console.error("Error fetching user info:", error);
				}
			} else {
				setIsLoggedIn(false);
			}
		};

		checkLoginStatus();
	}, []);

	const handleDelete = async (rentalId) => {
		if (!rentalId) {
			console.error("Invalid rental ID:", rentalId);
			return;
		}

		// Show confirmation dialog
		const { isConfirmed } = await Swal.fire({
			title: "Are you sure?",
			text: "This action cannot be undone!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			cancelButtonText: "No, cancel!",
		});

		if (isConfirmed) {
			try {
				console.log(`Sending DELETE request to: /api/rentals/${rentalId}/delete/`);
				await api.delete(`/api/rentals/${rentalId}/delete/`);

				// Show success message
				await Swal.fire({
					icon: "success",
					title: "Successfully Deleted",
					text: "The rental has been deleted.",
				});

				// Update state to remove the deleted rental
				setRentals(rentals.filter((rental) => rental.id !== rentalId));
			} catch (error) {
				console.error("Error deleting rental:", error);
				// Optionally show an error message
				await Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!",
				});
			}
		}
	};

	return (
		<>
			<div className="rounded-md w-full text-gray-800 mt-8">
				{rentals.map((rental) => (
					<div
						key={rental.id}
						className="mb-14 bg-white shadow-2xl">
						<div className="flex items-center justify-between p-3">
							<div className="flex items-center space-x-2">
								<img
									src={(rental.posted_by && rental.posted_by.profile && rental.posted_by.profile.profile_pic) || icon}
									alt=""
									className="object-cover object-center w-8 h-8 rounded-full"
								/>

								<div className="-space-y-1">
									<h2 className="text-sm font-semibold leading-none flex flex-row justify-start">
										{rental.posted_by?.last_name || "Unknown"}, {rental.posted_by?.first_name || "Unknown"}{" "}
										<span className="text-white ml-1 bg-blue-600 text-[8px] py-0.5 px-2 rounded-full pt-[3px]">
											Owner
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
							<button
								className="flex items-center justify-left"
								onClick={() => handleDelete(rental.id)}>
								<FontAwesomeIcon
									icon={faTrashAlt}
									className="text-xl text-red-400 font-bold"
								/>{" "}
							</button>
						</div>
						<img
							src={rental.images}
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
									<span className="text-[9px] ml-1 text-gray-600">{rental.location}</span>
								</div>
							</div>

							<div className="flex flex-row justify-between items-center py-3">
								<div className="flex flex-wrap ml-0.5">
									<div className="flex space-x-2">
										<div className="flex">
											<FontAwesomeIcon
												icon={faThumbsUp}
												className="text-lg"
											/>
										</div>
										<span className="text-xs pt-1">1 Likes</span>
									</div>
								</div>
							</div>

							<div className="my-2">
								<p className="text-gray-700 text-xs">{rental.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default PostLists;
