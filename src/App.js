import React, { useState, useEffect } from 'react';
import './App.css';
import CoursegroupList from './components/course_group-list';
import CoursegroupDetails from './components/course_group-details';
import Navbar from "./components/Navbar/Navbar";
import { API } from './api-service';
import Timetable from "./components/timetable";
import { useCookies } from "react-cookie";


function App() {

  const [course_group, setCourse_group] = useState([]);
  const [courses_A, setCourses_A] = useState([]);
  const [courses_B, setCourses_B] = useState([]);
  const [selectedCourse_group, setSelectedCourse_group] = useState(null);
  const [A_or_B, setA_or_B] = useState(false); //false is A

  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    API.getCourse_group(token['mr-token'])
      .then(resp => setCourse_group(resp))
      .catch(error => console.log(error))
    API.getCoursesA(token['mr-token'])
      .then(resp => setCourses_A(resp))
      .catch(error => console.log(error))
    API.getCoursesB(token['mr-token'])
      .then(resp => setCourses_B(resp))
      .catch(error => console.log(error))
  }, [token])

  useEffect(() => {
    if (!token['mr-token']) window.location.href = '/';
    else
    {
        API.studentOrOffice(token['mr-token'])
        .then(resp => {                
            if(resp === 2) //office
                window.location.href = '/office';
            if(resp === 3) //error
                alert("error")
        })
        .catch(error => console.log(error))
    } 
  }, [token])

  const course_groupClicked = course_group => {
    setSelectedCourse_group(course_group);
  }

  const buttonClicked = bool => evt => {
    setA_or_B(bool);
  }


  return (
    <div className="App">
      <Navbar active='מידע על קורסי הבחירה' />
      <header className="App-header">
      <div className="Headline">מידע על קורסי הבחירה</div>
      </header>
      <div className="layout">
        <CoursegroupDetails course_group={selectedCourse_group} />
        <CoursegroupList course_group={course_group} course_groupClicked={course_groupClicked} />
      </div>
      <div className="con-btn">
        <button data-testid="semesterB" className="try" onClick={buttonClicked(true)}>סמסטר ב</button>
        <button data-testid="semesterA" className="try" onClick={buttonClicked(false)}>סמסטר א</button>
      </div>
      <h5 style={{marginRight:'37%',marginTop:'15px'}}>שים לב, הקורסים באדום הם קורסי החובה שלך *</h5>

      <div>
        {A_or_B ? (
          <Timetable course_group={courses_B} />
        ) : <Timetable course_group={courses_A} />
        }
      </div>

    </div>
  );
}

export default App;
