import React, { useState } from "react";
import "./Slider.css";

type SliderProps = {
  defineAge: (ageValue: number) => void;
};

const Slider = ({ defineAge }: SliderProps) => {
  const [value, setValue] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState(0);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    setTooltipPosition((newValue / 100) * 100);
    defineAge(newValue);
  };

  return (
    <div className="slider-container">
      <div className="values">
        <span>0</span>
        <span>100</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        className="slider"
        onChange={handleSliderChange}
      />
      <div className="tooltip" style={{ left: `${tooltipPosition}%` }}>
        {value}
      </div>
    </div>
  );
};

export default Slider;
