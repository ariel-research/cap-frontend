import React from 'react'

function CoursegroupDetails(props) {
    return (
        <div>
            {props.course_group ? (
                <div>{props.course_group.courses.map((course, i) => {
                    return (
                        <ol className="list-group list-group" data-testid="courseDetails" key={course.course_id}>
                            <li className="list-group-item d-flex justify-content-between align-items-start" >
                                <div className="ms-2 me-auto align-text-right courses">
                                    <div className="fw-bold">קורס: {course.name}</div>
                                    <div className="fw-bold" data-testid={`courseOption${i}`}>קבוצה {i + 1}</div>
                                    <div data-testid={`courseSemester${i}`}>סמסטר: {course.Semester}</div>
                                    <div data-testid={`teacherName${i}`}>שם המרצה: {course.lecturer}</div>

                                </div>
                                <span className="badge bg-primary rounded-pill">{course.capacity}</span>
                            </li>

                        </ol>
                    )
                })}</div>
            ) : null}
        </div>
    )
}

export default CoursegroupDetails