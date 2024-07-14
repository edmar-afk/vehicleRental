import backgroundProfile from "../../assets/img/backgroundProfile.jpg";
function BackgroundProfile() {
	return (
		<div className="relative bg-red-400 -z-20 h-fit">
			<div className="inset-0 absolute w-full mx-auto top-0">
				<img
					src={backgroundProfile}
					className="w-full shadow-2xl"
					draggable="false"
					alt=""
				/>
			</div>
		</div>
	);
}

export default BackgroundProfile;
