/* eslint-disable react/prop-types */ import { faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ProfileDetails(props) {
	const { email, mobile_number, loading } = props;

	return (
		<div className="p-2 w-fit">
			<div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow-2xl sm:p-8 mt-14">
				<h5 className="mb-2 text-xl font-bold text-gray-900">Personal Details</h5>
				<p className="mb-5 text-base text-gray-500 sm:text-lg">
					Be vigilant and protect yourself from scams. Never share your personal information.
				</p>
				<div className="items-center justify-center flex flex-row">
					<div className="w-full mx-1 focus:ring-4 focus:outline-none focus:ring-blue-300 text-gray-700 rounded-lg inline-flex items-center justify-center px-4 py-2.5">
						<FontAwesomeIcon
							icon={faPhone}
							className="mr-1"
						/>
						<div className="text-left rtl:text-right">
							{loading ? (
								<div className="h-2 bg-blue-200 rounded-full animate-pulse w-[100px]"></div>
							) : (
								<p className="font-sans text-[10px] font-semibold">{mobile_number}</p>
							)}
						</div>
					</div>
					<div>|</div>
					<div className="w-full mx-1 focus:ring-4 focus:outline-none focus:ring-blue-300 text-gray-700 rounded-lg inline-flex items-center justify-center px-4 py-2.5">
						<FontAwesomeIcon
							icon={faMailBulk}
							className="mr-1"
						/>
						<div className="text-left rtl:text-right">
							{loading ? (
								<div className="h-2 bg-blue-200 rounded-full animate-pulse w-[100px]"></div>
							) : (
								<p className="font-sans text-[10px] font-semibold">{email}</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileDetails;
