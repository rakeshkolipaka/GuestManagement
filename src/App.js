import React, { useState, useEffect } from "react";
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AttendeesTabel from './components/AttendeesTabel';
import AddGuest from './components/AddGuest';
import './App.css';
import axios from 'axios';
import logo from './conferenceLogo.png';
import { BsPersonPlusFill } from "react-icons/bs";
import Modal from 'react-modal';

function App() {
  const [attendees, setAttendees] = useState([]);
	const [logoInfo, setLogoInfo] = useState([]);
	const [user, setUser] = useState('');
	useEffect(() => {
		axios.get('https://61a304a7014e1900176dea86.mockapi.io/Attendees')
			.then(response => setAttendees(response.data));
	}, []);
  const currentStatus = index => {
	};

  const sendPdf = index => {
	};

  const filterList = value => {
	};

  const AddNewGuest = (name, email) => {
    const article ={
      "name": name,
      "isEntered": true,
      "profession": "Health Care",
      "email": email
    }
    useEffect(() => {
      axios.post('https://61a304a7014e1900176dea86.mockapi.io/Attendees', {
        "name": name,
        "isEntered": true,
        "profession": "Health Care",
        "email": email,
        "id": attendees.length+1
      })
        .then(response => {
          console.log(response);
          //setModalIsOpenToFalse();
        })
        .catch(error => {
          console.error('There was an error!', error);
      });
        
    }, []);
    
	};
  const closePopup = () => {
    setModalIsOpenToFalse();
	};

  const [modalIsOpen,setModalIsOpen] = useState(false);

  const setModalIsOpenToTrue =()=>{
      setModalIsOpen(true)
  }

  const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false)
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
          Seats left: <span className="numOfSeats" dangerouslySetInnerHTML={ { __html: numOfSeatsLeft} }></span>
        </div>
        <div className="attendeesFilter">
          <div style={{width: "49%"}}>
            <SearchBar className="searchBar" filterList={filterList}></SearchBar>
          </div>
          <div className="seatAvailability">
            <button style={{backgroundColor:"#337ab7"}} onClick={()=>setModalIsOpenToTrue()}><BsPersonPlusFill/>  Add User</button>
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <AddGuest 
                  AddNewGuest={AddNewGuest}
                  closePopup={closePopup}
                />
            </Modal>
          </div>
        </div>
        <div className="attendeeList">
                    {attendees.map((attendee, index) => (
                        <AttendeesTabel
                            key={index}
                            index={index}
                            attendee={attendee}
                            currentStatus={currentStatus}
                            sendPdf={sendPdf}
                        />
                    ))}
				</div>
      </div>
      
    </div>
  );
}

export default App;
