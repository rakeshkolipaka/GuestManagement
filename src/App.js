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

function App() {
  const [attendees, setAttendees] = useState([]);
  const [addGuestModalIsOpen,setAddGuestModalIsOpen] = useState(false);
  const [sendPdfModalIsOpen,setSendPdfModalIsOpen] = useState(false);
  const [guestDetailsToSendPdf,setGuestDetailsToSendPdf] = useState({});
  const [searched, setSearched] = useState("");
	useEffect(() => {
		getUpdatedList();
	}, []);
  const currentStatus = index => {
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

  const sendPdf = email => {
    setSendPdfModalIsOpenToFalse();
	};

  const filterList = value => {
	};

  const getUpdatedList =() =>{
    axios.get('https://61a304a7014e1900176dea86.mockapi.io/Attendees')
			.then(response => {
        const sorted = response.data.sort((a, b) => a.isEntered - b.isEntered);
        setAttendees(sorted);
        
        });
  };

  const addNewGuest = (name, email, profession) => {
    const article ={
      "name": name,
      "isEntered": true,
      "profession": profession,
      "email": email,
      "id": attendees.length+1
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

  const currentSearch = (searchInput) =>{
    const filteredData = attendees.filter((row) => { 
      return row.name.toLowerCase().includes(searchInput.toLowerCase()) 
    });
    setAttendees(filteredData);
  }

  const cancelSearch = ()=>{
    setSearched("");
    getUpdatedList();
  }

  let numOfSeatsLeft = 50-attendees.length;

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

  return (
    <div className="App">
      <Header 
				title="Guest Management" 
				logo={logo}
			/>
      <div className="attendeeGrid">
        <div className="title">
          Attendees
        </div>
        <div className="seatAvailability">
          Seats left: <span className="numOfSeats" style={{color: numOfSeatsLeft<20? "red":"#9693e6" }}>{numOfSeatsLeft}</span>
        </div>
        <div className="attendeesFilter">
          <div>
            <SearchBar
              value={searched}
              onChange={(searchInput)=>currentSearch(searchInput)}
              onCancelSearch={() => cancelSearch()}
              style={{
                margin: '0 auto',
                maxWidth: 800
              }}
            />
          </div>
          <div className="seatAvailability">
            <button style={{backgroundColor:"#337ab7"}} onClick={()=>setAddGuestModalIsOpenToTrue()}><BsPersonPlusFill/>  Add User</button>
            
          </div>
        </div>
        <div className="attendeeList">
                    {attendees.map((attendee, index) => (
                        <AttendeesTabel
                            key={index}
                            index={index}
                            attendee={attendee}
                            currentStatus={currentStatus}
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
