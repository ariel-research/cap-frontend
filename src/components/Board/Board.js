import React, { useState, useEffect } from 'react';
import './Board.css';
import { API } from "../../api/api-service";
import { useCookies } from "react-cookie";

function Board(props) {

    const [course_group, setCourse_group] = useState([]);
    const [token] = useCookies(['mr-token']);
    let balance = 1000 - course_group.reduce(function (prev, current) {
        return prev + +current.score
    }, 0);



    useEffect(() => {
        API.getLast_ranking(token['mr-token'])
            .then(resp => setCourse_group(resp))
            .catch(error => console.log(error))
    }, [token])


    return (

        <div className='item-center' >
            <div className="justify-items-center item-center">
                <p className="ramainingTime">{props.time_message}</p>
                <div style={{ width: 'fit-content' }} className="alert alert-secondary item-center mb-2" role="alert">יתרת ניקוד: {balance}
                </div>
                <button data-testid="editButton" className="btn btn-lg btn-primary" onClick={props.EditClicked(balance)}>עריכה</button>
            </div>

            <div className='course_group bg-light'>
                <div data-testid="card" className='whiteLines overflow-auto  item-center'>
                    {course_group.map((course_group, index) => {
                    return (
                        <div key={index} className='item'>
                            <div className='item-title'>

                                <div className="i-name">

                                    <div data-testid="groupIndex" className='index ml-1 '>{index + 1}.</div>

                                    {/*course_group.overlap && <div style={{color: 'red'}} data-testid="groupName">{course_group.name}</div>*/}
                                    {!course_group.overlap && <div data-testid="groupName" className='name ml-2 text-right'>{course_group.name}</div>}
                                </div>

                                <div className="money number">{course_group.score} נק'</div>

                            </div>
                            <div className='item-details'>
                                <div data-testid="groupName" className='lecturer'>{course_group.lecturer}</div>
                            </div>


                            <div className='d-flex'>
                                <div data-testid="groupName " className="ml-2" >סמסטר {course_group.semester}'</div>
                                <div data-testid="groupName " className="ml-2">יום {course_group.day}'</div>
                                <div data-testid="groupName">{(course_group.time_start).substring(0, 5)}-{(course_group.time_end).substring(0, 5)}</div>
                            </div>
                        </div>
                    )
                })}
                </div> </div>
        </div>
    );
}

export default Board