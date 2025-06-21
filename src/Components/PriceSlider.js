import React, { useState } from "react";
import "./PriceSlider.css";

function PriceSlider({ onChange = () => {} }) {
  const [priceRange, setPriceRange] = useState({ min: 500, max: 100000 });
  const [inputValues, setInputValues] = useState({ min: "500", max: "100000" });

  // Handle typing in the input fields
  const handleMinInputChange = (e) => {
    const value = e.target.value;
    setInputValues({ ...inputValues, min: value });
  };

  const handleMaxInputChange = (e) => {
    const value = e.target.value;
    setInputValues({ ...inputValues, max: value });
  };

  // Apply constraints and call onChange when values actually change
  const handleMinBlur = () => {
    const rawValue = Number(inputValues.min);
    if (isNaN(rawValue)) {
      setInputValues({ ...inputValues, min: priceRange.min.toString() });
      return;
    }

    // Round to nearest 100
    const value = Math.floor(rawValue / 100) * 100;
    const newMin = Math.max(0, Math.min(value, priceRange.max - 100));

    setPriceRange({ ...priceRange, min: newMin });
    setInputValues({ ...inputValues, min: newMin.toString() });

    // Call the onChange prop with the updated range
    onChange(newMin, priceRange.max);
  };

  const handleMaxBlur = () => {
    const rawValue = Number(inputValues.max);
    if (isNaN(rawValue)) {
      setInputValues({ ...inputValues, max: priceRange.max.toString() });
      return;
    }

    // Round to nearest 100
    const value = Math.floor(rawValue / 100) * 100;
    const newMax = Math.min(300000, Math.max(value, priceRange.min + 100));

    setPriceRange({ ...priceRange, max: newMax });
    setInputValues({ ...inputValues, max: newMax.toString() });

    // Call the onChange prop with the updated range
    onChange(priceRange.min, newMax);
  };

  // Increment/Decrement functions
  const incrementMin = () => {
    const newMin = Math.min(priceRange.min + 100, priceRange.max - 100);
    setPriceRange({ ...priceRange, min: newMin });
    setInputValues({ ...inputValues, min: newMin.toString() });
    onChange(newMin, priceRange.max);
  };

  const decrementMin = () => {
    const newMin = Math.max(0, priceRange.min - 100);
    setPriceRange({ ...priceRange, min: newMin });
    setInputValues({ ...inputValues, min: newMin.toString() });
    onChange(newMin, priceRange.max);
  };

  const incrementMax = () => {
    const newMax = Math.min(300000, priceRange.max + 100);
    setPriceRange({ ...priceRange, max: newMax });
    setInputValues({ ...inputValues, max: newMax.toString() });
    onChange(priceRange.min, newMax);
  };

  const decrementMax = () => {
    const newMax = Math.max(priceRange.min + 100, priceRange.max - 100);
    setPriceRange({ ...priceRange, max: newMax });
    setInputValues({ ...inputValues, max: newMax.toString() });
    onChange(priceRange.min, newMax);
  };

  return (
    <div className="price-filter">
      <h3>Price Range</h3>
      <div className="price-inputs">
        <div className="price-input-container">
          <span>Min:</span>
          <div className="price-input-with-buttons">
            <button className="price-btn" onClick={decrementMin} type="button">
              -
            </button>
            <div className="price-input-wrapper">
              <input
                type="text"
                value={inputValues.min}
                onChange={handleMinInputChange}
                onBlur={handleMinBlur}
              />
            </div>
            <button className="price-btn" onClick={incrementMin} type="button">
              +
            </button>
          </div>
        </div>

        <div className="price-input-container">
          <span>Max:</span>
          <div className="price-input-with-buttons">
            <button className="price-btn" onClick={decrementMax} type="button">
              -
            </button>
            <div className="price-input-wrapper">
              <input
                type="text"
                value={inputValues.max}
                onChange={handleMaxInputChange}
                onBlur={handleMaxBlur}
              />
            </div>
            <button className="price-btn" onClick={incrementMax} type="button">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceSlider;
