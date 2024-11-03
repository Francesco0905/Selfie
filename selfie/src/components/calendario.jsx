import React, { useState, useEffect } from 'react';
import './calendario.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AggiungiEvento from './AggiungiEvento';
import Note from './note';

const Calendario = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [showTextModal, setShowTextModal] = useState(false);
  const [eventData, setEventData] = useState({
    date: '',
    title: '',
    starttime: '',
    endtime: '',
    description: ''
  });

  const [textData, setTextData] = useState({ text: '' });

  /* dichiaro il giorno corrente */
  const isToday = (day) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const monthNames = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  const dayNames = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  useEffect(() => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year) || 7;
    const blankDays = Array(firstDayOfMonth - 1).fill(null);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays([...blankDays, ...monthDays]);
  }, [month, year]);

  const changeMonth = (direction) => {
    if (direction === 'prev') {
      setMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (month === 0) setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if (month === 11) setYear((prev) => prev + 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const submitEvent = (e) => {
    e.preventDefault();
    console.log('Dati evento:', eventData);
    setShowModal(false); // chiude il modal dopo l'invio
  };

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    setTextData({ ...textData, [name]: value });
  };
  
  const submitText = (e) => {
    e.preventDefault();
    console.log('Dati testo:', textData);
    setShowTextModal(false); // chiude il pop-up dopo l'invio
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">

        <button className="btn btn-warning add-text-btn" onClick={() => setShowTextModal(true)}> 
        <i className="bi bi-card-text"></i>
        </button>

        <button className="btn btn-outline-primary" onClick={() => changeMonth('prev')}>
        <i class="bi bi-arrow-left"></i>
        </button>

        <h2>{monthNames[month]} {year}</h2>

        <button className="btn btn-outline-primary" onClick={() => changeMonth('next')}>
        <i class="bi bi-arrow-right"></i>
        </button>

        <button className="btn btn-primary add-event-btn" onClick={() => setShowModal(true)}> 
        <i class="bi bi-calendar-event"></i>        </button>
      </div>

      <div className="calendar-grid">
        {dayNames.map((day) => (
          <div className="calendar-day-name" key={day}>{day}</div>
        ))}

        {/* cambio il className per identificare il div contenente la data odierna  */}
        {days.map((day, index) => (
          <div key={index} className={`calendar-day ${day ? (isToday(day) ? 'calendar-day-today' : '') : 'empty'}`}> 
            {day}
          </div>
        ))}
      </div>
      
      <Note 
        show={showTextModal} 
        onClose={() => setShowTextModal(false)} 
        onSubmit={submitText} 
        textData={textData} 
        handleInputChange={handleTextInputChange} 
      />

      <AggiungiEvento 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        onSubmit={submitEvent} 
        eventData={eventData} 
        handleInputChange={handleInputChange} 
      />
    </div>
  );
};

export default Calendario;
