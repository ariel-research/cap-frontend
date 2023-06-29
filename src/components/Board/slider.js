import React, { useState, useEffect } from 'react';

const Slider = ({ course_group, i, change }) => {
  const [value, setValue] = useState(course_group.score);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setValue(value);
    change(value, i);
  };

  useEffect(() => {
    setValue(course_group.score);
  }, [course_group.score]);

  return (
    <div className="slide">
      <div className="value" style={{ fontSize: "1.3em" }}>{value}</div>
      <input
        type="range"
        min={0}
        max={1000}
        value={value}
        className="slider"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default Slider;
