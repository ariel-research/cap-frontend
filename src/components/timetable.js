import React, {useState, useEffect} from 'react';
import './timetable.css';
import { API } from "../api-service";


function Timetable(props)
{
    const [courses_A, setCourses_A] = useState([]);
    const [courses_B, setCourses_B] = useState([]);

    useEffect(()=>{
        API.getCoursesA()
          .then(resp => setCourses_A(resp))
          .catch(error => console.log(error))
        API.getCoursesB()
          .then(resp => setCourses_B(resp))
          .catch(error => console.log(error))
      }, [])








    return(
        <div>
            <div>
                {courses_A && courses_A.map( course => {
                return (
                <div key={course.course_id}>
                    {course.course_id}
                </div>
                )
            })}
            </div>

            <div>
                {courses_B && courses_B.map( course => {
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