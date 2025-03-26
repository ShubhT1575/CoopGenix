import React from "react";

function Footer() {
  return (
    <div>
      <footer className="footer mt-auto py-3 text-center" 
          style={{ background: "black" , padding: "0" , borderTop: "1px solid purple"}}

      >
        <div className="container">
                <div class="footer-content">
        <h1>Join the Future of Finance</h1>
        <p>Secure, Transparent, and Rewarding – Be a part of something revolutionary!</p>
        <div class="social-icons">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
            <a href="#"><i class="fab fa-telegram"></i></a>
        </div>
        <p>&copy; 2025 <strong style={{color: "rgba(255, 0, 255, 0.8)"}}>CoopUnion</strong>. All Rights Reserved.</p>
    </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
