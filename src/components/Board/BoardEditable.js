import React, { useState, useEffect, useReducer } from 'react';
import './Board.css';
import { API } from "../../api/api-service";
import { useCookies } from "react-cookie";
import Slider from './slider';
import Checkbox from './Checkbox'
import Toast from './Toast'
import Switch from './Switch'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { usolve } from "mathjs"

function BoardEditable(props) {
  const [course_group, setCourse_group] = useState([]);
  const [token] = useCookies(['mr-token']);
  const [balance, setBalance] = useState(props.balance);
  //let student_details = JSON.parse(localStorage.getItem('student_details'));
  const [num_options, setNumOptions] = useState(0);
  const [num_courses_acceptable, setNumCoursesAcceptable] = useState(0)
  const [initializationDone, setInitializationDone] = useState(false); // New state variable
  const MAX_POINTS = 1000;  
  const getNumAcceptableCourses = () => { 
    return course_group.reduce((accumulator, currentValue) => {
      return  currentValue.is_acceptable? accumulator + 1 : accumulator 
     },0)
  }

  const handleEditClicked = () => {
    window.location.reload(false);
  }



  const suggestClicked = (event) => {
    const options = Number(num_options);
    const selectedOption = event.target.value;
    const updatedCourseGroup = Array.from(course_group);
    const partition = (i, weight) => {
      weight = parseInt(weight)
      updatedCourseGroup[i].score = weight
    }
    
    if (selectedOption === 'e') { //equal partition

      let weight = MAX_POINTS / num_courses_acceptable;
      for (let i = 0; i < options; i++) {
        if (updatedCourseGroup[i].is_acceptable)
          partition(i, weight);
      }
    }
    else if (selectedOption === 'o') { //partition by list order

      let factor = (num_courses_acceptable * 0.5) * (num_courses_acceptable + 1);
      const a = [[factor]];
      const b = [MAX_POINTS];
      const x = usolve(a, b)[0][0];
      let i_partition = 0;
      for (let i=0; i<options; i++){
        if (updatedCourseGroup[i].is_acceptable){
          const weight = x * (num_courses_acceptable - i_partition)
          partition(i, weight);
          i_partition++;
        }
      }
    }
    else if (selectedOption === 'z') { //reset all scores
      for (let i = 0; i < options; i++) {
        partition(i, 0);
      }
    }
    
    const temp_balance = (MAX_POINTS - updatedCourseGroup.reduce(function (prev, current) {
      return prev + +current.score
    }, 0))

    /* if (temp_balance < MAX_POINTS)
      //add the reminder(balance) to the top course
      updatedCourseGroup[0].score += temp_balance
    */
    setCourse_group(updatedCourseGroup);
    setBalance(temp_balance)

  };


  const handleDragEnd = (result, disabled=true) => {
    if (!result.destination) return; // Not a valid drop target
    const { source, destination } = result;
    const updatedCourseGroup = Array.from(course_group);

    // Reorder the course cards
    const [removed] = updatedCourseGroup.splice(source.index, 1);
    updatedCourseGroup.splice(destination.index, 0, removed);
    // Update the state with the new order
    setCourse_group(updatedCourseGroup);

  };

  const changeCheckbox = (is_checked,i) => {      
    const updatedCourseGroup = Array.from(course_group); 
    
    updatedCourseGroup[i].is_acceptable = is_checked;
    if (!is_checked){   
      setBalance(balance+updatedCourseGroup[i].score)
      updatedCourseGroup[i].score = 0;
      setNumCoursesAcceptable(num_courses_acceptable-1);
      /*if (i!=course_group.length-1){
        const finalIndex = course_group.length - 1;  
        const [removed] = updatedCourseGroup.splice(i, 1);
        updatedCourseGroup.splice(finalIndex, 0, removed);
      }*/
    }
    else{
      setNumCoursesAcceptable(num_courses_acceptable+1);
    }
    setCourse_group(updatedCourseGroup);


  }
  const changeSlide = (v, i) => {
    course_group[i].score = Number(v)
    setBalance(MAX_POINTS - course_group.reduce(function (prev, current) {
      return prev + +current.score
    }, 0))
    
  }

  useEffect(() => {
    if (course_group.length>0 && !initializationDone) { // Check if initialization is done
      setNumOptions(course_group.length);
      setNumCoursesAcceptable(getNumAcceptableCourses());
      setInitializationDone(true); // Set the flag to true after initialization
    }
  }, [course_group]);


  useEffect(() => {
    API.getLast_ranking(token['mr-token'])
      .then(resp => {
        setCourse_group(resp)
      })
      .catch(error => console.log(error))
  }, [token])



  return (

    <div className='item-center' >
      <div className="justify-items-center item-center">
        <p className="ramainingTime">{props.time_message}</p>
        <div style={{ width: 'fit-content' }} className="alert alert-secondary item-center mb-2" role="alert">יתרת ניקוד: {balance}</div>
      </div>
      <button className="btn btn-primary ml-2" onClick={props.SaveClicked(course_group, balance)}>שמירת הדירוג</button>
      <button className="btn btn-secondary " onClick={() => handleEditClicked(false)}>ביטול</button>

      <div className="rowC justify-content-center container-fluid mt-3">
        <div>
          <div className="btn-group" role="group" aria-label="Basic outlined example" onClick={suggestClicked}>
            <button type="button" value="o" className="btn btn-outline-primary" >חלוקה לפי הסדר</button>
            <button type="button" value="e" className="btn btn-outline-primary" >חלוקה שווה</button>
            <button type="button" value="z" className="btn btn-outline-primary" >איפוס הכל</button>
          </div>
        </div>
      </div>
      
      <button type="button" class="btn btn-primary" id="liveToastBtn">Show live toast</button>

<div class="position-fixed bottom-0 end-0 p-3 toast-score">
  <div id="liveToast" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>
      <div className='course_group bg-light'>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="course-group">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                data-testid="card" className='whiteLines overflow-auto  item-center'
              >
                {course_group.map((course, index) => (
                  <Draggable
                    key={index}
                    draggableId={`course-${index}`}
                    index={index}
                    
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="item"
                      >
                        <div className="item-title">
                          <div className="i-name">

                            <div data-testid="groupIndex" className='index ml-1 '>{index + 1}.</div>
                            {/*course.overlap && <div style={{color: 'red'}} data-testid="groupName">{course.name}</div>*/}
                            {!course.overlap && <div data-testid="groupName" className='name ml-2 text-right'>{course.name}</div>}
                          </div>
                          {<Slider course={course} i={index} balance={balance} change={changeSlide}/>}
                          
                        </div>
                        <div className='item-details'>
                          {<div data-testid="groupName" className='lecturer'>{course.lecturer}</div>}
                        </div>

                        <div className='d-flex'>
                          
                          {<div data-testid="groupName " className="ml-2" >סמסטר {course.semester}'</div>}
                          {<div data-testid="groupName " className="ml-2">יום {course.day}'</div>}
                          {<div data-testid="groupName">{(course.time_start).substring(0, 5)}-{(course.time_end).substring(0, 5)}</div>}
                          <div className="mr-auto">
                            {<Checkbox course={course} i={index} change={changeCheckbox} />}
                            {/*<Switch course={course} i={index} change={changeCheckbox} />*/}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </div>

    </div>
  );
}

export default BoardEditable