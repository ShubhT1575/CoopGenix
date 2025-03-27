import React, { useEffect, useState } from "react";
import Logo from '/coopgenix.svg'
import { Link } from "react-router-dom";
export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (scroll < 245) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (

    <>
      <header id="header" className="header-layout1">
        <div id="sticky-header" className={`${isSticky ? "sticky-menu" : ""} menu-area transparent-header`} >
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="menu-wrap">
                  <nav className="menu-nav">
                    <div className="logo">
                      <a href="#">
                        <img
                          src={Logo}
                          style={{ height: "50px" }}
                          alt="Logo"
                        />
                        {/* <h2>CoopGenix</h2> */}
                      </a>
                    </div>
                    <div>
                    </div>
                    <div className="navbar-wrap main-menu d-none d-lg-flex">
                      <ul className="navigation">
                        {/* <li className="active">
                          <a className="section-link" href="/">
                            Home
                          </a>
                        </li> */}
                        {/* <li>
                          <a href="#about" className="section-link">
                            About
                          </a>
                        </li> */}
                        <li>
                          <a href="#about" className="section-link">
                            How It Works

                          </a>
                        </li>
                        <li className="">
                          <a href="#community">Community Contributions
                          </a>

                        </li>
                        <li>
                          <a href="#liveFund">Success Stories</a>
                        </li>
                        <li>
                          <a href="#getInvolved">Get Involved</a>
                        </li>
                        <li>
                          <a href="#faq">FAQ</a>
                        </li>
                        <li>
                          <a href="#contact">Contact Us</a>
                        </li>
                      </ul>
                    </div>
                  
                    {/* <div className="mobile-nav-toggler">
                      <i className="fas fa-bars"></i>
                    </div> */}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mobile-menu">
          <nav className="menu-box">
            <div className="close-btn">
              <i className="fas fa-times"></i>
            </div>
            <div className="nav-logo">
              <a href="index.html">
                <img
                  src="assets/img/logo/logo.png"
                  style={{height: "35px"}}
                  alt="Logo"
                />
              </a>
            </div>
            <div className="menu-outer"></div>
            <div className="social-links">
              <ul className="clearfix list-wrap">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M10.0596 7.34522L15.8879 0.570312H14.5068L9.44607 6.45287L5.40411 0.570312H0.742188L6.85442 9.46578L0.742188 16.5703H2.12338L7.4676 10.3581L11.7362 16.5703H16.3981L10.0593 7.34522H10.0596ZM8.16787 9.54415L7.54857 8.65836L2.62104 1.61005H4.74248L8.71905 7.29827L9.33834 8.18405L14.5074 15.5779H12.386L8.16787 9.54449V9.54415Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div> */}
        {/* <div className="menu-backdrop"></div> */}
      </header>
    </>
  );
}
