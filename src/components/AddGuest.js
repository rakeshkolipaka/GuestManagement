import React, { useState } from "react";

function AddGuest({ addNewGuest, closeAddGuestPopup }) {
	const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profession, setProfession] = useState("");
	const addUser = e => {
		
		e.preventDefault();
		if (!name) return;
        if (!email) return;
        if (!profession) return;
        addNewGuest(name, email, profession, e);
	};
	
	return (
		<form onSubmit={addUser} noValidate>
            <h2 style={{marginTop: "0px", borderBottom: "2px solid #337ab7"}}>Add Guest</h2>
			<div style={{width:"100%", textAlign: "center", marginBottom: "10px"}}>
                <input
                    type="text"
                    className="input"
                    name="name"
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                />
            </div>
            <div style={{width:"100%", textAlign: "center", marginBottom: "10px"}}>
                <input
                    type="email"
                    className="input"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div style={{width:"100%", textAlign: "center", marginBottom: "20px"}}>
                <input
                    type="text"
                    className="input"
                    name="profession"
                    onChange={e => setProfession(e.target.value)}
                    placeholder="Profession"
                />
            </div>
            <div style={{width:"100%", textAlign: "center"}}>
                <button type="submit" className="modalButton">Submit</button>
                <button onClick={() => closeAddGuestPopup()} className="modalButton">Close</button>
            </div>
		</form>
	);
}

export default AddGuest;