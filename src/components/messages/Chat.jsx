import Greetings from "./Greetings";import logo from '../../assets/img/logo.png'
function Chat() {
	return (
		<>
			<section className="flex flex-col justify-center antialiased bg-white h-screen pt-2">
				<Greetings />
				<div className="h-full">
					<div className="relative w-full mx-auto">
						<div className="py-3 px-5">
							<h3 className="text-xs font-semibold uppercase text-gray-600 mb-1">Chats</h3>

							<div className="divide-y divide-gray-200">
								<button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
									<div className="flex items-center">
										<img
											className="rounded-full items-start flex-shrink-0 mr-3"
											src={logo}
											width="32"
											height="32"
											alt="Marie Zulfikar"
										/>
										<div>
											<h4 className="text-sm font-semibold text-gray-900">VRM</h4>
											<div className="text-[13px]">Hello my friend · Aug 19, 2024, 11:49:18 p.m.</div>
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
