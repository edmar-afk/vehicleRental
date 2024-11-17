/* eslint-disable react/prop-types */import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../assets/api";
import { Person } from "@mui/icons-material"; // Import MUI icon

// Helper function to format the date
const formatDate = (dateString) => {
	const date = new Date(dateString);

	// Options for formatting
	const dateOptions = { month: "short", day: "numeric", year: "numeric" };
	const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

	// Format date and time
	const formattedDate = date.toLocaleDateString("en-US", dateOptions);
	const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

	return `${formattedDate} - ${formattedTime}`;
};

function Reciever({ message }) {
	const { receiverId } = useParams(); // Get the receiverId from URL parameters
	const [profilePic, setProfilePic] = useState(null); // State for the profile picture
	console.log('receiver data, profile pic: ', profilePic)
	useEffect(() => {
		// Fetch the profile picture for the receiver
		const fetchProfilePic = async () => {
			try {
				const response = await api.get(`/api/profile/${receiverId}/`);
				setProfilePic(response.data?.profile_pic || null); // Use null if no profile picture is provided
			} catch (error) {
				console.error("Error fetching profile picture:", error);
				setProfilePic(null); // Fall back to null on error
			}
		};

		fetchProfilePic();
	}, [receiverId]);

	return (
		<>
			<div className="w-full mb-4 flex flex-col">
				<div className="flex items-center justify-start">
					{/* Conditionally render profile picture or MUI Person icon */}
					{profilePic ? (
						<img
							src={profilePic}
							alt="Advisor"
							className="w-8 h-8 mr-2 rounded-full"
						/>
					) : (
						<Person
							className="w-8 h-8 mr-2 text-blue-400"
							style={{ fontSize: "28px" }}
						/>
					)}
					<div className="w-max max-w-sm px-4 py-2 rounded-full rounded-bl-none bg-gray-200 text-purple-700">
						{message.content}
					</div>
				</div>
				<div className="text-[9px] text-gray-500 ml-12">{formatDate(message.timestamp)}</div>
			</div>
		</>
	);
}

export default Reciever;
