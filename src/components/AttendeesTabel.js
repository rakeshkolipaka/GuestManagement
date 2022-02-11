import React from "react";
import { BsCheck2 } from "react-icons/bs";
import { BsChatSquareText } from "react-icons/bs";

function AttendeesTabel({ attendee, index, currentStatus, sendPdf }) {
	return (
		<div
			className="attendeesTabel"
			style={{borderLeft: attendee.isEntered? "10px solid #6c757d" : "10px solid #28a745"}}
		>
			{attendee.name}
			

			<div>
				<button style={{display: attendee.isEntered? "none": "block", backgroundColor: "#28a745"}} onClick={() => currentStatus(index)}><BsCheck2/>  Here</button>
				<button style={{display: attendee.isEntered? "block": "none", backgroundColor: "#6c757d"}} onClick={() => sendPdf(index)}><BsChatSquareText/>  Send PDF</button>
			</div>
		</div>
	);
}

export default AttendeesTabel;