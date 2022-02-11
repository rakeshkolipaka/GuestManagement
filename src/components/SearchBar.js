import React, { useState } from "react";

function SearchBar({ filterList }) {
	const [value, setValue] = useState("");
	
	const handleSubmit = e => {
		
		e.preventDefault();
		if (!value) return;
		filterList(value);
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				className="input"
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder="Search"
			/>
		</form>
	);
}

export default SearchBar;