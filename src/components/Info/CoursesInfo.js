import React, { useState, useEffect } from 'react';
import './CoursesInfo.css';
import Navbar from "../Navbar/Navbar";
import UserRoleRedirect from "../Manage/UserRoleRedirect"
import { API } from '../../api/api-service';
import Timetable from "./Timetable";
import { useCookies } from "react-cookie";


function App() {

  /*const [course_group, setCourse_group] = useState([]);*/
  const [courses_A, setCourses_A] = useState([]);
  const [courses_B, setCourses_B] = useState([]);
  const [A_or_B, setA_or_B] = useState(false); //false is A

  const [token] = useCookies(['mr-token']);
  UserRoleRedirect()

  useEffect(() => {
    /*API.getCourse_group(token['mr-token'])
      .then(resp => setCourse_group(resp))
      .catch(error => console.log(error))*/
    API.getCoursesA(token['mr-token'])
      .then(resp => setCourses_A(resp))
      .catch(error => console.log(error))
    API.getCoursesB(token['mr-token'])
      .then(resp => setCourses_B(resp))
      .catch(error => console.log(error))
  }, [token])


  const buttonClicked = bool => evt => {
    setA_or_B(bool);
  }


  return (
    <div className="App">
      <Navbar active='פרטי הקורסים' />
      <header className="App-header">
      <h1 className="Headline">פרטי הקורסים</h1>
      </header>
      <h2 className='text-center mt-5'><b>מערכת שעות</b>
      <br/>
      {/*
      שימו לב: המערכת עדיין לא מעודכנת לשנת ה'תשפ"ד
      */}
      </h2>
      <div className="con-btn item-center">
        <button data-testid="semesterA" className="btn btn-primary" onClick={buttonClicked(false)}>סמסטר א</button>        
        <button data-testid="semesterB" className="btn btn-primary" onClick={buttonClicked(true)}>סמסטר ב</button>
      </div>
      <div className="item-center" style={{width:'90%'}}>
        {A_or_B ? (
          <Timetable course_group={courses_B} />
        ) : <Timetable course_group={courses_A} />
        }
      </div>

    </div>
  );
}

export default App;
