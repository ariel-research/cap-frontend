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
    },[token] )



    return (
        <div>
              <p className="ranking">דירוג קורסי בחירה</p>
              <div className="info">   סטודנט/ית יקר/ה<br/>
                        עלייך לחלק 1000 נקודות בין קורסי הבחירה לפי הדירוג המועדף עלייך *<br/>
                        ככל שתשקיע/י בקורס מסויים - כך יגדל הסיכוי לקבלו *<br/>
                        אם לא תזכ/י בקורס הרצוי, הנקודות יועברו אוטומטית לקורס הבא ברשימה שלך *<br/>
                        !בהצלחה
                    </div><br />
             <div className='container-rank'>
                <div className='course_group'>
                    <div className="title">
                        <p className="ramainingMoney">:הנקודות שנותרו לך<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{balance}</p>
                        <p className="ramainingTime">{props.time_message}</p>
                    </div>
                    <div data-testid="card" className='whiteLines'>{ course_group.map((course_group, index) => {
                        return (
                            <div key={index} className='item'>
                                <Slider course_group={course_group} i={index} change={changeSlide}/>
                                <div data-testid="groupName" className='name'>{course_group.name}</div>
                                <div data-testid="groupIndex" className='index'>.{index+1}</div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            </div>
            <div className="col text-center">
                <button style={{marginBottom:'50px'}} className="btn btn-lg btn-primary" onClick={props.SaveClicked(course_group, balance)}>שמירה</button>
            </div>

        </div>
        
    );
}

export default BoardEditable