import React, { useState, useEffect } from 'react';

export default function WalkingSprite() {
  const starFrames = [
    '/images/starOne.png',
    '/images/starTwo.png',
    '/images/starThree.png',
    '/images/starTwo.png' // Loop back to the middle frame for a smooth gait cycle
  ];

  const catFrames = [
    '/images/catOne.png',
    '/images/catTwo.png'
  ];

  const [starIndex, setStarIndex] = useState(0);
  const [starPosX, setStarPosX] = useState(0); // Horizontal position in percentage (0% to 90%)
  const [starDirection, setStarDirection] = useState(1); // 1 = Moving Right, -1 = Moving Left

  //cat
  const [catIndex, setCatIndex] = useState(0);
  const [catPosX, setCatPosX] = useState(60);
  const [catDirection, setCatDirection] = useState(-1);

  useEffect(() => {
    const starFrameInterval = setInterval(() => {
      setStarIndex((prevIndex) => (prevIndex + 1) % starFrames.length);
    }, 360); // Speed of the foot steps (360ms per frame)

    return () => clearInterval(starFrameInterval);
  }, []);

    useEffect(() => {
        const catFrameInterval = setInterval(() => {
            setCatIndex((prev) => (prev == 0 ? 1 : 0));
        }, 450);
        return () => clearInterval(catFrameInterval);
    }, []);

  useEffect(() => {
    const starMoveInterval = setInterval(() => {
      setStarPosX((prevX) => {
        let nextX = prevX + 0.5 * starDirection;

        // Bounce mechanics: If the character reaches the screen edges, flip horizontal path!
        if (nextX >= 90) {
          setStarDirection(-1);
          return 90;
        }
        if (nextX <= 0) {
          setStarDirection(1);
          return 0;
        }
        return nextX;
      });
    }, 30); // Game tick rate (updates coordinates smoothly every 30ms)

    return () => clearInterval(starMoveInterval);
  }, [starDirection]);

   useEffect(() => {
    const catMoveInterval = setInterval(() => {
      setCatPosX((prevX) => {
        let nextX = prevX + 0.5 * catDirection;

        // Bounce mechanics: If the character reaches the screen edges, flip horizontal path!
        if (nextX >= 90) {
          setCatDirection(-1);
          return 88;
        }
        if (nextX <= 0) {
          setCatDirection(1);
          return 2;
        }
        return nextX;
      });
    }, 40); 

    return () => clearInterval(catMoveInterval);
  }, [catDirection]);

  return (
    <>
    <div 
      className="sprite-star-container"
      style={{
        position: 'absolute',
        top: '20px',
        left: `${starPosX}%`,
        transform: `scaleX(${starDirection * -1})`, // Flips your image horizontally based on movement path!
        transition: 'transform 0.1s ease',
        zIndex: 1000
      }}
    >
      <img 
        src={starFrames[starIndex]} 
        alt="Walking Star" 
        className="pixel-star"
      />
    </div>
    <div 
        className="sprite-cat-container"
        style={{
          position: 'absolute',
          bottom: '22px', // Slightly altered baseline offset
          left: `${catPosX}%`,
          transform: `scaleX(${catDirection})`, // Flips cat image based on cat's own path direction
          transition: 'transform 0.1s ease',
          zIndex: 999
        }}
      >
        <img 
          src={catFrames[catIndex]} 
          alt="Wandering Cat" 
          className="pixel-cat"
        />
      </div>
      </>
  );
}
