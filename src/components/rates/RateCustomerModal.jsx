/* eslint-disable react/prop-types */ import Backdrop from "@mui/material/Backdrop";import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import { useState } from "react";
import api from "../../assets/api";

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

export default function RateCustomerModal({ customerId, customerName }) {
	const userData = JSON.parse(localStorage.getItem("userData"));
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(null);
	const [satisfactionText, setSatisfactionText] = useState("Please select a rating.");
	const [alreadyRated, setAlreadyRated] = useState(false);

	const handleOpen = async () => {
		try {
			const { data } = await api.get(`/api/check-rating/${customerId}/${userData.id}/`);
			setAlreadyRated(data.alreadyRated);
		} catch (error) {
			console.error("Error checking rating status:", error);
		}
		setOpen(true);
	};

	const handleClose = () => setOpen(false);

	const handleSubmit = async () => {
		if (rating !== null) {
			try {
				await api.post(`/api/rate-customer/${customerId}/${userData.id}/`, { points: rating });
				alert("Your rating has been submitted successfully!");
				handleClose();
			} catch (error) {
				console.error("Error submitting rating:", error);
				alert("Failed to submit rating. Please try again later.");
			}
		} else {
			alert("Please select a rating before submitting!");
		}
	};

	const getSatisfactionText = (rating) => {
		switch (rating) {
			case 1:
				return "Very Dissatisfied";
			case 2:
				return "Dissatisfied";
			case 3:
				return "Neutral";
			case 4:
				return "Satisfied";
			case 5:
				return "Very Satisfied";
			default:
				return "Please select a rating.";
		}
	};

	const handleRatingChange = (event, newValue) => {
		setRating(newValue);
		setSatisfactionText(getSatisfactionText(newValue));
	};

	return (
		<div>
			<button
				onClick={handleOpen}
				className="flex flex-col items-center">
				<ThumbsUpDownOutlinedIcon fontSize="small text-blue-600"/>
				<p className="text-[10px] text-blue-600">Rate</p>
			</button>
			<Modal
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
						<Typography
							id="transition-modal-title"
							variant="h6"
							component="h2">
							Rate {customerName}
						</Typography>
						<Typography
							id="transition-modal-description"
							sx={{ mb: 2, fontSize: 12 }}>
							{alreadyRated ? (
								<p className="text-red-400 font-bold mt-2 text-lg">You have already rated this Customer.</p>
							) : (
								<>
									<p>Please share your experience with the Customer!</p>
									<p className="text-orange-400 font-bold">To avoid Bias ranking, you can only rate the Customer once.</p>
								</>
							)}
						</Typography>
						<Rating
							name="owner-rating"
							value={rating}
							onChange={handleRatingChange}
							disabled={alreadyRated}
						/>
						{alreadyRated ? (
							<></>
						) : (
							<>
								<p>{satisfactionText}</p>
							</>
						)}

						<Box sx={{ mt: 2, textAlign: "right" }}>
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								disabled={alreadyRated}>
								Submit
							</Button>
						</Box>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
