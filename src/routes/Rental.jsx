import Info from "../components/favorites/Info";import favIcon from "../assets/svg/FavoriteIcon.svg";function Rental() {
	return (
		<>
			<div className="relative bg-white rounded-b-2xl shadow-xl">
				<div className="relative pb-32">
					<img
						src={favIcon}
						className="w-56 absolute right-8"
						alt=""
					/>
				</div>
				<div className=" pb-8">
					<p className="pt-14 font-bold text-2xl ml-4 z-50 relative">My Favorites</p>
					<p className="ml-4 text-xs text-black">Keep all your top car rentals in one place for easy access. </p>
				</div>
			</div>
			<Info />
			<div className="mb-24"></div>
		</>
	);
}

export default Rental;
