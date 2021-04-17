import React from 'react'
import '../../src/App.css';


function Course_groupList(props) {
  const course_groupClicked = course_group => evt => {
    props.course_groupClicked(course_group)
  }
  return (
    <div>
      {
        props.course_group && props.course_group.map(course_group => {
          return (
            <div key={course_group.id} data-testid="courseGroup" className="itemName" onClick={course_groupClicked(course_group)}>{course_group.name}</div>
          )
        })
      }
    </div>

  )
}

export default Course_groupList