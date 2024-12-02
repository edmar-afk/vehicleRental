/* eslint-disable react/no-unescaped-entities */import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for React Router v6
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Header() {
	const navigate = useNavigate(); // Initialize useNavigate

	const handleGoBack = () => {
		navigate(-1); // This will redirect to the last visited URL
	};

	return (
		<>
			<div className="bg-blue-800/80 backdrop-blur-md px-4 sticky top-0 py-6 flex flex-row items-center justify-between">
				<p className="text-white font-bold">sample's Rental Post</p>
				<ArrowBackIosIcon
					className="text-white cursor-pointer"
					onClick={handleGoBack}
				/>
			</div>
		</>
	);
}

export default Header;
