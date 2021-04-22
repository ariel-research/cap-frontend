import React, { useState, useEffect } from 'react';
import BoardEditable from "../Board/BoardEditable";
import Board from "../Board/Board";
import Navbar from "../Navbar/Navbar";
import { API } from "../../api-service";
import { useCookies } from "react-cookie";

function Ranking(props)
{
    const [edit, setEdit] = useState(false);
    const [time_message, setTime_message] = useState("");
    const [ranking_start, setRanking_start] = useState(false);
    const [ token ] = useCookies(['mr-token']);

    useEffect( () => {
        if(!token['mr-token']) window.location.href = '/';
    }, [token])

    useEffect(()=>{
        API.getTime(token['mr-token'])
          .then(resp => {
            setTime_message(resp['message'])
            setRanking_start(resp['value'])
            console.log(time_message)
          })
          .catch(error => console.log(error))
      }, [])

    const EditClicked = evt =>
    {
        if(ranking_start)
            setEdit(true);
        else
            alert("ההרשמה סגורה");
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
                <Board EditClicked= {EditClicked} time_message={time_message}/>      
            </div>
        )
    }
    if(edit === true)
    {
        return(
            <div className="Rank" data-testid="RankEdit">
                <Navbar/>
                <BoardEditable SaveClicked= {SaveClicked} time_message= {time_message}/>      
            </div>
        )
    }
    
}

export default Ranking;