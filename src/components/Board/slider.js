import React, { useState, useEffect } from 'react';

const Slider = ({ course, i, change }) => {
  const [value, setValue] = useState(course.score);
  const handleOnChange = (e) => {
    const value = e.target.value;
    setValue(value);
    change(value, i);
  };

  useEffect(() => {
    setValue(course.score);
  }, [course.score]);

  return (
   
    <div className="slide"> 
     <div className="value" style={{ fontSize: "1.3em"}}>{value}</div>
      <input
        type="range"
        min={0}
        max={1000}
        value={value}
        className="slider"
        onChange={handleOnChange}
        disabled={!course.is_included}
      /> 
    </div>
  );
};

export default Slider;
