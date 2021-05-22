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

            <table width= '80%' border="2" cellPadding="0" cellSpacing="0" style={{backgroundColor: 'orange'}}>
                <thead>
                    <tr style={{height: '40px'}}>
                        <td width="15%">שישי</td>
                        <td width="15%">חמישי</td>
                        <td width="15%">רביעי</td>
                        <td width="15%">שלישי</td>
                        <td width="15%">שני</td>
                        <td width="15%">ראשון</td>
                        <td width="10%">זמן</td>
                    </tr>
                </thead>
                <tbody style={{backgroundColor:'white'}}>
                {courses && courses.map( (hour,i) => {
                    if(hour[0].length === 0 && hour[1].length ===0 && hour[2].length ===0 && hour[3].length ===0 && hour[4].length ===0 && hour[5].length ===0)
                    {
                        return (
                            <tr key={i} style={{height:'25px', verticalAlign:'top'}}>
                                {hour && hour.map( (day,j) => {
                                return (
                                    <td key={j} style={{ verticalAlign:'top'}}>       
                                    </td>
                                )
                                })}
                                <td style={{backgroundColor:'orange'}}>{i+8}:00</td>
                            </tr>
                        )
                    }
                    return (
                        <tr key={i} style={{height:'25pxpx', verticalAlign:'top'}}>
                             {hour && hour.map( (day,j) => {
                                if(day.length === 0)
                                {
                                    return (
                                    
                                        <td key={j} style={{ verticalAlign:'top'}}>       
                                        </td>
                                    )

                                } 
                                return (
                                    <td key={j} style={{ verticalAlign:'top'}}>  
                                        {day && day.map( (course,k) => {
                                        return (
                                            <td key={k}>                                    
                                                <h6  style={{ verticalAlign:'top'}}>
                                                    {course.course_group}<br/> שם המרצה: {course.course_id} <br/> שעות: {(course.time_start).substring(0, 5)}-{(course.time_end).substring(0, 5)}
                                                </h6>
                                            </td>
                                        )
                                        })}   
                                    </td>
                                )
                                
                                })}
                            <td style={{backgroundColor:'orange'}}>{i+8}:00</td>
                            
                        </tr>

                    )
                })}
                </tbody>

           
            </table>
        </div>

        
        
    );
}

export default Timetable