/* eslint-disable react/prop-types */
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

function Sender({ message }) {
	return (
		<>
			<div className="w-full mb-4 flex flex-row justify-end">
				<div className="flex flex-col items-end justify-end">
					<div className="w-max max-w-[300px] px-4 py-2 rounded-2xl rounded-br-none bg-purple-700 text-white break-all">
						{message.content}
					</div>
					<div className="text-[9px] text-gray-500 ml-12">{formatDate(message.timestamp)}</div>
				</div>
			</div>
		</>
	);
}

export default Sender;
