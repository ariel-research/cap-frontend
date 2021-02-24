import React, {useState, useEffect} from 'react';
import './App.css';
import Course_groupList from './components/course_group-list';
import Course_groupDetails from './components/course_group-details';
import Navbar from "./components/Navbar/Navbar";
import {API} from './api-service';
import Timetable from "./components/timetable";

function App() {

  const [course_group, setCourse_group] = useState([]);
  const [selectedCourse_group, setSelectedCourse_group ] = useState(null);
  
  useEffect(()=>{
    API.getCourse_group()
      .then(resp => setCourse_group(resp))
      .catch(error => console.log(error))
  }, [])

  const course_groupClicked = course_group =>
  {
    setSelectedCourse_group(course_group);
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
      <div>
        <Timetable course_group={course_group}/>
      </div>

    </div>
  );
}

export default App;
