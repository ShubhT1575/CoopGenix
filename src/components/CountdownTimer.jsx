import React, { useEffect, useState } from "react";

const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({});
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  if (Object.keys(timeLeft).length === 0) {
    return <div style={{ fontSize: "14px", color: "#999", textAlign: "center" }}></div>;
  }

  const containerStyle = {
    display: "flex",
    justifyContent: "center", // Centers the timer horizontally
    alignItems: "center", // Centers the timer vertically
    gap: "8px", // Adjust gap between time units
    padding: "6px 10px",
    background: "linear-gradient(135deg, #a4508b, #5f0a87)", // Purple gradient
    borderRadius: "8px",
    width: "fit-content", // Adjusts to content size
    whiteSpace: "nowrap",
    height: "45px", // Adjusted height
    fontFamily: "monospace",
    fontWeight: "bold",
    color: "#fff",
    margin: "20px auto", // Centers the timer within the container (top and bottom margin)
  };

  const timeUnitStyle = {
    display: "inline-block",
    padding: "4px 8px",
    textAlign: "center",
    fontSize: "14px", // Adjust font size if needed for better alignment
    lineHeight: "1.2",
  };

  const labelStyle = {
    display: "block",
    fontSize: "10px",
    marginTop: "2px",
    color: "#ddd",
    fontWeight: "normal",
  };

  return (
    <div style={containerStyle}>
      <div style={timeUnitStyle}>
        {timeLeft.days}
        <span style={labelStyle}>D</span>
      </div>
      <div style={timeUnitStyle}>
        {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
        <span style={labelStyle}>H</span>
      </div>
      <div style={timeUnitStyle}>
        {timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}
        <span style={labelStyle}>M</span>
      </div>
      <div style={timeUnitStyle}>
        {timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}
        <span style={labelStyle}>S</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
