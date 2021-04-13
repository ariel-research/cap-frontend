import React, { useState, useEffect } from 'react';
import BoardEditable from "../Board/BoardEditable";
import Board from "../Board/Board";
import Navbar from "../Navbar/Navbar";
import Course_groupDetails from '../course_group-details';
import { API } from "../../api-service";
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
            <div className="Rank" data-testid="Rank">
                <Navbar/>
                <Board EditClicked= {EditClicked}/>      
            </div>
        )
    }
    if(edit === true)
    {
        return(
            <div className="Rank" data-testid="RankEdit">
                <Navbar/>
                <BoardEditable SaveClicked= {SaveClicked}/>      
            </div>
        )
    }
    
}

export default Ranking;