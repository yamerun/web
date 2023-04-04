import React, { useState, useEffect } from "react";
import "./Advertisement.css";

export const Carousel = () => {
  const slides = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    if (currentSlide < 1) {
      setCurrentSlide(slides.length);
    } else if (currentSlide > slides.length) {
      setCurrentSlide(1);
    }
  }, [currentSlide, slides.length]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth]);

  const slideWidth = windowWidth > 768 ? 24.93 : windowWidth > 480 ? 25 : 100;

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{
          transform: `translateX(-${(currentSlide - 1) * slideWidth}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div className="slide" key={index}>
            {slide}
          </div>
        ))}
      </div>
      <button className="carousel-button left" onClick={prevSlide}>
        &lt;
      </button>
      <button className="carousel-button right" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

