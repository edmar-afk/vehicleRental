import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import api from "../../assets/api"; // Ensure this is properly configured.
import userIcon from "../../assets/img/user-icon.png";
function Comments() {
	const { postId } = useParams(); // Extract postId from the URL
	const userData = JSON.parse(localStorage.getItem("userData")); // Get logged-in user data
	const [comment, setComment] = useState(""); // State for the input field
	const [comments, setComments] = useState([]); // State for managing the list of comments
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [profilePicture, setProfilePicture] = useState(""); // State for the profile picture

	// Fetch comments and profile picture when the component mounts
	useEffect(() => {
		const fetchCommentsAndProfile = async () => {
			try {
				// Fetch comments for the post
				const commentsResponse = await api.get(`/api/comments/${postId}/`);
				setComments(commentsResponse.data);

				// Fetch profile picture of the logged-in user
				const profileResponse = await api.get(`/api/profile/${userData.id}/`);
				setProfilePicture(profileResponse.data.profile_pic); // Now this will hold the full URL to the profile image
			} catch (error) {
				console.error("Error fetching comments or profile picture:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchCommentsAndProfile();
	}, [postId, userData.id]);

	// Handle form submission for posting a new comment
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!comment.trim()) return; // Prevent empty comments

		try {
			const response = await api.post(`/api/comments/${userData.id}/${postId}/`, {
				content: comment,
			});
			setComments((prevComments) => [response.data, ...prevComments]); // Add new comment to the list
			setComment(""); // Clear the input field
		} catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	return (
		<>
			<section className="w-full p-4 my-8 mx-auto max-w-xl mb-44 mt-2">
				<h3 className="font-semibold text-sm">Comments</h3>

				{/* Loading Indicator */}
				{loading ? (
					<p>Loading comments...</p>
				) : (
					<>
						{/* Display comments */}
						{comments.length > 0 ? (
							comments.map((comment, index) => (
								<div
									key={index}
									className="flex mt-4">
									<div className="w-9 h-9 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
										<img
											className="w-full rounded-full object-cover"
											src={profilePicture || userIcon} // Use fetched profile picture or placeholder
											alt="User Profile"
										/>
									</div>
									<div className="ml-3">
										<div className="font-semibold text-blue-800">
											{comment.commentor.first_name || "Unknown User"} {/* Update based on API */}
										</div>
										<div className="text-gray-600 text-xs">{new Date(comment.date_commented).toLocaleString()}</div>
										<div className="mt-2 text-gray-800 text-sm">{comment.content}</div>
									</div>
								</div>
							))
						) : (
							<p className="text-gray-600 text-sm">No comments yet. Be the first to comment!</p>
						)}
					</>
				)}

				{/* Comment input form */}
				<form
					onSubmit={handleSubmit}
					className="fixed bottom-0 left-0 flex flex-row items-center gap-4 p-2 bg-gray-100 rounded-lg shadow-md z-[9999] w-full">
					<div className="flex-grow">
						<input
							type="text"
							id="comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder="Write your comment..."
							className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none"
						/>
					</div>
					<button
						type="submit"
						className="h-12 px-4 flex items-center justify-center bg-blue-700 text-white font-medium rounded-lg shadow hover:bg-blue-800 focus:ring-2 focus:ring-blue-400">
						<SendIcon />
					</button>
				</form>
			</section>
		</>
	);
}

export default Comments;
