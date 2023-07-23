import React, { useState, useEffect } from 'react';
import './Board.css';
import { API } from "../../api-service";
import { useCookies } from "react-cookie";
import Slider from './slider';
import assi from './assi.png';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { usolve } from "mathjs"

function BoardEditable(props) {
  const [course_group, setCourse_group] = useState([]);
  const [token] = useCookies(['mr-token']);
  const [balance, setBalance] = useState(props.balance);
  //let student_details = JSON.parse(localStorage.getItem('student_details'));
  const [num_options, setNumOptions] = useState(10);
  const [selectedOption, setSelectedOption] = useState(''); // State for selected option
  const MAX_POINTS = 1000;
  const [num_courses_disabled, setNumCoursesDisabled] = useState(false);

  const handleEditClicked = () => {
    window.location.reload(false);
  }

  const handleOptionChange = (event) => {
    const value = event.target.value
    setSelectedOption(value);
    if (value === 'z')
      setNumCoursesDisabled(true)
    else
      setNumCoursesDisabled(false)


  };

  const handleNumOptionsChange = (event) => {

    const value = event.target.value
    if (value > 0 && value <= course_group.length)
      setNumOptions(value)
  };


  const suggestClicked = () => {
    const options = Number(num_options);
    const updatedCourseGroup = Array.from(course_group);
    const partition = (i, weight) => {
      weight = parseInt(weight)
      console.log(updatedCourseGroup[i], weight)
      updatedCourseGroup[i].score = weight
    }

    for (let i = options; i < course_group.length; i++) { //reset all the rest courses
      partition(i, 0);
    }

    if (selectedOption === 'e') { //equal partition


      let weight = MAX_POINTS / options;
      for (let i = 0; i < options; i++) {

        partition(i, weight);
      }
    }
    else if (selectedOption === 'o') { //partition by list order

      let factor = (options * 0.5) * (options + 1);
      const a = [[factor]];
      const b = [MAX_POINTS];
      const x = usolve(a, b)[0][0];

      const weights = Array.from({ length: options }, (_, i) =>
        (x * (options - i))
      );

      weights.forEach((weight, i) => {
        partition(i, weight);
      })
    }
    else if (selectedOption === 'z') { //reset all score
      for (let i = 0; i < options; i++) {
        partition(i, 0);
      }
    }

    const temp_balance = (MAX_POINTS - updatedCourseGroup.reduce(function (prev, current) {
      return prev + +current.score
    }, 0))

    if (temp_balance < MAX_POINTS)
      //add the reminder(balance) to the top course
      updatedCourseGroup[0].score += temp_balance

    setCourse_group(updatedCourseGroup);
    setBalance(0)

  };




  const handleDragEnd = (result) => {
    if (!result.destination) return; // Not a valid drop target

    const { source, destination } = result;
    const updatedCourseGroup = Array.from(course_group);

    // Reorder the course cards
    const [removed] = updatedCourseGroup.splice(source.index, 1);
    updatedCourseGroup.splice(destination.index, 0, removed);

    // Update the state with the new order
    setCourse_group(updatedCourseGroup);

  };

  const changeSlide = (v, i) => {
    course_group[i].score = Number(v)
    setBalance(1000 - course_group.reduce(function (prev, current) {
      return prev + +current.score
    }, 0))
  }

  useEffect(() => {
    API.getLast_ranking(token['mr-token'])
      .then(resp => setCourse_group(resp))
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
        <img src={assi} width={30} height={30} alt="assistant" />
        <div className="container-bubbletext " alt="assistant" >
          <div>
            <div className="dropdown mr-5">
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="">בחרו חלוקת ניקוד</option>
              <option value="o">חלוקה לפי הסדר</option>
              <option value="e">חלוקה שווה</option>
              <option value="z">איפוס הכל</option>
            </select>
          </div>
            <div className="rowC mr-5">עבור <input
              type="number"
              onChange={event => handleNumOptionsChange(event)}
              value={num_options}
              disabled={num_courses_disabled}
              min={0}
              max={course_group.length}
            /> הקורסים העליונים</div>
            </div>
          <button className="btn btn-primary mr-4" onClick={suggestClicked}>הצע חלוקת ניקוד</button>
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
                {course_group.map((course_group, index) => (
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
                            {/*course_group.overlap && <div style={{color: 'red'}} data-testid="groupName">{course_group.name}</div>*/}
                            {!course_group.overlap && <div data-testid="groupName" className='name ml-2 text-right'>{course_group.name}</div>}

                          </div>
                          {<Slider course_group={course_group} i={index} change={changeSlide} />}
                        </div>
                        <div className='item-details'>
                          {<div data-testid="groupName" className='lecturer'>{course_group.lecturer}</div>}
                        </div>

                        <div className='d-flex'>
                          {<div data-testid="groupName " className="ml-2" >סמסטר {course_group.semester}'</div>}
                          {<div data-testid="groupName " className="ml-2">יום {course_group.day}'</div>}
                          {<div data-testid="groupName">{(course_group.time_start).substring(0, 5)}-{(course_group.time_end).substring(0, 5)}</div>}
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