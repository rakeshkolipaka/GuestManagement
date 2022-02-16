import React, { useState, useEffect } from "react";
import Header from './components/Header';
import SearchBar from 'material-ui-search-bar';
import AttendeesTabel from './components/AttendeesTabel';
import AddGuest from './components/AddGuest';
import SendPdf from './components/SendPdf';
import './App.css';
import axios from 'axios';
import logo from './conferenceLogo.png';
import { BsPersonPlusFill } from "react-icons/bs";
import Modal from 'react-modal';
import emailjs from 'emailjs-com';

function App() {
  const [attendees, setAttendees] = useState([]);
  const [initialAttendeesList, setInitialAttendeesList] = useState([]);
  const [addGuestModalIsOpen,setAddGuestModalIsOpen] = useState(false);
  const [sendPdfModalIsOpen,setSendPdfModalIsOpen] = useState(false);
  const [guestDetailsToSendPdf,setGuestDetailsToSendPdf] = useState({});
  const [searched, setSearched] = useState("");

	useEffect(() => {
		getUpdatedList();
	}, []);

  // Change guest status
  const changeStatus = index => {
    setSendPdfModalIsOpenToTrue(index);

    const changeStatusArticle ={
      "name": attendees[index].name,
      "isEntered": true,
      "profession": attendees[index].profession,
      "email": attendees[index].email,
      "id": attendees[index].id
    };
    axios.put('https://61a304a7014e1900176dea86.mockapi.io/Attendees/'+attendees[index].id, changeStatusArticle)
      .then(response => {
        getUpdatedList();
      })
      .catch(error => {
        console.error('There was an error!', error);
    });
	};

  const sendPdf = e => {
    emailPdf(e);
    setSendPdfModalIsOpenToFalse();
	};

  //Email PDF
  const emailPdf = e =>{
    emailjs.sendForm('service_4rabwcv', 'template_cqieo8o', e.target, 'user_sopx2lhIME8hAh3ipiNbO')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
  }

  //Get updated guest list
  const getUpdatedList =() =>{
    axios.get('https://61a304a7014e1900176dea86.mockapi.io/Attendees')
			.then(response => {
        const sorted = response.data.sort((a, b) => a.isEntered - b.isEntered);
        setAttendees(sorted);
        setInitialAttendeesList(sorted);
        });
  };

  const addNewGuest = (name, email, profession, e) => {
    emailPdf(e);
    const article ={
      "name": name,
      "isEntered": true,
      "profession": profession,
      "email": email,
      "id": initialAttendeesList.length+1
    };
    axios.post('https://61a304a7014e1900176dea86.mockapi.io/Attendees', article)
      .then(response => {
        getUpdatedList();
        setAddGuestModalIsOpenToFalse();
      })
      .catch(error => {
        console.error('There was an error!', error);
    });
    
	};

  //Modal control starts
  const closeAddGuestPopup = () => {
    setAddGuestModalIsOpenToFalse();
	};

  const setAddGuestModalIsOpenToTrue =()=>{
    setAddGuestModalIsOpen(true)
  }

  const setAddGuestModalIsOpenToFalse =()=>{
    setAddGuestModalIsOpen(false)
  }

  const closeSendPdfPopup = () => {
    setSendPdfModalIsOpenToFalse();
	};

  const setSendPdfModalIsOpenToTrue = index =>{
    setGuestDetailsToSendPdf(attendees[index]);
    setSendPdfModalIsOpen(true)
  }

  const setSendPdfModalIsOpenToFalse =()=>{
    setSendPdfModalIsOpen(false)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  //Modal control ends

  //Filter guest gist starts
  const currentSearch = (searchInput) =>{
    const filteredData = initialAttendeesList.filter((row) => { 
      return row.name.toLowerCase().includes(searchInput.toLowerCase()) 
    });
    setAttendees(filteredData);
  }

  const cancelSearch = ()=>{
    setSearched("");
    getUpdatedList();
  }
  //Filter guest gist ends

  let numOfSeatsLeft = 50-initialAttendeesList.length;

  return (
    <div className="App">
      <Header 
				title="Guest Management" 
				logo={logo}
			/>
      <div className="attendeeGrid">
        <div className="tableTitle">
          Attendees
        </div>
        <div className="seatAvailability">
          Seats left: <span className="numOfSeats" style={{color: numOfSeatsLeft<20? "red":"#681fc3" }}>{numOfSeatsLeft}</span>
        </div>
        <div className="attendeesFilter">
          <div>
            <SearchBar
              value={searched}
              onChange={(searchInput)=>currentSearch(searchInput)}
              onCancelSearch={() => cancelSearch()}
            />
          </div>
          <div className="seatAvailability">
            <button style={{backgroundColor:"#337ab7"}} onClick={()=>setAddGuestModalIsOpenToTrue()}><BsPersonPlusFill/>  Add Guest</button>
            
          </div>
        </div>
        <div className="attendeeList">
                    {attendees.map((attendee, index) => (
                        <AttendeesTabel
                            key={index}
                            index={index}
                            attendee={attendee}
                            changeStatus={changeStatus}
                            setSendPdfModalIsOpenToTrue={setSendPdfModalIsOpenToTrue}
                        />
                    ))}
				</div>
      </div>
      <Modal isOpen={addGuestModalIsOpen} style={customStyles}>
          <AddGuest 
            addNewGuest={addNewGuest}
            closeAddGuestPopup={closeAddGuestPopup}
          />
      </Modal>
      <Modal isOpen={sendPdfModalIsOpen} style={customStyles}>
          <SendPdf 
            guestDetailsToSendPdf={guestDetailsToSendPdf}
            sendPdf={sendPdf}
            closeSendPdfPopup={closeSendPdfPopup}
          />
      </Modal>
    </div>
  );
}

export default App;
