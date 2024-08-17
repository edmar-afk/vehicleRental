import { useState } from "react";import { faImage } from "@fortawesome/free-solid-svg-icons";import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Info() {
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const fileType = file.type.split("/")[1];
			if (fileType === "jpeg" || fileType === "jpg" || fileType === "png") {
				setError("");
				const reader = new FileReader();
				reader.onloadend = () => {
					setImage(reader.result);
				};
				reader.readAsDataURL(file);
			} else {
				setError("Please upload a valid image file (jpg, jpeg, or png).");
				setImage(null);
			}
		}
	};

	return (
		<>
			<div className="bg-white h-screen w-full fixed -z-50"></div>
			<div className="text-gray-700 mb-44">
				<div className="flex items-center justify-center">
					<div className="mx-auto w-full max-w-[550px]pt-24">
						<form className="py-4 px-9">
							<div className="mb-6 pt-4">
								<label className="mb-5 block text-xl font-semibold text-[#07074D]">Upload Image:</label>
								<div className="mb-8">
									<input
										type="file"
										name="file"
										id="file"
										className="sr-only"
										onChange={handleFileChange}
									/>
									<label
										htmlFor="file"
										className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
										{image ? (
											<img
												src={image}
												alt="Uploaded Preview"
												className="object-cover w-full h-full"
											/>
										) : (
											<div>
												<FontAwesomeIcon
													icon={faImage}
													className="text-6xl text-gray-500"
												/>
												<span className="mb-2 block text-xs mt-2 font-semibold text-gray-500">
													Accepts jpg, jpeg, and png
												</span>
											</div>
										)}
									</label>
									{error && <p className="text-red-500 mt-2">{error}</p>}
								</div>
							</div>
							<div className="mb-5">
								<label
									htmlFor="address"
									className="mb-3 block text-base font-medium text-[#07074D]">
									Address:
								</label>
								<input
									type="text"
									name="address"
									id="address"
									placeholder="Pob. Guipos ZDS"
									className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
								/>
							</div>

							<div className="mb-5">
								<label
									htmlFor="description"
									className="mb-3 block text-base font-medium text-[#07074D]">
									Description
								</label>
								<textarea
									name="description"
									id="description"
									placeholder="What's on your mind?"
									className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
								/>
							</div>
							<div>
								<button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
									Post Vehicle Rent
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default Info;
