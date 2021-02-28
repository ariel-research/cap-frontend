import React, {useState, useEffect} from 'react';
import './App.css';
import Course_groupList from './components/course_group-list';
import Course_groupDetails from './components/course_group-details';
import Navbar from "./components/Navbar/Navbar";
import {API} from './api-service';
import Timetable from "./components/timetable";

function App() {

  const [course_group, setCourse_group] = useState([]);
  const [courses_A, setCourses_A] = useState([]);
  const [courses_B, setCourses_B] = useState([]);
  const [selectedCourse_group, setSelectedCourse_group ] = useState(null);
  const [A_or_B, setA_or_B] = useState(false); //false is A

  
  useEffect(()=>{
    API.getCourse_group()
    .then(resp => setCourse_group(resp))
    .catch(error => console.log(error))
    API.getCoursesA()
      .then(resp => setCourses_A(resp))
      .catch(error => console.log(error))
    API.getCoursesB()
      .then(resp => setCourses_B(resp))
      .catch(error => console.log(error))
  }, [])

  const course_groupClicked = course_group =>
  {
    setSelectedCourse_group(course_group);
  } 

  const buttonClicked = bool => evt =>
  {
    setA_or_B(bool);
  }


  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
        <h1>מידע על קורסי הבחירה</h1>
      </header>

      <div className="layout">
        <Course_groupDetails course_group= {selectedCourse_group} />
        <Course_groupList course_group={course_group} course_groupClicked= {course_groupClicked} />
      </div>
      <div className="layout-button">
            <button class="semester-button" onClick={buttonClicked(false)}>סמסטר א</button>
            <button class="semester-button" onClick={buttonClicked(true)}>סמסטר ב</button>
      </div>
      <div>
        {A_or_B ? (
          <Timetable course_group={courses_B}/>
          ): <Timetable course_group={courses_A}/>
        }        
      </div>

    </div>
  );
}

export default App;
