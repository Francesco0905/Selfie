import React, { useState } from 'react';
import './calendario.css';

const AggiungiEvento = ({ show, onClose, onSubmit, eventData, handleInputChange }) => {
  const [errorMessage, setErrorMessage] = useState('');

  if (!show) return null;

  const controlloTempo = () => {
    // Verifica se entrambi i campi orari hanno un valore
    if (eventData.starttime && eventData.endtime) {
      if (eventData.endtime <= eventData.starttime) {
        setErrorMessage("L'orario di fine deve essere successivo all'orario di inizio.");
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage(''); // Nessun errore se uno dei campi è ancora vuoto
    }
  };

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Inserisci un nuovo evento</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
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
                <label>Data</label>
                <input 
                  type="date" 
                  className="form-control" 
                  name="date" 
                  value={eventData.date} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Ora inizio</label>
                <input 
                  type="time" 
                  className="form-control" 
                  name="starttime" 
                  value={eventData.starttime} 
                  onChange={(e) => {
                    handleInputChange(e);
                    controlloTempo();
                  }} 
                  required                 />
              </div>
              <div className="form-group">
                <label>Ora fine</label>
                <input 
                  type="time" 
                  className="form-control" 
                  name="endtime" 
                  value={eventData.endtime} 
                  onChange={(e) => {
                    handleInputChange(e);
                    controlloTempo();
                  }} 
                  required 
                  />
                {errorMessage && <small className="text-danger">{errorMessage}</small>}              
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
  );
};

export default AggiungiEvento;
