import React, { useState, useEffect } from 'react';
import "../Ranking/Ranking.css"
import Board from "../Board/Board";
import Navbar from "../Navbar/Navbar";
import Survey from "./Survey"

import {UserRoleRedirect} from "../Manage/UserRoleRedirect"
import { API } from "../../api/api-service";
import { useCookies } from "react-cookie";


function Feedback(props) {
   
    const [token] = useCookies(['mr-token']); 
    const [ranking_end, setRanking_end] = useState(false);
    const [course_group, setCourse_group] = useState([]);
    const [q_a_list, setQ_AList] = useState([]);
    const [email,setEmail] = useState('')

    useEffect(() => {
        UserRoleRedirect(token)
    },[token])

    useEffect(() => {
        API.getTime(token['mr-token'])
            .then(resp => {
                setRanking_end(resp['feedback'])
            })
            .catch(error => console.log(error))
        
        API.getLast_ranking(token['mr-token'])
        .then(resp => {setCourse_group(resp)})
        .catch(error => console.log(error))

        API.getStudentDetails(token['mr-token'])
        .then(resp => setEmail(resp['user']['email']))
        .catch(error => console.log(error))
        /*API.getQ_A(token['mr-token'])
        .then(resp => {setQ_AList(resp['q_a'])})
        .catch(error => console.log(error))*/

    }, [token])


    const changeCheckbox = (is_checked,i) => {      
        const updatedCourseGroup = Array.from(course_group); 
        updatedCourseGroup[i].result = is_checked;
        setCourse_group(updatedCourseGroup);
    }

    const SaveClicked = (course_group) => async (evt) => {
            API.save_results_feedback(course_group, token['mr-token'])
                .then(resp => {
                    alert("תודה על מילוי המשוב!")
                })
                .catch(error => console.log(error))
            
    }

    return (
        <div className="Rank" data-testid="Rank">
            <Navbar active='משוב' />
            <div className='text text-center '>
                <h1 className='Headline' >משוב שיבוצים</h1>
                <div className=" justify-content-center">
                <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="/feedback/#">שאלון</a>
                        <div>
                        <iframe src={`https://docs.google.com/forms/d/e/1FAIpQLSfJbjvgR8bv3-iGhkOD8CBqIhGuQCU_lfu7znoa8UZbbdUI9w/viewform?usp=pp_url&entry.348055013=${email}&embedded=true`} width="640" height="746" frameBorder="0" marginHeight="0" marginWidth="0">בטעינה…</iframe>
                            {/*q_a_list.map((q_a, index) => {
                                return (
                                    <div key={index} >
                                        {<Survey q_a= {q_a}/>}
                                    </div>
                                )})*/}
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/feedback/#" >מה קיבלתי</a>
                            <h2 className='text-center mt-5'><b>סמנו את הקורסים שקיבלתם</b></h2>
                            <div className='container-rank item-center'>
                                {ranking_end? <Board course_group = {course_group} setCourse_group = {setCourse_group} changeCheckbox = {changeCheckbox} feedback = {true} SaveClicked = {SaveClicked}/> : 'מילוי המשוב יהיה זמין לאחר הדירוג'}
                            </div>
                    </li>
                </ul>
                </div>
            </div>
        </div>
    )
}


export default Feedback;