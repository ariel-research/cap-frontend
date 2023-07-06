import React from 'react'
import '../../src/App.css';


function CoursegroupList(props) {
  const course_groupClicked = course_group => evt => {
    props.course_groupClicked(course_group)
  }
  return (
    
    
    <div className='overflow-auto list-scroll' >
      {
        props.course_group && props.course_group.map(course_group => {
          return (
            
          <div className="list-group w-75 ">
              <button type="button"  key={course_group.id} data-testid="courseGroup" 
              className="list-group-item list-group-item-action" onClick={course_groupClicked(course_group)} aria-current="true">
                {course_group.name}
                </button>
              </div>
              
          )
        })
      }
    </div>
  )
}

export default CoursegroupList