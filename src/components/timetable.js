import React from 'react';
import './timetable.css';


function Timetable(props)
{
    const courses = props.course_group 

    return(
        <div>
            <div>
                {courses && courses.map( (course,i) => {
                return (
                <div  key={i} data-testid="userCourseId">
                    {course.course_id}
                </div>
                )
            })}
            </div>

            <table className="table table-bordered" border="2">
                <thead className='table-primary table-bordered' >
                    <tr style={{height: '20px'}}>
                        <th width="auto">שעה</th>
                        <th width="auto">ראשון</th>
                        <th width="auto">שני</th>
                        <th width="auto">שלישי</th>
                        <th width="auto">רביעי</th>
                        <th width="auto">חמישי</th>
                        <th width="auto">שישי</th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor:'white'}}>
                {courses && courses.map( (hour,i) => {
                    if(hour[0].length === 0 && hour[1].length ===0 && hour[2].length ===0 && hour[3].length ===0 && hour[4].length ===0 && hour[5].length ===0)
                    {
                        return (
                            <tr key={i} style={{height:'25px', verticalAlign:'top'}}>
                                <th scope="row" className="w-2">{i+8}:00</th>
                                {hour && hour.map( (day,j) => {
                                return (
                                    <td key={j} style={{ verticalAlign:'top'}}>       
                                    </td>
                                )
                                })}
                                
                            </tr>
                        )
                    } else {
                        return (
                            <tr key={i} style={{height:'25px', verticalAlign:'top'}}> 
                            <th scope="row" className="w-2">{i+8}:00</th>
                                {hour && hour.map( (day,j) => {
                                    return (
                                    <td key={j} style={{ verticalAlign:'top'}}> 
                                    {day.length ===0 ? (
                                        null
                                    ) : (

                                        <div>
                                            {day && day.map( (course,k) => {
                                            return (
                                                <td  key={k}> 
                                                    {course.mandatory && <h6  style={{ verticalAlign:'top', backgroundColor: 'red'}}>
                                                        {course.course_group}<br/>  המרצה: {course.lecturer} <br/> שעות: {(course.time_start).substring(0, 5)}-{(course.time_end).substring(0, 5)}
                                                    </h6> }                                   
                                                    {!course.mandatory && <h6  style={{ verticalAlign:'top'}}> {course.mandatory}
                                                    <p className='fw-bold'> {course.course_group}</p> {course.lecturer} <br/>{(course.time_start).substring(0, 5)}-{(course.time_end).substring(0, 5)}
                                                    </h6> }  
                                                </td>
                                            )
                                            })}   
                                        </div>
                                        )}
                                    </td>
                            )})}
                            </tr>
                        )
                    }
                })}
                </tbody>

           
            </table>
        </div>
        
        
        
    );
}

export default Timetable