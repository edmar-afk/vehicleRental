import Greetings from "./Greetings";

function Chat() {
	return (
		<>
            <section className="flex flex-col justify-center antialiased bg-white h-screen pt-4">
                <Greetings/>
				<div className="h-full">
					<div className="relative w-full mx-auto">
						<div className="py-3 px-5">
							<h3 className="text-xs font-semibold uppercase text-gray-600 mb-1">Chats</h3>

							<div className="divide-y divide-gray-200">
								<button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
									<div className="flex items-center">
										<img
											className="rounded-full items-start flex-shrink-0 mr-3"
											src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
											width="32"
											height="32"
											alt="Marie Zulfikar"
										/>
										<div>
											<h4 className="text-sm font-semibold text-gray-900">Marie Zulfikar</h4>
											<div className="text-[13px]">The video chat ended · 2hrs</div>
										</div>
									</div>
								</button>

								<button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
									<div className="flex items-center">
										<img
											className="rounded-full items-start flex-shrink-0 mr-3"
											src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-02_vll8uv.jpg"
											width="32"
											height="32"
											alt="Nhu Cassel"
										/>
										<div>
											<h4 className="text-sm font-semibold text-gray-900">Nhu Cassel</h4>
											<div className="text-[13px]">Hello Lauren 👋, · 24 Mar</div>
										</div>
									</div>
								</button>

								<button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
									<div className="flex items-center">
										<img
											className="rounded-full items-start flex-shrink-0 mr-3"
											src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-03_uzwykl.jpg"
											width="32"
											height="32"
											alt="Patrick Friedman"
										/>
										<div>
											<h4 className="text-sm font-semibold text-gray-900">Patrick Friedman</h4>
											<div className="text-[13px]">Yes, you’re right but… · 14 Mar</div>
										</div>
									</div>
								</button>

								<button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
									<div className="flex items-center">
										<img
											className="rounded-full items-start flex-shrink-0 mr-3"
											src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-04_ttlftd.jpg"
											width="32"
											height="32"
											alt="Byrne McKenzie"
										/>
										<div>
											<h4 className="text-sm font-semibold text-gray-900">Byrne McKenzie</h4>
											<div className="text-[13px]">Hey Lauren ✨, first of all… · 14 Mar</div>
										</div>
									</div>
								</button>

								<button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
									<div className="flex items-center">
										<img
											className="rounded-full items-start flex-shrink-0 mr-3"
											src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-05_bktgmb.jpg"
											width="32"
											height="32"
											alt="Scott Micheal"
										/>
										<div>
											<h4 className="text-sm font-semibold text-gray-900">Scott Micheal</h4>
											<div className="text-[13px]">No way 🤙! · 11 Mar</div>
										</div>
									</div>
								</button>
							</div>
						</div>

					</div>
				</div>
			</section>
		</>
	);
}

export default Chat;
