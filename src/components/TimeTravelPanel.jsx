import React from 'react';

export default function TimeTravelPanel({ mockDate, onDateChange, onReset, isTimeTravelActive }) {
  return (
    <div className={`time-travel-panel ${isTimeTravelActive ? 'temporal-active' : ''}`}>
      <div className="panel-header">
        <span className="pulse-light"></span>
        <h3>Recruiter Sandbox: Time Travel Mode</h3>
      </div>
      <p>Simulate a target date to verify backend constraint lock logic instantly:</p>
      <p>The Birthday Countdown starts at October 22nd</p>
      
      <div className="panel-controls">
        <input 
          type="date" 
          value={mockDate} 
          onChange={(e) => {
            const val = e.target.value;
            if(val) {
              onDateChange(val);
            }else{
              onReset();
            }
            }}
           
          className="date-picker"
        />
        {isTimeTravelActive && (
          <button onClick={onReset} className="btn-reset">
            Reset to Real Today
          </button>
        )}
      </div>
      {isTimeTravelActive && (
        <div className="status-banner">Temporal Override Active: Syncing with Java Server</div>
      )}
    </div>
  );
}
