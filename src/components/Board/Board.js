import React, {useState, useEffect} from 'react';
import './Board.css';
import { API } from "../../api-service";
import { useCookies } from "react-cookie";

function Board(props)
{

    const [course_group, setCourse_group] = useState([]);
    const [ token ] = useCookies(['mr-token']);
    let balance = 1000 - course_group.reduce(function(prev, current) {
        return prev + +current.score
      }, 0);

    useEffect(()=>{
      API.getLast_ranking(token['mr-token'])
        .then(resp => setCourse_group(resp))
        .catch(error => console.log(error))
    }, [token])


    return (
        <div>
            <p className="ranking">דירוג קורסי בחירה</p>
            <div className="info">   סטודנט/ית יקר/ה<br/>
                        עלייך לחלק 1000 נקודות בין קורסי הבחירה לפי הדירוג המועדף עלייך *<br/>
                        ככל שתשקיע/י בקורס מסויים - כך יגדל הסיכוי לקבלו *<br/>
                        שים לב שלא תוכל לקבל קורס שקיבל 0 נקודות *<br/>
                        אם לא תזכ/י בקורס הרצוי, הנקודות יועברו אוטומטית לקורס הבא ברשימה שלך *<br/>
                        !בהצלחה
                    </div><br />
            <div className='container-rank'>
                <div className='course_group'>
                    <div className="title">
                        <p className="ramainingMoney">:הנקודות שנותרו לך<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{balance}</p>
                        <div>
                            <p className="ramainingTime">{props.time_message}</p>
                            <button style={{marginLeft:'30%',width:'40%', backgroundColor:'red'}} data-testid="editButton" className="btn btn-lg btn-primary" onClick={props.EditClicked(balance)}>עריכה</button>
                        </div>
                    </div>
                  
                    <div data-testid="card" className='whiteLines'>{ course_group.map((course_group, index) => {
                        return (
                            <div key={index} className='item'>
                                <div className='item-title'>
                                    <div className="money">סכום: {course_group.score}</div>
                                    <div data-testid="groupName" className='name'>{course_group.name}</div>
                                    <div data-testid="groupIndex" className='index'>.{index+1}</div>
                                </div>
                                <div className='item-details'>
                                    <div data-testid="groupName" className='hours'>בשעות: {(course_group.time_start).substring(0, 5)}-{(course_group.time_end).substring(0, 5)}</div>
                                    <div data-testid="groupName" className='lecturer'>מרצה: {course_group.lecturer}</div>
                                    <div data-testid="groupName" className='day'>יום: {course_group.day}</div>
                                    <div data-testid="groupName" className='semester'>סמסטר: {course_group.semester}</div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Board