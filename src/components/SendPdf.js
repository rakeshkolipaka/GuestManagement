import React, { useState } from "react";

function SendPdf({ guestDetailsToSendPdf, sendPdf, closeSendPdfPopup }) {
	const [email, setEmail] = useState("");
	const sendEmail = e => {
		e.preventDefault();
        if (!email) {
            sendPdf(e);
        }
        else{
            sendPdf(e);
        }
	};
	
	return (
		<form onSubmit={sendEmail} noValidate>
            <h2 style={{marginTop: "0px", borderBottom: "2px solid #337ab7"}}>Send PDF</h2>
            <div style={{width:"100%", textAlign: "center", marginBottom: "10px"}}>
                <input
                    type="text"
                    className="input"
                    name="name"
                    value={guestDetailsToSendPdf.name}
                    placeholder="Name"
                />
            </div>
            <div style={{width:"100%", textAlign: "center", marginBottom: "10px"}}>
                <input
                    type="text"
                    className="input"
                    name="profession"
                    value={guestDetailsToSendPdf.profession}
                    placeholder="Profession"
                />
            </div>
			<div style={{width:"100%", textAlign: "center", marginBottom: "20px"}}>
                <input
                    type="email"
                    className="input"
                    name="email"
                    defaultValue={guestDetailsToSendPdf.email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div style={{width:"100%", textAlign: "center"}}>
                <button type="submit" className="modalButton">Send</button>
                <button onClick={() => closeSendPdfPopup()} className="modalButton">Close</button>
            </div>
		</form>
	);
}

export default SendPdf;