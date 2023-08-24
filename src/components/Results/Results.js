import React, { useState, useEffect} from 'react';
import Navbar from "../Navbar/Navbar";
import { useCookies } from "react-cookie";
import {UserRoleRedirect} from "../Manage/UserRoleRedirect"
import './Results.css'

function Results(props)
{
    const [courses, setCourses] = useState([]);
    const [token] = useCookies(['mr-token']);

    useEffect(() => {
        UserRoleRedirect(token)
    },[token])

    if(courses.length === 0)
    {
        return(
            <div className="Rank">
                <Navbar active='תוצאות'/>
                <h1 className='Headline'>קורסי הבחירה שקיבלת הם:</h1>
                <div className='container-rank' style={{width: '65%', marginLeft: '17.5%',marginTop:'50px'}}>
                    <div className='course_group'>
                       
                        <div className='whiteLines'>
                            <div className='item' >
                                <div style={{marginLeft:'40%'}}>אין עדין תוצאות </div>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        )
    }
    else
    {
        return(
            <div className="Rank">
                <Navbar active='תוצאות'/>
                <p className="results"> תוצאות </p>
                <div className='container-rank' >
                    <div className='course_group'>
                        <h1 style={{marginLeft:'10%'}}>הקורסים אליהם שובצת</h1>
                        <div className='whiteLines'>
                            { courses.map((course, index) => {
                            return (
                                <div key={index} className='item'>
                                    <div className='item-title'>
                                        <div className="money"> הדירוג שלך: {course.rank}</div>
                                        <div className='name'>{course.course_group}</div>
                                        <div className='index'>.{index+1}</div>
                                    </div>
                                    <div className='item-details'>
                                        <div> ביום: {course.day} בשעות: {(course.time_start).substring(0, 5)}-{(course.time_end).substring(0, 5)}</div>
                                        <div> סמסטר: {course.Semester}</div>
                                        <div> מרצה: {course.lecturer}</div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>        
            </div>
        )
    }
    
}

export default Results;