import React, { useState, useRef, useEffect } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      contentRefs.current[openIndex].style.maxHeight =
        contentRefs.current[openIndex].scrollHeight + "px";
    }

    contentRefs.current.forEach((ref, index) => {
      if (ref && index !== openIndex) {
        ref.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  const faqs = [
    {
      question: "How does CoopGenix work?",
      answer:
        "CoopGenix is a decentralized crowdfunding platform based on blockchain technology. It allows users to start fundraisers, contribute to causes, and withdraw funds seamlessly without intermediaries.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees! We operate transparently with minimal smart contract fees for blockchain transactions.",
    },
    {
      question: "Can anyone start a fundraiser?",
      answer:
        "Yes! Anyone with a genuine need or cause can start a fundraiser and receive community support.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-wrapper">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-box">
          <div
            className="faq-question"
            onClick={() => toggleFAQ(index)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              padding: "15px",
              background: "#f4f4f4",
              borderRadius: "5px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <h3 style={{ margin: 0 }}>{faq.question}</h3>
            <span
              className="faq-toggle"
              style={{ fontSize: "22px", fontWeight: "bold" }}
            >
              {openIndex === index ? "−" : "+"}
            </span>
          </div>
          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className="faq-answer"
            style={{
              maxHeight: "0px",
              overflow: "hidden",
              transition: "max-height 0.3s ease-in-out",
              background: "#fff",
              padding: "0px",
            }}
          >
            <p style={{ margin: "10px", padding: "10px" }}>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
