import React, { useState, useEffect } from 'react';
import './calendario.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap

const Calendario = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState([]);
  const [showModal, setShowModal] = useState(false); // Stato per mostrare/nascondere il modal
  const [eventData, setEventData] = useState({
    day: '',
    month: '',
    year: '',
    title: '',
    time: '',
    description: ''
  });

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
    setShowModal(false); // Chiudi il modal dopo l'invio
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="btn btn-outline-primary" onClick={() => changeMonth('prev')}>Mese precedente</button>
        <h2>{monthNames[month]} {year}</h2>

        <button 
          className="btn btn-success add-event-btn" 
          onClick={() => setShowModal(true)}
        >
          Aggiungi evento
        </button>

        <button className="btn btn-outline-primary" onClick={() => changeMonth('next')}>Mese successivo</button>

        
      </div>

      <div className="calendar-grid">
        {dayNames.map((day) => (
          <div className="calendar-day-name" key={day}>{day}</div>
        ))}

        {days.map((day, index) => (
          <div key={index} className={`calendar-day ${day ? '' : 'empty'}`}>
            {day}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Inserisci un nuovo evento</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={submitEvent}>
                  <div className="form-group">
                    <label>Giorno</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="day" 
                      value={eventData.day} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Mese</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="month" 
                      value={eventData.month} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Anno</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      name="year" 
                      value={eventData.year} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Titolo dell'evento</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="title" 
                      value={eventData.title} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Ora</label>
                    <input 
                      type="time" 
                      className="form-control" 
                      name="time" 
                      value={eventData.time} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Descrizione</label>
                    <textarea 
                      className="form-control" 
                      name="description" 
                      value={eventData.description} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Salva evento</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendario;
