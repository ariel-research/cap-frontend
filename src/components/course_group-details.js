import React from 'react'

function Course_groupDetails(props)
{
    return(
        <div>
            {props.course_group ? (
            <div dir="rtl">
                <h2>{ props.course_group.name}</h2>
                <div>{ props.course_group.courses.map((course, i) =>{
                    return (
                        <ul  className="courses" key={course.course_id}>
                            <h3>אופצייה: {i+1}</h3>
                            <li>סמסטר: {course.Semester}</li>
                            <li>שם המרצה: {course.lecturer}</li>
                            <li>מכסת סטודנטים: {course.capacity}</li>
                            <li>יום בשבוע: {course.day}</li>
                            <li>שעות: {course.time_start}-{course.time_end}</li>       
                        </ul>
                    )
                } )}</div>
            </div>        
            ): null}
        </div>
    )
}

export default Course_groupDetails