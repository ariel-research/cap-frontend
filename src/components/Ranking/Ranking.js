import React, { useState, useEffect } from 'react';
import BoardEditable from "../Board/BoardEditable";
import Board from "../Board/Board";
import Navbar from "../Navbar/Navbar";
import { API } from "../../api-service";
import { useCookies } from "react-cookie";

function Ranking(props)
{
    const [edit, setEdit] = useState(false);
    const [balance, setBalance] = useState();
    const [time_message, setTime_message] = useState("");
    const [ranking_start, setRanking_start] = useState(false);
    const [ token ] = useCookies(['mr-token']);

    useEffect( () => {
        if(!token['mr-token']) window.location.href = '/';
        API.studentOrOffice(token['mr-token'])
        .then(resp => {                
            if(resp === 2) //office
                window.location.href = '/office';
            if(resp === 3) //error
                alert("error")
        })
        .catch(error => console.log(error))
    }, [token])

    useEffect(()=>{
        API.getTime(token['mr-token'])
          .then(resp => {
            setTime_message(resp['message'])
            setRanking_start(resp['value'])
          })
          .catch(error => console.log(error))
      }, [token, time_message])


    const EditClicked = b => evt =>
    {
        if(ranking_start)
        {
            setEdit(true);
            setBalance(b);
        }
        else
            alert("ההרשמה סגורה");
    }

    const SaveClicked = (course_group, bal) => evt =>
    {
        if(bal>=0)
        {
            API.rank_courses(course_group, token['mr-token'])
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
            window.location.reload(false);
            setEdit(false);
        }
        else
            alert("סכום הכסף שנותר חייב להיות לפחות 0");

    }
    

    if(edit === false)
    {
        return(
            <div className="Rank" data-testid="Rank">
                <Navbar sticky="top"/>
                <Board EditClicked= {EditClicked} time_message={time_message}/>      
            </div>
        )
    }
    if(edit === true)
    {
        return(
            <div className="Rank" data-testid="RankEdit">
                <Navbar/>
                <BoardEditable SaveClicked= {SaveClicked} time_message= {time_message} balance={balance}/>      
            </div>
        )
    }
    
}

export default Ranking;