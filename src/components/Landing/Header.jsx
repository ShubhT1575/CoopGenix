import React, { useEffect, useState } from "react";
import Logo from '/coopgenix.svg'
import { Link } from "react-router-dom";
import { Button, Input, Modal,Select } from "antd";
// import Select from "react-select";
import TextArea from "antd/es/input/TextArea";
import toast from "react-hot-toast";
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

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
    }, 100);
  };

  const modalClose = ()=>{

    setLoading(true);

    // Simple loading mock. You should add cleanup logic in real world.
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      toast.success("We will contact you soon !!");
    }, 2000);
  }

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
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
                          About Coopgenix

                          </a>
                        </li>
                        <li className="">
                          <a href="#community">Social Impact
                          </a>

                        </li>
                        <li>
                          <a href="#liveFund">Live States</a>
                        </li>
                        {/* <li>
                          <a href="#getInvolved">Get Involved</a>
                        </li> */}
                        <li>
                          <a href="#faq">FAQ</a>
                        </li>
                        <li>
                          <a href="#" onClick={showLoading}>Contact Us</a>
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
                          About Coopgenix

                          </a>
                        </li>
                        <li className="" onClick={handleClick}>
                        <a href="#community">Social Impact
                        </a>

                        </li>
                        <li>
                          <a href="#liveFund">Live States</a>
                        </li>
                        <li onClick={handleClick}>
                          <a href="#faq">FAQ</a>
                        </li>
                        <li onClick={handleClick}>
                          <a href="#" onClick={showLoading}>Contact Us</a>
                        </li>
              
              </ul>
            </div>
          </nav>
        </div>
        <div className="menu-backdrop" ></div>
      </header>

      <Modal
        title={<p className="text-light">Contact Us</p>}
        footer={
          <Button type="primary" onClick={modalClose}>
            Submit
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Input type="text" placeholder="Name" style={{marginBottom: "10px"}}/>
        <Input type="email" placeholder="Email" style={{marginBottom: "10px"}}/>
        <Input type="tel" placeholder="Mobile No." style={{marginBottom: "10px"}}/>
        <Select
        className="w-100 mb-2"
      options={countries}
      value={selectedCountry}
      onChange={(selectedOption) => setSelectedCountry(selectedOption)}
    />
        <TextArea rows={4} placeholder="Message" maxLength={6} style={{marginBottom: "10px"}}/>
      </Modal>
    </>
  );
}
