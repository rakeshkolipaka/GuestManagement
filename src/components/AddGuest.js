import React, { useState } from "react";

function AddGuest({ AddNewGuest, closePopup }) {
	const [name, setName] = useState("");
    const [email, setEmail] = useState("");
	const addUser = () => {
		
		//e.preventDefault();
		if (!name) return;
        if (!email) return;
        AddNewGuest(name, email);
	};
	
	return (
		<form>
			<div style={{width:"100%", textAlign: "center", marginBottom: "10px"}}>
                <input
                    type="text"
                    className="input"
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                />
            </div>
            <div style={{width:"100%", textAlign: "center", marginBottom: "10px"}}>
                <input
                    type="email"
                    className="input"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div style={{width:"100%", textAlign: "center", marginBottom: "10px"}}>
                <button onClick={() => addUser()}>Submit</button>
                <button onClick={() => closePopup()}>Close</button>
            </div>
		</form>
	);
}

export default AddGuest;