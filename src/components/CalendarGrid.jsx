import React from 'react';

export default function CalendarGrid({ unlockedUpToDay, onDayClick }) {
  // Generate an array containing exactly 10 day indexes [1, 2, 3, ... 10]
  const daysArray = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="calendar-grid">
      {daysArray.map((dayNum) => {
        // Boolean check: Is this specific button allowed to be open?
        const isLocked = dayNum > unlockedUpToDay;

        return (
          <button
            key={dayNum}
              onClick={() => {
              if(isLocked) {
                alert(`Day ${dayNum} is still locked.Come back when it's time`);
              }else{
                onDayClick(dayNum);
              }
            }}
             
            className={`grid-box ${isLocked ? 'box-locked' : 'box-unlocked'}`}
          >
            <div className="box-number">Day {dayNum < 10 ? `0${dayNum}` : dayNum}</div>
            <div className="box-icon">
              {isLocked ? (
                <img src="/images/lockedDoor.png" alt="Locked" className="box-img" />
              ) : (
                <img src="/images/openedDoor.png" alt="Unlocked" className="box-img" />
              )}
            </div>
            <div className="box-status">{isLocked ? 'Locked' : 'Open Minigame'}</div>
          </button>
        );
      })}
    </div>
  );
}
