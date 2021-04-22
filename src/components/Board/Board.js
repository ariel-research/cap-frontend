import React, {useState, useEffect} from 'react';
import './Board.css';
import { API } from "../../api-service";
import { useCookies } from "react-cookie";

function Board(props)
{

    const [course_group, setCourse_group] = useState([]);
    const [ token ] = useCookies(['mr-token']);

    useEffect(()=>{
      API.getLast_ranking(token['mr-token'])
        .then(resp => setCourse_group(resp))
        .catch(error => console.log(error))
    }, [])


    return (
        <div>
            <h3>{props.time_message}</h3>
            <div className='container-rank'>
                <div className='course_group'>
                    <h1>דירוג עדיפויות</h1>
                    <div data-testid="card">{ course_group.map((course_group, index) => {
                        return (
                            <div key={index} className='item'>
                                <div data-testid="groupName" className='name'>{course_group.name}</div>
                                <div data-testid="groupIndex" className='index'>{index+1}</div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div class="col text-center">
                <button data-testid="editButton" class="btn btn-lg btn-primary" onClick={props.EditClicked}>עריכה</button>
            </div>
        </div>
        
    );
}

export default Board