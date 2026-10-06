import React, { useState, useEffect } from 'react';
import TimeTravelPanel from './components/TimeTravelPanel';
import CalendarGrid from './components/CalendarGrid';
import WalkingSprite from './components/WalkingSprite';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';


export default function App() {
  const [unlockedUpToDay, setUnlockedUpToDay] = useState(0);
  const [mockDate, setMockDate] = useState('');
  const [isTimeTravelActive, setIsTimeTravelActive] = useState(false);

  // Core API fetch link connecting to running local Spring Boot backend
  const fetchCalendarStatus = (selectedDate) => {
   // let url = 'http://localhost:8080/api/calendar/status';
    let url = `${API_BASE}/api/calendar/status`;
    
    // If a custom date is picked, append it as an API query string parameter
    if (selectedDate) {
      url += `?mockDate=${selectedDate}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('Network status evaluation failed');
        return response.json();
      })
      .then((data) => {
        setUnlockedUpToDay(data.unlockedUpToDay);
        setIsTimeTravelActive(data.timeTravelActive);
      })
      .catch((error) => console.error('Connection Error pointing to Spring Boot backend:', error));
  };

  // Trigger state evaluation immediately on window load
  useEffect(() => {
    fetchCalendarStatus();
  }, []);

  const handleDateChange = (newDate) => {
    setMockDate(newDate);
    fetchCalendarStatus(newDate); 
  };

  const handleReset = () => {
    setMockDate('');
    fetchCalendarStatus(''); 
  };

  const handleDayClick = (dayNumber) => {
   // let detailsUrl = `http://localhost:8080/api/calendar/day/${dayNumber}`;
    let detailsUrl = `${API_BASE}/api/calendar/day/${dayNumber}`;
    if (mockDate) detailsUrl += `?mockDate=${mockDate}`;

    fetch(detailsUrl)
      .then((res) => {
        if (res.status === 403) {
          alert('Security Access Denied: Server reports this day is locked!');
          throw new Error('Day is locked');
        }
        if (res.status === 404) {
          alert('Database Alert: This data row does not exist in the tables yet!');
          throw new Error('Day not found');
        }
        if(!res.ok) throw new Error('Server connection anomaly');
        return res.json();
      })
      .then((data) => {
        if (data && data.minigameUrl) {

          const userConfirmed = window.confirm(
            `You are opening Day ${dayNumber}! You will be redirected to an external mini-game hosted on itch.io. Do you want to proceed?`
          );
          if(userConfirmed){
             window.open(data.minigameUrl, '_blank', 'noopener,noreferrer');
          }else{
            console.log("Redirect canceled by user due to privacy notice.");
          }
         
        }else{
          alert('Data Error: This day entry exists, minigame_url is blank in MySQL');
        }
      })
      .catch((err) => console.warn('Navigation pipeline halted:', err.message));
  };

  return (
    <div className="app-portal">
      <header className="portal-header">
        
        <h1><img src="/images/pumpkin.png" /> Birthday Countdown <img src="/images/pumpkin.png" /></h1>
        <p>Unlock today's door!</p>
      </header>

      <main className="portal-content">
        <WalkingSprite />
        {/* Render the Recruiter Sandbox panel */}
        <TimeTravelPanel 
          mockDate={mockDate}
          onDateChange={handleDateChange}
          onReset={handleReset}
          isTimeTravelActive={isTimeTravelActive}
        />

        {/* Render the dynamic 10 button grid interaction node */}
        <CalendarGrid 
          unlockedUpToDay={unlockedUpToDay}
          onDayClick={handleDayClick}
        />
      </main>
    </div>
  );
}
