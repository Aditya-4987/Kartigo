import React, { useState, useEffect } from "react";
import "./PriceSlider.css";

const PriceSlider = ({ min = 0, max = 5000, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max / 4); // Default to 25% of max
  const [isSliding, setIsSliding] = useState(false);
  const [activeThumb, setActiveThumb] = useState(null);

  // Calculate percentage for styling
  const getPercent = (value) => Math.round(((value - min) / (max - min)) * 100);

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  // Handle value changes
  useEffect(() => {
    if (onChange) {
      onChange([minVal, maxVal]);
    }
  }, [minVal, maxVal, onChange]);

  return (
    <div className="price-range-slider">
      <div className="price-header">
        <h4>Price Range</h4>
        <div className="price-values">
          <span className="price-display">
            ${minVal} - ${maxVal}
          </span>
        </div>
      </div>

      <div className="slider-container">
        <div className="slider-track"></div>
        <div
          className="slider-range"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>

        {/* Min thumb */}
        <div className="slider-group">
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), maxVal - 1);
              setMinVal(value);
            }}
            onMouseDown={() => {
              setIsSliding(true);
              setActiveThumb("min");
            }}
            onMouseUp={() => setIsSliding(false)}
            onTouchStart={() => {
              setIsSliding(true);
              setActiveThumb("min");
            }}
            onTouchEnd={() => setIsSliding(false)}
            className="thumb thumb-left"
            style={{ zIndex: minVal > max - 100 ? "5" : "4" }}
          />
          <div
            className={`thumb-value ${
              isSliding && activeThumb === "min" ? "active" : ""
            }`}
            style={{ left: `${minPercent}%` }}
          >
            ${minVal}
          </div>
        </div>

        {/* Max thumb */}
        <div className="slider-group">
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), minVal + 1);
              setMaxVal(value);
            }}
            onMouseDown={() => {
              setIsSliding(true);
              setActiveThumb("max");
            }}
            onMouseUp={() => setIsSliding(false)}
            onTouchStart={() => {
              setIsSliding(true);
              setActiveThumb("max");
            }}
            onTouchEnd={() => setIsSliding(false)}
            className="thumb thumb-right"
          />
          <div
            className={`thumb-value ${
              isSliding && activeThumb === "max" ? "active" : ""
            }`}
            style={{ left: `${maxPercent}%` }}
          >
            ${maxVal}
          </div>
        </div>
      </div>

      <div className="input-controls">
        <div className="input-group">
          <label htmlFor="min-price">Min</label>
          <div className="input-wrapper">
            <span className="currency">$</span>
            <input
              type="number"
              id="min-price"
              value={minVal}
              min={min}
              max={maxVal - 1}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), maxVal - 1);
                setMinVal(value >= min ? value : min);
              }}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="max-price">Max</label>
          <div className="input-wrapper">
            <span className="currency">$</span>
            <input
              type="number"
              id="max-price"
              value={maxVal}
              min={minVal + 1}
              max={max}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), minVal + 1);
                setMaxVal(value <= max ? value : max);
              }}
            />
          </div>
        </div>
      </div>

      <button
        className="apply-button"
        onClick={() => onChange && onChange([minVal, maxVal])}
      >
        Apply
      </button>
    </div>
  );
};

export default PriceSlider;
