import React, { useState } from 'react';
import BoardEditable from "./components/BoardEditable";
import Board from "./components/Board";
import Navbar from "./components/Navbar/Navbar";
import Course_groupDetails from './components/course_group-details';
import { API } from "./api-service";

function Ranking(props)
{
    const [edit, setEdit] = useState(false);
    
    const EditClicked = evt =>
    {
        setEdit(true);
    }

    const SaveClicked = course_group => evt =>
    {
        API.rank_courses(course_group)
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