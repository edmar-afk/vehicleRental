/* eslint-disable react/prop-types */ import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../assets/api";
import { Person } from "@mui/icons-material"; // Import the Material-UI icon

function ChatBubble({ first_name, content, time_sent, id }) {
	const [profilePic, setProfilePic] = useState("");

	useEffect(() => {
		const fetchProfilePic = async () => {
			try {
				const response = await api.get(`/api/profile/${id}/`);
				setProfilePic(response.data.profile_pic || null); // Ensure null if no profile_pic
			} catch (error) {
				console.error("Error fetching profile picture:", error);
				setProfilePic(null); // Set to null on error
			}
		};

		fetchProfilePic();
	}, [id]);

	return (
		<Link
			to={`/room/${id}`}
			className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
			<div className="flex items-center">
				{profilePic ? (
					<img
						className="rounded-full items-start flex-shrink-0 mr-3 w-8 h-8"
						src={profilePic}
						alt={first_name}
					/>
				) : (
					<Person
						className="rounded-full items-start flex-shrink-0 mr-3 w-8 h-8 text-blue-400"
						style={{ fontSize: "32px" }}
					/>
				)}
				<div>
					<h4 className="text-sm font-semibold text-gray-900">{first_name}</h4>
					<div className="text-[13px]">
						{content} · {time_sent}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default ChatBubble;
