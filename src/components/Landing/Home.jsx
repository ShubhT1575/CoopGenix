import React, { useEffect, useState } from "react";
import "./css/style.css";
import "./css/responsive.css";
import "./css/default.css";
import "./css/Button.css";
import "./css/Newbutton.css";

import trans from "../../assets/img/security.png";
import effe from "../../assets/img/efficacy.png";
// import creator from "../../assets/img/creator.png";
import investor from "../../assets/img/crowdfunding.png";
import dcent from "../../assets/img/blockchain1.png";
import blockchain from "../../assets/img/blockchain.png";
import Header from "./Header";
import { Link } from "react-router-dom";
import blockchain1 from "../../assets/img/blockchain1.png";
import creator from "../../assets/img/creator.png";
import security from "../../assets/img/security.png";
import crowdfunding from "../../assets/img/crowdfunding.png";
import economy from "../../assets/img/economy.png";
import loan from "../../assets/img/loan.png";
import deal from "../../assets/img/deal (1).png";
import TestimonialCarousel from "./TestimonialCarousel";
import Footer from "./Footer";
import axios from "axios";
import { apiUrl } from "../Config";
import { use } from "react";
// import economy from "/Home Logo/Asset 1.png"

export default function Home() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 1); // Add 1 day (24 hours)
    target.setHours(17, 0, 0, 0); // Set to 5:00 PM

    const timer = setInterval(() => {
      const now = new Date();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft("🎉 Launching Now!");
        clearInterval(timer);
      } else {
        const hours = String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0");
        const minutes = String(
          Math.floor((difference / (1000 * 60)) % 60)
        ).padStart(2, "0");
        const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
          2,
          "0"
        );

        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [data,setData] = useState();
  const [gainer,setGainer] = useState([]);

  const getLandingData = async ()=>{
    try {
      const response = await axios.get(apiUrl + "/user-info?userId=0x1b0E46531f89804DEa605323B83F79E2b91E51D4");
      if (response?.status === 200) {
        setData(response?.data);
      }
    } catch (error) {
      console.error("Error fetching landing data:", error);
    }
  }

  const getTopGainer = async ()=>{
    try {
      const response  = await axios.get(apiUrl + "/toprank");
      if (response.data && response.data.topUsers) {
        setGainer(response.data.topUsers);
      }else{
        setGainer([]);
      }
    } catch (error) {
      console.error("Error fetching top gainer data:", error);
      setGainer([]);
    }
  }

  useEffect(()=>{
    getLandingData();
    getTopGainer();
  },[])
  

  return (
    <>
      <Header />
      {/* Hero Section */}
      <div
        className="hero-wrapper hero-1 bg-img"
        style={{ height: "100%" }}
      >
        <div className="bg-1 bg-img"></div>
        {/* <div className="ripple-shape">
          <span className="ripple-1"></span>
          <span className="ripple-2"></span>
          <span className="ripple-3"></span>
          <span className="ripple-4"></span>
          <span className="ripple-5"></span>
        </div> */}
        <div className="container">
          <div className="hero-style1">
            <div className="row flex-row-reverse">
              <div className="col-lg-12">
                <h1 className="hero-title text-center animated-text" >  
                  <span className="word">C</span>
                  <span className="word">O</span>
                  <span className="word">O</span>
                  <span className="word">P</span>
                  <span className="word">G</span>
                  <span className="word">E</span>
                  <span className="word">N</span>
                  <span className="word">I</span>
                  <span className="word">X</span>
                </h1>
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div
                      className="pt-3 text-light text-center"
                      style={{ textAlign: "justify" }}
                    >
                      <div className="countdown-timer text-center mb-3">
                        <h2
                          style={{
                            fontSize: "2rem",
                            color: "#FFD700",
                            textShadow: "0 0 15px #FFD700",
                            animation: "pulse 1.5s infinite",
                          }}
                        >
                          {/* 🚀 Launching Tommorow 5:00 PM — Time Left: {timeLeft} */}
                        </h2>
                      </div>
                      <h1 style={{ fontSize: "3.5rem" }}>
                        The World’s Most Powerful Community System
                      </h1>
                      Empowering Communities, One Contribution at a Time! A
                      decentralized, trust-driven platform where members
                      contribute, support, and grow together—ensuring financial
                      empowerment for all.
                    </div>
                  </div>
                </div>
                <div className="hero-button mt-5">
                  <Link to={"/SignUp"}>
                    <button className="buttons">
                      <span className="boxx">Join Now</span>
                    </button>
                  </Link>
                  <div className="">
                    <ul className="list-wrap">
                      <li>
                        <Link to={"/SignIn"}>
                          <button className="buttons">
                            <span className="boxx">Login</span>
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us hero-1 bg-img" id="">
        <div className="about-container">
          <div className="about-content">
            <h2 style={{color: "#00FFFF"}}>Key Principles</h2>
            <p className="text-white">The World's First Community-Driven System</p>
          </div>
          <div className="about-principles">
            <div className="principle glow-box">
              <span className="emoji text-white">
                <i class="fa-solid fa-dna"></i>
              </span>
              <h3>Beyond Earnings – A Financial Revolution</h3>
              <p className="text-white">
                Coopgenix isn’t just about rewards; it’s about breaking
                financial barriers and empowering individuals with a
                self-sustaining, debt-free model.
              </p>
            </div>
            <div className="principle glow-box">
              <span className="emoji text-white">
                <i className="fa-solid fa-arrow-up-right-dots"></i>
              </span>
              <h3>Earn, Multiply & Reinvest Seamlessly</h3>
              <p className="text-white">
                Our smart contract ensures continuous financial growth by
                auto-reinvesting a portion of rewards, creating unstoppable
                earning cycles.
              </p>
            </div>
            <div className="principle glow-box">
              <span className="emoji text-white">
                <i class="fa-brands fa-superpowers"></i>
              </span>
              <h3>The Power of Unified Prosperity</h3>
              <p className="text-white">
                Unlike traditional financial systems, Coopgenix transforms
                contribution fees into community-driven wealth, ensuring
                everyone prospers together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div
        className="why-choose-us hero-1 bg-img"
        id="why-us"
        style={{ paddingTop: "160px", paddingBottom: "150px" }}
      >
        <h2 className="section-title"  style={{color: "#00FFFF"}}>Why Choose Us?</h2>

        <div className="value-propositions">
          <div className="value-box glow-box-blue border-curve" >
            {/* <span className="icon">💡</span> */}
            <img className="img-img" src={blockchain1} alt="" />
            <h3>Decentralized & Transparent</h3>
            <p className="text-white">No banks, no hidden fees.</p>
          </div>

          <div className="value-box glow-box-blue border-curve">
            {/* <span className="icon">💡</span> */}
            <img className="img-img" src={security} alt="" />
            <h3>Secure & Trustworthy</h3>
            <p className="text-white">100% smart contract-driven transactions.</p>
          </div>

          <div className="value-box glow-box-blue border-curve">
            {/* <span className="icon">💡</span> */}
            <img className="img-img" src={creator} alt="" />
            <h3>Instant & Global Access</h3>
            <p className="text-white">Raise funds from anywhere, anytime.</p>
          </div>

          <div className="value-box glow-box-blue border-curve" id="about">
            {/* <span className="icon">💡</span> */}
            <img className="img-img" src={crowdfunding} alt="" />
            <h3>Community-Driven</h3>
            <p className="text-white">Support real causes with direct impact.</p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="comparison-table">
          <h3 className="text-"  style={{color: "#00FFFF"}}>
            Coopgenix - The Smartest Way to Grow Together
          </h3>
          <div className="video-" style={{
  position: "relative",
  width: "80%",
  maxWidth: "800px",
  margin: "40px auto",
  padding: "20px",
  background: "#111",
  borderRadius: "10px",
  boxShadow: "0 0 0 10px #333, 0 0 0 15px #555, 0 30px 50px rgba(0,0,0,0.5)",
  border: "15px solid #222",
  borderTop: "40px solid #222",
  borderBottom: "40px solid #222",
  transform: "perspective(500px) rotateX(5deg)",
  '&:before': {
    content: '""',
    position: "absolute",
    top: "-25px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "10px",
    background: "#444",
    borderRadius: "5px"
  },
  '&:after': {
    content: '"TELEVISION"',
    position: "absolute",
    bottom: "-30px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "#888",
    fontSize: "12px",
    letterSpacing: "2px",
    textTransform: "uppercase"
  }
}}>
  <div style={{
    position: "relative",
    paddingBottom: "56.25%", /* 16:9 aspect ratio */
    height: 0,
    overflow: "hidden"
  }}>
    <iframe
      src="https://www.youtube.com/embed/iht2aiIXsZQ?autoplay=1&mute=1"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "3px solid rgba(255,255,255,0.2)",
        boxShadow: "inset 0 0 20px rgba(0,0,0,0.5), 0 0 30px rgba(0,255,255,0.2)"
      }}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    ></iframe>
  </div>
  <div style={{
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
    gap: "5px"
  }}>
    {[1, 2, 3].map((_, i) => (
      <div key={i} style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: ["#ff5f56", "#ffbd2e", "#27c93f"][i]
      }}></div>
    ))}
  </div>
