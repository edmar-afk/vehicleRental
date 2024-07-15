import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function FilterSearch() {
	return (
		<>
			<div className="relative z-50 shadow-2xl">
				<div className="fixed h-8 w-full bg-gray-300 top-0 shadow-2xl"></div>
				<div className="p-2 fixed top-0 w-full">
					<Paper
						component="form"
						sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="Search"
							inputProps={{ "aria-label": "Search" }}
						/>
						<IconButton
							type="button"
							sx={{ p: "10px" }}
							aria-label="search">
							<SearchIcon />
						</IconButton>
						<Divider
							sx={{ height: 28, m: 0.5 }}
							orientation="vertical"
						/>
					</Paper>
				</div>
			</div>
			<div className="mt-2 mb-2 w-full h-14 bg-gray-300"></div>
		</>
	);
}

export default FilterSearch;
