import React, { useState, useEffect } from 'react';
import BoardEditable from "./components/BoardEditable";
import Board from "./components/Board";
import Navbar from "./components/Navbar/Navbar";
import Course_groupDetails from './components/course_group-details';
import { API } from "./api-service";
import { useCookies } from "react-cookie";

function Ranking(props)
{
    const [edit, setEdit] = useState(false);
    const [ token ] = useCookies(['mr-token']);

    useEffect( () => {
        console.log(token);
        if(!token['mr-token']) window.location.href = '/';
    }, [token])

    const EditClicked = evt =>
    {
        setEdit(true);
    }

    const SaveClicked = course_group => evt =>
    {
        API.rank_courses(course_group, token['mr-token'])
        .then(resp => console.log(resp))
        .catch(error => console.log(error))
        window.location.reload(false);
        setEdit(false);
    }
    

    if(edit === false)
    {
        return(
            <div className="Rank">
                <Navbar/>
                <Board EditClicked= {EditClicked}/>      
            </div>
        )
    }
    if(edit === true)
    {
        return(
            <div className="Rank">
                <Navbar/>
                <BoardEditable SaveClicked= {SaveClicked}/>      
            </div>
        )
    }
    
}

export default Ranking;