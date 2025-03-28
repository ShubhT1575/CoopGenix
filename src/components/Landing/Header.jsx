import React, { useEffect, useState } from "react";
import Logo from '/coopgenix.svg'
import { Link } from "react-router-dom";
export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen,setIsOpen] = useState(false);

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

  const handleClick = () =>{
    if(isOpen){
      setIsOpen(false)
    }else{
      setIsOpen(true)
    }
  }
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
                  
                    <div className="mobile-nav-toggler" onClick={handleClick}>
                      <i className="fas fa-bars"></i>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-menu" style={isOpen ? { display: "contents" } : {}}
        >
          <nav className="menu-box">
            <div className="close-btn" onClick={handleClick}>
              <i className="fas fa-times"></i>
            </div>
            <div className="nav-logo">
              <a href="index.html">
                <img
                  src={Logo}
                  style={{ height: "50px" }}
                  alt="Logo"
                />
              </a>
            </div>
            <div className="menu-outer"></div>
            <div className="social-links">
              <ul className="clearfix list-wrap">
                
              <li onClick={handleClick}>
                          <a href="#about" className="section-link">
                            How It Works

                          </a>
                        </li>
                        <li className="" onClick={handleClick}>
                          <a href="#community">Community Contributions
                          </a>

                        </li>
                        <li onClick={handleClick}>
                          <a href="#liveFund">Success Stories</a>
                        </li>
                        <li onClick={handleClick}>
                          <a href="#getInvolved">Get Involved</a>
                        </li>
                        <li onClick={handleClick}>
                          <a href="#faq">FAQ</a>
                        </li>
                        <li onClick={handleClick}>
                          <a href="#contact">Contact Us</a>
                        </li>
              
              </ul>
            </div>
          </nav>
        </div>
        <div className="menu-backdrop" ></div>
      </header>
    </>
  );
}
