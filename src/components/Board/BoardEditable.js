import React, {useState, useEffect} from 'react';
import './Board.css';
import { API } from "../../api-service";
import { useCookies } from "react-cookie";
import Slider from './slider';


function BoardEditable(props)
{
    const [course_group, setCourse_group] = useState([]);
    const [ token ] = useCookies(['mr-token']);
    const [ balance, setBalance ] = useState(props.balance);


    const changeSlide = (v,i) => {
        course_group[i].score=Number(v)
        console.log(course_group[i])
        setBalance(1000 - course_group.reduce(function(prev, current) {
            return prev + +current.score
          }, 0))
    }

    useEffect(()=>{
      API.getLast_ranking(token['mr-token'])
        .then(resp => setCourse_group(resp))
        .catch(error => console.log(error))
    },[] )



    return (
        <div>
            <h3>{props.time_message}</h3>
            <div className='container-rank'>
                <div className='course_group'>
                    <div className="title">
                        <h4>{balance} :הכסף שנותר לך</h4>
                        <h1>דירוג עדיפויות</h1>
                    </div>
                    <div data-testid="card">{ course_group.map((course_group, index) => {
                        return (
                            <div key={index} className='item'>
                                <Slider course_group={course_group} i={index} change={changeSlide}/>
                                <div data-testid="groupName" className='name'>{course_group.name}</div>
                                <div data-testid="groupIndex" className='index'>{index+1}</div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div className="col text-center">
                <button className="btn btn-lg btn-primary" onClick={props.SaveClicked(course_group, balance)}>שמור</button>
            </div>

        </div>
        
    );
}

export default BoardEditable