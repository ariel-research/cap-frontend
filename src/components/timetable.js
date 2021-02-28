import React, {useState, useEffect} from 'react';
import './timetable.css';


function Timetable(props)
{
    const courses = props.course_group 

    return(
        <div>
            <div>
                {courses && courses.map( course => {
                return (
                <div key={course.course_id}>
                    {course.course_id}
                </div>
                )
            })}
            </div>

            <table border="1" width="50px">
                <thead>
                    <tr>
                        <th width="15%">שישי</th>
                        <th width="15%">חמישי</th>
                        <th width="15%">רביעי</th>
                        <th width="15%">שלישי</th>
                        <th width="15%">שני</th>
                        <th width="15%">ראשון</th>
                        <th width="10%">זמן</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(15)].map( (e,i) =>{
                        return (
                            <tr key={i}>         
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                { i<2 ? (
                                    <th>0{i+8}:00</th>
                                ) : (
                                    <th>{i+8}:00</th>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            
            </table>
        </div>

        
        
    );
}

export default Timetable