import React, { useState, useEffect } from 'react';
import { API } from "../../api/api-service";

function TextArea ({title, text, rows}) {

    return (
    
    <div className="m-4">
        <h4 className='text-center'>{title}</h4>
        <textarea dir='ltr' rows={rows} className="form-control bg-white" readOnly value={text}/>
    </div>
    )
      

}
export default TextArea;