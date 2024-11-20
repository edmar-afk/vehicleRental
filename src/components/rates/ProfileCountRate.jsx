/* eslint-disable react/no-unescaped-entities */ /* eslint-disable react/prop-types */ import Backdrop from "@mui/material/Backdrop";import Box from "@mui/material/Box";import Modal from "@mui/material/Modal";import Fade from "@mui/material/Fade";import Typography from "@mui/material/Typography";import { useState, useEffect } from "react";
import api from "../../assets/api"; // Replace with your actual API handler
import StarIcon from "@mui/icons-material/Star";
import rateBg from "../../assets/svg/rate.svg";
import StarRateIcon from "@mui/icons-material/StarRate";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function ProfileCountRate({ id, is_owner }) {
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(null);
	const [totalRatings, setTotalRatings] = useState(0);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// Fetch the owner's rating when the modal is opened
	useEffect(() => {
		if (open) {
			const fetchRating = async () => {
				try {
					// Decide the API endpoint based on is_owner
					const endpoint = is_owner ? `/api/owner/${id}/rating/` : `/api/customer/${id}/rating/`;
					const response = await api.get(endpoint);

					setRating(response.data.average_rating || "No rating available");
					setTotalRatings(response.data.total_ratings || 0);
				} catch (error) {
					console.error("Failed to fetch rating:", error);
					setRating("No rating yet");
				}
			};

			fetchRating();
		}
	}, [open, id, is_owner]);


	// Function to determine the button text based on the rating

	// Function to determine a message based on the rating
	const getButtonMessage = () => {
		if (is_owner) {
			// Owner's perspective
			if (rating >= 4.0) {
				return "You are highly trusted by your tenants! Keep up the great work.";
			} else if (rating >= 3.0) {
				return "Your tenants find you reliable. Keep striving for excellence!";
			} else if (rating >= 1.0) {
				return "Your rating is lower. Consider improving your service to build trust.";
			}
			return "You have not been rated by any tenants yet.";
		} else {
			// Customer's perspective
			if (rating >= 4.0) {
				return "Owners put a lot of trust in you! You're highly rated and a great tenant.";
			} else if (rating >= 3.0) {
				return "Owners find you reliable. You're building a good reputation as a tenant.";
			} else if (rating >= 1.0) {
				return "Some owners have raised concerns about your reliability. Consider addressing these issues.";
			}
			return "No owner has rated you yet. Start building your reputation!";
		}
	};



	return (
		<div>
			<button
				onClick={handleOpen}
				className="flex flex-col items-center bg-blue-600 p-2 rounded-full">
				<StarRateIcon className="text-white" />
			</button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}>
				<Fade in={open}>
					<Box sx={style}>
						<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
							<a href="#">
								<img
									className="rounded-t-lg"
									src={rateBg}
								/>
							</a>
							<div className="px-5 pb-5">
								<a href="#">
									<h5 className="text-xl font-semibold tracking-tight text-gray-900">Your Rating Info</h5>
								</a>
								<div className="flex items-center mt-2.5 mb-5">
									<div className="flex items-center space-x-1 rtl:space-x-reverse">Average Rating</div>
									<span className="bg-blue-100 flex items-center text-blue-900 text-base font-semibold px-2.5 py-0.5 rounded ms-3">
										{rating} <StarIcon />
									</span>
								</div>
								<Typography
									id="total-ratings-description"
									sx={{ mb: 2, fontSize: 12 }}>
									Rated by: {totalRatings} Customer(s)
								</Typography>
								<div className="flex flex-col items-start justify-between">
									<span className="text-lg font-bold text-gray-900">{getButtonMessage()}</span>
									{/* Close Button */}
									<button
										onClick={handleClose} // Close the modal on click
										className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800">
										Close
									</button>
								</div>
							</div>
						</div>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
