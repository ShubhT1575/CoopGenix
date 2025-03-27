import React from "react";
// import './Footer.css';
import "./css/Newbutton.css";

const Footer = () => {
  return (
    <footer className="footer-main bg-img" id="contact">
      <div className="footer-container">
        <div className="footer-column about-column">
          <div className="logo-section">
            {/* <div className="logo-placeholder"><img src="/coopgenix symbol.svg" alt="logo" /></div> */}
            <h2 className="logo-title" style={{marginTop: "0px"}}><img src="/coopgenix.svg" alt="logo" /></h2>
          </div>
          <p className="about-text">
            Coopgenix is a decentralized financial ecosystem designed to empower
            users with secure, transparent, and rewarding opportunities.
          </p>
        </div>

        <div className="footer-column testimonial-column">
          <h3 className="column-title">Write Testimonials</h3>
          <input
            type="text"
            placeholder="Your User Id"
            className="testimonial-input"
          />
          <textarea
            placeholder="Write your testimonial here..."
            className="testimonial-textarea"
          ></textarea>
          <button className="testimonial-submit btn btn-secondary-gradient">
            Submit
          </button>
        </div>

        <div className="footer-column connect-column">
          <h3 className="column-title">Connect with Us</h3>
          <div className="social-icons landing-social-icon">
            <a href="#">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i class="fab fa-x"></i>
            </a>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
          {/* <div className="contact-info">
            <p><i class="fa-solid fa-envelope"></i> support@coopgenix.com</p>
            <p><i class="fa-solid fa-phone"></i> +91-123-456-7890</p>
            <p><i class="fa-solid fa-location-dot"></i> Blockchain City, Web3 World</p>
          </div> */}
          <button className="testimonial-submit btn btn-primary-gradient w-50" style={{alignSelf:"center"}}>
          Community Chat <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 CoopGenix All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/terms">Terms & Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
