import React, { useState, useEffect } from 'react';

const Checkbox = ({ course, i, change }) => {
  const [is_checked, setisChecked] = useState(course.is_included);

  const handleOnChange = (e) => {
    const value =e.target.checked;
    setisChecked(value);
    change(value, i);
  };

  useEffect(() => {
    setisChecked(course.is_included);
  }, [course.is_included]);

  return (
   
    <div className="form-check end-50">
        <input className="form-check-input" type="checkbox" checked={is_checked} id="flexCheckChecked" onChange={handleOnChange}/>
        <label className="form-check-label" htmlFor="flexCheckChecked">
        אופציונאלי
        </label>
    </div>
  );
};

export default Checkbox;
