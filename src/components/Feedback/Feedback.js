import React, { useState, useEffect } from 'react';
import "../Ranking/Ranking.css"
import Board from "../Board/Board";
import Navbar from "../Navbar/Navbar";
import {UserRoleRedirect} from "../Manage/UserRoleRedirect"
import { API } from "../../api/api-service";
import { useCookies } from "react-cookie";

function Feedback(props) {
   
    const [token] = useCookies(['mr-token']); 
    const [ranking_end, setRanking_end] = useState(false);
    const [course_group, setCourse_group] = useState([]);

    useEffect(() => {
        UserRoleRedirect(token)
    },[token])

    useEffect(() => {
        API.getTime(token['mr-token'])
            .then(resp => {
                setRanking_end(resp['feedback'])
            })
            .catch(error => console.log(error))
    }, [token])

    useEffect(() => {
        API.getLast_ranking(token['mr-token'])
            .then(resp => {setCourse_group(resp)})
            .catch(error => console.log(error))
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
                <h2 className='text-center mt-5'><b>סמנו את הקורסים שקיבלתם</b></h2>
                </div>
                <div className='container-rank item-center'>
                    {ranking_end? <Board course_group = {course_group} setCourse_group = {setCourse_group} changeCheckbox = {changeCheckbox} feedback = {true} SaveClicked = {SaveClicked}/> : 'מילוי המשוב יהיה זמין לאחר הדירוג'}
                </div>
            </div>
        </div>
    )
}


export default Feedback;