</div>
        </div>
      </div>

      {/* Fundraising Categories Section */}
      <div
        className="fundraising-categories hero-1 bg-img"
        id="categories"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <h2 className="section-title text-"  style={{color: "#00FFFF"}}>Start For Your Purpose</h2>

        <div className="categories-container">
          <div className="category-box glow-box">
            <span className="icon text-white">
              <i
                className="fa-solid fa-truck-medical"
                style={{ fontSize: "35px" }}
              ></i>
            </span>
            <h3>Medical Emergencies</h3>
          </div>

          <div className="category-box glow-box">
            <span className="icon text-white">
              <i className="fa-solid fa-graduation-cap"></i>
            </span>
            <h3>Education & Scholarships</h3>
          </div>

          <div className="category-box glow-box">
            <span className="icon text-white">
              <i className="fa-solid fa-lightbulb"></i>
            </span>
            <h3>Startups & Business Ideas</h3>
          </div>

          <div className="category-box glow-box">
            <span className="icon text-white">
              <i className="fa-solid fa-building-ngo"></i>
            </span>
            <h3>Non-Profits & Charity</h3>
          </div>

          <div className="category-box glow-box">
            <span className="icon text-white">
              <i className="fa-solid fa-people-group"></i>
            </span>
            <h3>Community Projects</h3>
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="testimonials hero-1 bg-img" id="success-stories">
        <h2 className="section-title text-"  style={{color: "#00FFFF"}}>
          Success Stories & Testimonials
        </h2>

        {/* <div className="testimonial-carousel">
          <button className="carousel-btn prev-btn">‹</button>

          <div className="testimonial-container">
            <div className="testimonial-box ">
              <p className="testimonial-text">
                💬 "Thanks to this platform, I raised ₹5,00,000 for my medical
                treatment in just 3 days!"
              </p>
              <h3 className="testimonial-user">– Real User</h3>
            </div>

            <div className="testimonial-box active">
              <p className="testimonial-text">
                💬 "I got the funds I needed for my startup within a week.
                Life-changing!"
              </p>
              <h3 className="testimonial-user">– Entrepreneur</h3>
            </div>

            <div className="testimonial-box">
              <p className="testimonial-text">
                💬 "Community-driven funding helped us support 50+ students with
                scholarships!"
              </p>
              <h3 className="testimonial-user">– Non-Profit Organization</h3>
            </div>
          </div>

          <button className="carousel-btn next-btn">›</button>
        </div> */}
        <TestimonialCarousel />
      </div>

      {/* Security Section */}
      <div
        className="security hero-1 bg-img"
        id="security"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <h2 className="section-title text-"  style={{color: "#00FFFF"}}>
          {/* <img className="img-img" src={security} alt="" /> */}
          Security & Transparency
        </h2>
        <p className="section-description text-white">
          We ensure that every transaction is secure, transparent, and
          tamper-proof with the power of blockchain technology.
        </p>

        <div className="security-container">
          <div className="security-box glow-box">
            <div className="icon  text-white">
              <i className="fa-solid fa-lock"></i>
            </div>
            <h3 className="text-white">Ultimate Security & Unmatched Transparency</h3>
            <p className="text-white">
              Immutable Blockchain Security – Transactions are cryptographically
              secured and permanently recorded, ensuring a tamper-proof and
              fraud-resistant ecosystem.
            </p>
          </div>

          <div className="security-box glow-box">
            <div className="icon text-white">
              <i className="fa-solid fa-file-contract"></i>
            </div>
            <h3 className="text-white">Real-Time Financial Visibility</h3>
            <p className="text-white">
              Every contribution and reward is instantly verifiable, fostering
              absolute trust and financial clarity within the community.
            </p>
          </div>

          <div className="security-box glow-box">
            <div className="icon text-white">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <h3 className="text-white">Trustless & Autonomous System</h3>
            <p className="text-white">
              Powered by smart contracts, eliminating intermediaries, ensuring
              fair distribution, and guaranteeing full transparency at all
              times.
            </p>
          </div>
        </div>
      </div>

      {/* Community Impact Section */}
      <div
        className="community-impact hero-1 bg-img"
        id="community"
        style={{ paddingTop: "100px", paddingBottom: "100px" }}
      >
        <h2 className="section-title text"  style={{color: "#00FFFF"}}>
          {/* <img className="img-img" src={crowdfunding} alt="" /> */}
          Community & Social Impact
        </h2>
        <p className="section-description text-white">
          Be part of a movement that changes lives. Support causes, contribute,
          or help spread the word.
        </p>

        <div className="impact-container">
          <div className="impact-box glow-box-blue border-curve">
            <div className="icon text-white">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <h3 className="text-white">Join Our Mission</h3>
            <p className="text-white">
              Help people raise funds for meaningful causes and be a part of
              real change.
            </p>
          </div>

          <div className="impact-box  glow-box-blue border-curve">
            <div className="icon text-white">
              <i className="fa-solid fa-circle-dollar-to-slot"></i>
            </div>
            <h3 className="text-white">Empowering Financial Freedom</h3>
            <p className="text-white">
              Breaking barriers to wealth by providing a transparent,
              opportunity-driven system that uplifts lives and secures futures.
            </p>
          </div>

          <div className="impact-box glow-box-blue border-curve">
            <div className="icon text-white">
              <i class="fa-solid fa-hand-fist"></i>
            </div>
            <h3 className="text-white">Stronger Together</h3>
            <p className="text-white">
              A thriving ecosystem where collective growth fuels individual
              success, fostering trust, unity, and long-term financial
              stability.
            </p>
          </div>
        </div>

        <div className="cta-container">
          <Link
            to="https://telegram.me/coopgenixcommunity"
            className="cta-button text-white"
          >
            Join the Community
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="full-width hero-1 bg-img">
        <div className="cta-section">
          <h2 className="cta-title text-"  style={{color: "#00FFFF"}}>
            {/* <img className="img-img" src={deal} alt="" />  */}
            Ready to Make a Difference?
          </h2>
          <p className="cta-description text-white">
            Take the First Step to Make a Difference Today
          </p>

          <div className="cta-buttons">
            <Link to="/create-campaign" className="cta-btn primary text-white">
              Join CoopGenix
            </Link>
            {/* <Link to="/campaigns" className="cta-btn secondary">Explore Campaigns</Link> */}
          </div>
        </div>
      </div>

      {/* Fundraising Stats */}
      <div className="full-width hero-1 bg-img" id="liveFund">
        <div
          className="fundraising-stats hero-1 bg-img"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <h2 className="stats-title text-ligt"  style={{color: "#00FFFF"}}>
            {/* <img className="img-img" src={loan} alt="" />  */}
            Live Stats
          </h2>

          <div className="stats-counters">
            <div className="counter-box">
              <h3 className="counter text-white" id="totalRaised">
                $ {data?.totalVolume.toFixed() || 0}
              </h3>
              <p className=" text-white">Total Reward</p>
            </div>
            <div className="counter-box">
              <h3 className="counter text-white" id="activeCampaigns">
                {data?.totalTeam || 0}
              </h3>
              <p className=" text-white">Total Community</p>
            </div>
          </div>

          {/* <div className="contribution-feed">
          <h3>🎉 Recent Contributions</h3>
          <ul id="contributionList">
            <li>Loading latest contributions...</li>
          </ul>
        </div> */}
          {/* Latest FundRaiser */}
          <div className="featured-fundraisers">
            <h3 className="text-"  style={{color: "#00FFFF"}}>
              {/* <img className="img-img" src={economy} alt="" /> */}
              Top Gainer
            </h3>
            <div className="fundraiser-list">
              <div className="fundraiser-box  glow-box">
                <div className="icon text-white">
                  <i class="fa-solid fa-user-shield"></i>
                </div>
                <h4 className="text-white">{gainer[0]?.userId}</h4>
                <h6 className="text-white">{gainer[0]?.userRef.slice(0,5) + "..." + gainer[0]?.userRef.slice(-5)}</h6>
                <p className="text-white">Raised: <strong>${gainer[0]?.totalUsd / 1e18}</strong></p>
                <div className="progress-bar">
                  <div style={{ width: "60%" }}></div>
                </div>
                <Link to="/SignUp" className="cta-btn text-white">
                  Join Now
                </Link>
              </div>

              <div className="fundraiser-box  glow-box">
                <div className="icon text-white">
                  <i class="fa-solid fa-user-shield"></i>
                </div>
                <h4 className="text-white">{gainer[1]?.userId}</h4>
                <h6 className="text-white">{gainer[1]?.userRef.slice(0,5) + "..." + gainer[1]?.userRef.slice(-5)}</h6>
                <p className="text-white">Raised: <strong>${gainer[1]?.totalUsd / 1e18}</strong></p>
                <div className="progress-bar">
                  <div style={{ width: "53%" }}></div>
                </div>
                <Link to="/SignUp" className="cta-btn text-white">
                  Join Now
                </Link>
              </div>

              <div className="fundraiser-box  glow-box">
                <div className="icon text-white">
                  <i class="fa-solid fa-user-shield"></i>
                </div>
                <h4 className="text-white">{gainer[2]?.userId}</h4>
                <h6 className="text-white">{gainer[2]?.userRef.slice(0,5) + "..." + gainer[2]?.userRef.slice(-5)}</h6>
                <p className="text-white">Raised: <strong>${gainer[2]?.totalUsd / 1e18}</strong></p>
                <div className="progress-bar">
                  <div style={{ width: "50%" }}></div>
                </div>
                <Link to="/SignUp" className="cta-btn text-white">
                  Join Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="full-width hero-1 bg-img" id="faq">
        <div
          className="faq-section hero-1 bg-img"
          style={{ paddingTop: "100px", paddingBottom: "100px" }}
        >
          <h2 className="text-"  style={{color: "#00FFFF"}}>Frequently Asked Questions</h2>

          <div className="faq-wrapper">
            <div className="faq-category">
              <h3 className="text-white">General Questions</h3>
              <div className="faq-container" id="generalQuestionsAccordion">
                <div className="faq-box">
                  <div
                    className="faq-question accordion-button collapsed"
                    style={{background: "transparent"}}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#howItWorks"
                  >
                    <h3 style={{ textAlign: "left", color: "white" }}>
                      How does CoopGenix work?
                    </h3>
                    <span className="faq-toggle ms-auto">+</span>
                  </div>
                  <p
                    className="faq-answer accordion-collapse collapse  text-white"
                    id="howItWorks"
                    data-bs-parent="#generalQuestionsAccordion"
                  >
                    CoopGenix is a decentralized crowdfunding platform based on
                    blockchain technology. It allows users to start fundraisers,
                    contribute to causes, and withdraw funds seamlessly without
                    intermediaries.
                  </p>
                </div>

                <div className="faq-box">
                  <div
                    className="faq-question accordion-button collapsed"
                    style={{background: "transparent"}}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#hiddenFees"
                  >
                    <h3 style={{ textAlign: "left", color: "white"  }}>
                      Are there any hidden fees?
                    </h3>
                    <span className="faq-toggle ms-auto">+</span>
                  </div>
                  <p
                    className="faq-answer accordion-collapse collapse text-white"
                    id="hiddenFees"
                    data-bs-parent="#generalQuestionsAccordion"
                  >
                    No hidden fees! We operate transparently with minimal smart
                    contract fees for blockchain transactions.
                  </p>
                </div>

                <div className="faq-box">
                  <div
                    className="faq-question accordion-button collapsed"
                    style={{background: "transparent"}}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#startFundraiser"
                  >
                    <h3 style={{ textAlign: "left", color: "white"  }}>
                      Can anyone start a fundraiser?
                    </h3>
                    <span className="faq-toggle ms-auto">+</span>
                  </div>
                  <p
                    className="faq-answer accordion-collapse collapse text-white"
                    id="startFundraiser"
                    data-bs-parent="#generalQuestionsAccordion"
                  >
                    Yes! Anyone with a genuine need or cause can start a
                    fundraiser and receive community support.
                  </p>
                </div>
              </div>
            </div>

            <div className="faq-category">
              <h3 className="text-white">Security & Withdrawals</h3>
              <div className="faq-container" id="securityAccordion">
                <div className="faq-box">
                  <div
                    className="faq-question accordion-button collapsed"
                    style={{background: "transparent"}}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#donationSecure"
                  >
                    <h3 style={{ textAlign: "left", color: "white"  }}>
                      Is my donation secure?
                    </h3>
                    <span className="faq-toggle ms-auto">+</span>
                  </div>
                  <p
                    className="faq-answer accordion-collapse collapse text-white"
                    id="donationSecure"
                    data-bs-parent="#securityAccordion"
                  >
                    Yes! Every transaction is secured using blockchain
                    technology, ensuring transparency and security.
                  </p>
                </div>

                <div className="faq-box">
                  <div
                    className="faq-question accordion-button collapsed"
                    style={{background: "transparent"}}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#withdrawFunds"
                  >
                    <h3 style={{ textAlign: "left", color: "white"  }}>
                      How do I withdraw funds?
                    </h3>
                    <span className="faq-toggle ms-auto">+</span>
                  </div>
                  <p
                    className="faq-answer accordion-collapse collapse text-white"
                    id="withdrawFunds"
                    data-bs-parent="#securityAccordion"
                  >
                    Withdrawals are processed through smart contracts. Once your
                    campaign reaches the desired amount, you can request a
                    withdrawal instantly.
                  </p>
                </div>

                <div className="faq-box">
                  <div
                    className="faq-question accordion-button collapsed"
                    style={{background: "transparent"}}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#trackContributions"
                  >
                    <h3 style={{ textAlign: "left", color: "white"  }}>
                      Can I track my contributions?
                    </h3>
                    <span className="faq-toggle ms-auto">+</span>
                  </div>
                  <p
                    className="faq-answer accordion-collapse collapse text-white"
                    id="trackContributions"
                    data-bs-parent="#securityAccordion"
                  >
                    Absolutely! Every transaction is recorded on the blockchain,
                    making it fully traceable.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <FAQ/> */}
        </div>
      </div>

      {/* Get Involved Section */}
      <div className="get-involved hero-1 bg-img" id="getInvolved">
        <h2 style={{color: "#00FFFF"}}>Get Involved & Make an Impact</h2>
        <div className="involved-boxes">
          <div className="involved-box  glow-box">
            <h3>
              <i
                className="fa-solid fa-handshake-simple"
                style={{ marginRight: "10px" }}
              ></i>
              Join the Movement
            </h3>
            <p className="text-white">
              Be part of a thriving community dedicated to financial empowerment
              and positive change worldwide.
            </p>
            <Link to="/" className="cta text-white">
              Join Now
            </Link>
          </div>
          <div className="involved-box glow-box">
            <h3>
              <i
                className="fa-solid fa-building-columns"
                style={{ marginRight: "10px" }}
              ></i>
              Contribute & Earn
            </h3>
            <p className="text-white" >
              Support the network while benefiting from structured rewards that
              promote long-term financial growth and stability.
            </p>
            <Link to="/" className="cta text-white">
              Join Now
            </Link>
          </div>
          <div className="involved-box glow-box">
            <h3>
              <i
                className="fa-solid fa-sack-dollar"
                style={{ marginRight: "10px" }}
              ></i>
              Empower Others
            </h3>
            <p className="text-white">
              Share opportunities, educate, and uplift communities by fostering
              a sustainable, transparent, and rewarding ecosystem.
            </p>
            <Link to="/" className="cta text-white">
              Join Now
            </Link>
          </div>
        </div>
      </div>

      {/* Why You Can Trust Us */}
      <div className="get-involved hero-1 bg-img">
        <h2 style={{color: "#00FFFF"}}>Coopgenix - A Revolution in Community Rewards</h2>
        <div className="involved-boxes">
          <div className="involved-box  glow-box-blue border-curve">
            <h3>
              <i
                className="fa-solid fa-shield-halved"
                style={{ marginRight: "10px" }}
              ></i>
              Decentralized & Transparent
            </h3>
            <p className="text-white">
              Built on blockchain, ensuring fair, automated, and trustless
              reward distribution for every member
            </p>
            {/* <Link to="/volunteer" className="cta">Join Now</Link> */}
          </div>
          <div className="involved-box  glow-box-blue border-curve">
            <h3>
              <i
                className="fa-solid fa-cubes"
                style={{ marginRight: "10px" }}
              ></i>
              12 Packages Opportunity
            </h3>
            <p className="text-white">
              Unlock endless opportunities with our 12-tier packages—begin your
              journey today for only $5
            </p>
            {/* <Link to="/partnership" className="cta">Partner Up</Link> */}
          </div>
          <div className="involved-box  glow-box-blue border-curve">
            <h3>
              <i
                className="fa-solid fa-chart-diagram"
                style={{ marginRight: "10px" }}
              ></i>
              4 Algorithmic Rewards
            </h3>
            <p className="text-white">
              Earn Rewards From: Block 499%, Global $948,726, Referral 57%,
              Promise 200%—maximize your potential earnings!
            </p>
            {/* <Link to="/create-campaign" className="cta">Start Fundraising</Link> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      {/* <footer className="footer hero-1 bg-img ">
        <div className="footer-container">
          <div className="footer-column">
            <h3>📌 Quick Links</h3>
            <ul>
              <li><Link to="/">🏠 Home</Link></li>
              <li><Link to="/create-campaign">💰 Start a Fundraiser</Link></li>
              <li><Link to="/campaigns">🔎 Explore Campaigns</Link></li>
              <li><Link to="/faq">❓ FAQ</Link></li>
              <li><Link to="/contact">📞 Contact Us</Link></li>
              <li><Link to="/privacy">🔐 Privacy Policy & Terms</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>📲 Connect With Us</h3>
            <ul className="social-links">
              <li>
                <a href="#">🌍 Telegram / Discord</a>
              </li>
              <li>
                <a href="#">🐦 Twitter</a>
              </li>
              <li>
                <a href="#">📘 Facebook</a>
              </li>
              <li>
                <a href="#">📸 Instagram</a>
              </li>
              <li>
                <a href="#">🎥 YouTube</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>📞 Contact & Support</h3>
            <p>
              📧{" "}
              <a href="mailto:support@coopgenix.com">support@coopgenix.com</a>
            </p>
            <p>📞 +91-123-456-7890</p>
            <p>🌍 Blockchain City, Web3 World</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 CoopGenix All Rights Reserved.</p>
          <p>
            <Link to="/terms">🔗 Terms & Conditions</Link> |{" "}
            <Link to="/privacy">🔐 Privacy Policy</Link>
          </p>
        </div>
      </footer> */}
    </>
  );
}
