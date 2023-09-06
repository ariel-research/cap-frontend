import React, { useState, useEffect } from 'react';

function Survey ({q_a, handleChange}) {
    const [question,setQuestion] = useState(q_a.question)
    const [answer,setAnswer] = useState(q_a.answer)
    
    useEffect(() => {

    },[q_a])


    return (
        <div class="card">
            <div class="card-body">
                {question}
                <textarea  rows='3' className="form-control bg-white" value={answer}/>
            </div>
        </div>
    )
      

}
export default Survey;