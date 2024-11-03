import React from 'react';
import './calendario.css';

const Note = ({ show, onClose, onSubmit, textData, handleInputChange }) => {
  if (!show) return null;

  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Note</h5>
            <button type="button" className="close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <textarea 
                  className="form-control" 
                  name="text" 
                  value={textData.text} 
                  onChange={handleInputChange} 
                  placeholder="Inserisci il tuo testo qui..." 
                  required 
                  style={{ width: '100%', height: '350px' }}
                />
              </div>
              <button type="submit" className="btn btn-primary">Salva nota</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;