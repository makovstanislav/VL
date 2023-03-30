import React, { useState } from "react";

const RangeSlider = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleChange = (event) => {
    const minValue = parseInt(event.target.value.split(",")[0]);
    const maxValue = parseInt(event.target.value.split(",")[1]);
    setMinPrice(minValue);
    setMaxPrice(maxValue);
  };

  return (
    <div>
      <input
        type="range"
        min="0"
        max="1000"
        value={`${minPrice},${maxPrice}`}
        onChange={handleChange}
      />
      <div>Min Price: {minPrice}</div>
      <div>Max Price: {maxPrice}</div>
    </div>
  );
};

export default RangeSlider;
