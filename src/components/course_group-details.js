import React from 'react'

function CoursegroupDetails(props) {
    return (
        <div>
            {props.course_group ? (
                <div dir="rtl">
                    <h2 data-testid="selectedCourseName">{props.course_group.name}</h2>
                    <div>{props.course_group.courses.map((course, i) => {
                        return (
                            <ul className="courses" data-testid="courseDetails" key={course.course_id}>
                                <h3 style={{marginRight:'35%'}}data-testid={`courseOption${i}`}>אופצייה: {i + 1}</h3>
                                <li data-testid={`courseSemester${i}`}>סמסטר: {course.Semester}</li>
                                <li data-testid={`teacherName${i}`}>שם המרצה: {course.lecturer}</li>
                                <li data-testid={`numOfStudents${i}`}>מכסת סטודנטים: {course.capacity}</li>

                            </ul>
                        )
                    })}</div>
                </div>
            ) : null}
        </div>
    )
}

export default CoursegroupDetails