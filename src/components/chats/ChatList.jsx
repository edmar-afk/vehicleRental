import { useEffect, useState } from "react";import ChatBubble from "./ChatBubble";

import api from "../../assets/api";

function ChatList() {
	const [conversations, setConversations] = useState([]);

	const [error, setError] = useState(null);
	const currentUser = JSON.parse(localStorage.getItem("userData")) || null;

	// Check if the user is logged in before accessing currentUser.id
	const userId = currentUser ? currentUser.id : null;
	console.log(conversations);

	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const response = await api.get(`/api/my-chat-rooms/`);
				setConversations(response.data); // Set all conversations for the logged-in user
			} catch (error) {
				setError("Failed to load conversations");
			}
		};

		if (userId) {
			// Fetch conversations immediately when the component mounts
			fetchConversations();

			// Set up the interval to fetch conversations every 5 seconds
			const intervalId = setInterval(fetchConversations, 5000);

			// Clean up the interval when the component unmounts
			return () => clearInterval(intervalId);
		}
	}, [userId]);

	

	if (error) {
		return <p>{error}</p>;
	}

	// Function to format timestamp
	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);
		const optionsDate = { month: "short", day: "numeric", year: "numeric" };
		const optionsTime = { hour: "2-digit", minute: "2-digit" };
		const formattedDate = date.toLocaleDateString("en-US", optionsDate);
		const formattedTime = date.toLocaleTimeString("en-US", optionsTime);
		return `${formattedDate} - ${formattedTime}`;
	};

	// Sort conversations by timestamp in descending order
	const sortedConversations = [...conversations].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

	return (
		<section className="flex flex-col justify-center antialiased text-gray-600">
			<div className="h-full">
				<div className="relative w-full">
					

					{currentUser ? (
						<div className="py-3">
							<h3 className="text-xs font-semibold uppercase text-gray-400 mb-1 mt-8">Your recent Chats</h3>

							<div className="divide-y divide-gray-200">
								{sortedConversations.map((conversation) => (
									<div
										key={conversation.id}
										className="flex justify-between items-center p-2">
										<div>
											{conversation.other_users.map((user) => (
												<div key={user.id}>
													<ChatBubble
														roomId={conversation.id}
														first_name={user.first_name} // Display the first name of the other user
														content={conversation.latest_message} // Display the latest message
														time_sent={formatTimestamp(conversation.timestamp)} // Format timestamp
														id={user.id} // Other user's ID
														img={user.profile_pic}
													/>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					) : (
						<p>Please Login</p>
					)}
				</div>
			</div>
		</section>
	);
}

export default ChatList;
