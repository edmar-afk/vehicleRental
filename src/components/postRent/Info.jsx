import { useState } from "react";import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import api from "../../assets/api";
function Info() {
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");
	const [address, setAddress] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const fileType = file.type.split("/")[1];
			if (fileType === "jpeg" || fileType === "jpg" || fileType === "png") {
				setError("");
				const reader = new FileReader();
				reader.onloadend = () => {
					setImage(file); // Store the file itself
				};
				reader.readAsDataURL(file);
			} else {
				setError("Please upload a valid image file (jpg, jpeg, or png).");
				setImage(null);
			}
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append("images", image);
		formData.append("location", address);
		formData.append("description", description);

		try {
			const response = await api.post("/api/createRental/", formData);
			console.log(response.data);

			// Show success alert
			Swal.fire({
				title: "Success!",
				text: "Your rental post has been successfully created.",
				icon: "success",
				confirmButtonText: "OK",
			});

			// Optionally, reset the form or navigate to another page
			setImage(null);
			setAddress("");
			setDescription("");
		} catch (error) {
			console.error("There was an error submitting the form!", error);
			// Optionally, handle errors (e.g., show an error message)
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="bg-white h-screen w-full fixed -z-50"></div>
			<div className="text-gray-700 mb-44">
				<p className="pt-14 font-bold text-2xl ml-4">Post a Rent</p>
				<p className="ml-4 text-xs">Additional designs on capstone 2</p>
				<div className="flex items-center justify-center">
					<div className="mx-auto w-full max-w-[550px] pt-24">
						<form
							className="py-4 px-9"
							onSubmit={handleSubmit}>
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
												src={URL.createObjectURL(image)}
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
									className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
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
									className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-600 focus:shadow-md"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>
							<div>
								<button
									className="hover:shadow-form w-full rounded-md bg-blue-600 py-3 px-8 text-center text-base font-semibold text-white outline-none"
									disabled={loading}>
									{loading ? "Posting..." : "Post Vehicle Rent"}
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
