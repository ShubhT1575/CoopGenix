import React, { useState } from "react";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      text: "💬 Thanks to this platform, I raised ₹5,00,000 for my medical treatment in just 3 days!",
      user: "– Real User",
    },
    {
      text: "💬 I got the funds I needed for my startup within a week. Life-changing!",
      user: "– Entrepreneur",
    },
    {
      text: "💬 Community-driven funding helped us support 50+ students with scholarships!",
      user: "– Non-Profit Organization",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="testimonial-carousel relative w-full max-w-lg mx-auto" >
      <button
        className="carousel-btn prev-btn absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full"
        onClick={prevSlide}
      >
        ‹
      </button>

      <div className="testimonial-container glow-box-blue border-curve relative w-full overflow-hidden" style={{background: "linear-gradient(135deg,#2a00ff,#0d0b4f)"}}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-box ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <p className="testimonial-text text-center text-white">{testimonial.text}</p>
            <h3 className="testimonial-user text-center">{testimonial.user}</h3>
          </div>
        ))}
      </div>

      <button
        className="carousel-btn next-btn absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full"
        onClick={nextSlide}
      >
        ›
      </button>
    </div>
  );
};

export default TestimonialCarousel;
