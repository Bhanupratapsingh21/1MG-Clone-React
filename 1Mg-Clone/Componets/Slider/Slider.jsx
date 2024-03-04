import React, { useState, useEffect } from "react";
import "./Slider.css";

function CustomCarousel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [slideInterval, setSlideInterval] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      slideNext();
    }, 5000);

    setSlideInterval(interval);

    return () => clearInterval(interval);
  }, []);

  const slideNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const slidePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    setTouchEndX(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) { // Adjust this threshold as needed
        if (diff > 0) {
          slideNext();
        } else {
          slidePrev();
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleMouseEnter = () => {
    clearInterval(slideInterval);
  };

  const handleMouseLeave = () => {
    const interval = setInterval(() => {
      slideNext();
    }, 3000);
    setSlideInterval(interval);
  };

  return (
    <div className="boxwidth">
      <div>
        <div
          className="container__slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children.map((item, index) => {
            return (
              <div
                key={index}
                className={"slider__item slider__item-active-" + (activeIndex + 1)}
              >
                {item}
              </div>
            );
          })}

          <div className="container__slider__links">
            {children.map((_, index) => (
              <button
                key={index}
                className={`container__slider__links-small ${index === activeIndex ? "container__slider__links-small-active" : ""}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <button
            className="slider__btn-next"
            onClick={slideNext}
          >
            {">"}
          </button>
          <button
            className="slider__btn-prev"
            onClick={slidePrev}
          >
            {"<"}
          </button>
        </div>
      </div>
      <div><img id="imgdata" src="https://onemg.gumlet.io/diagnostics%2F2024-01%2F1706088937_1948x800+%2827%29.png" alt="" /></div>
    </div>
  );
}

export default CustomCarousel;
