import React from "react";

const DirectPopup = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.86)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          padding: "30px",
          borderRadius: "12px",
          textAlign: "center",
          minWidth: "300px",
          border: "1px solid rgba(255, 0, 0, 0.3)",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)"
        }}
      >
        <h3 className="text-white mb-3" style={{fontWeight: "800"}}>💡 Daily Success Reminder</h3>

        <div style={{ textAlign: "left  ", fontSize: "14px", lineHeight: "1.6", fontWeight: "900" }}>
          {/* <strong>💡 Daily Success Reminder</strong><br /><br /> */}
          ⚡ <strong>You + 2 = Explosion</strong><br />
          🔥 Coopgenix works only when <strong>YOU</strong> duplicate success.<br />
          👥 Have you helped your 2 today?<br />
          👥 Get 2, then help them get 2.<br />
          💰 That’s the wealth formula. Simple. Fast. Proven.<br /><br />
          🔁 <em>Success is in your routine. Make duplication your habit.</em><br /><br />
          
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            background: "linear-gradient(135deg, #00ff99, #00cc66)",
            border: "2px solid black",
            color: "#000",
            borderRadius: "20px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          <strong>Yes Sure I Will Do It Today. <i class="fa-solid fa-check-double"></i></strong>
        </button>
      </div>
    </div>
  );
};

export default DirectPopup;
