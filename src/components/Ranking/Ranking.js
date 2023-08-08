import React, { useState, useEffect } from 'react';
import BoardEditable from "../Board/BoardEditable";
import "./Ranking.css"
import Board from "../Board/Board";
import Navbar from "../Navbar/Navbar";
import { API } from "../../api/api-service";
import { useCookies } from "react-cookie";

function Ranking(props) {
    const [edit, setEdit] = useState(false);
    const [balance, setBalance] = useState();
    const [time_message, setTime_message] = useState("");
    const [ranking_start, setRanking_start] = useState(false);
    const [token] = useCookies(['mr-token']);

    useEffect(() => {
        if (!token['mr-token']) window.location.href = '/';
        API.studentOrOffice(token['mr-token'])
            .then(resp => {
                if (resp === 2) //office
                    window.location.href = '/office';
                if (resp === 3) //error
                    alert("error")
            })
            .catch(error => console.log(error))
    }, [token])

    useEffect(() => {
        API.getTime(token['mr-token'])
            .then(resp => {
                setTime_message(resp['message'])
                setRanking_start(resp['value'])
            })
            .catch(error => console.log(error))
    }, [token, time_message])


    const EditClicked = b => evt => {
        if (ranking_start) {
            setEdit(true);
            setBalance(b);
        }
        else
            alert("ההרשמה סגורה");
    }
    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }
    const SaveClicked = (course_group, bal) => async (evt) => {
        if (bal === 0) {
            API.rank_courses(course_group, token['mr-token'])
                .then(resp => console.log(resp))
                .catch(error => console.log(error))
            await timeout(1000);
            window.location.reload(false);
            setEdit(false);
        }
        else
            alert("סכום הנקודות שנותר חייב להיות בדיוק 0");

    }


    return (
        <div className="Rank" data-testid="Rank">
            <Navbar active='דירוג קורסי בחירה' />
            <div className='text text-center '>
                <h1 className='Headline' >דירוג קורסי בחירה</h1>
                <div className=" justify-content-center">
                    <div className="accordion mt-2 " id="accor-how">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    איך מדרגים?
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accor-how">
                                <div className="accordion-body">
                                    <ul>

                                        <li>יש לחלק 1000 נקודות בין קורסי הבחירה לפי העדפה</li>
                                        <li>ניתן להשתמש בחיצי המקלדת לדירוג מדויק יותר</li>
                                        <li>ניתן לגרור את הקורסים על מנת להשתמש בהצעות לחלוקת ניקוד</li>
                                        <li>ככל שיש יותר נקודות עבור קורס מסויים - גדל הסיכוי לקבלו</li>
                                    </ul>
                                    <hr />
                                    <div className='text-right fw-bold'>יש ללחוץ על עריכה על מנת להתחיל בדירוג</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion" id="accor-danger">
                        <div className="accordion-item accordion-danger">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed accordion-danger" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" data-bs-parent="#accor-danger" aria-expanded="true" aria-controls="collapseTwo">
                                    שימו לב
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse " aria-labelledby="headingTwo" data-bs-parent="#accor-danger">
                                <div className="accordion-body">
                                    <ul>
                                        <li>לא ניתן לקבל קורס שלא סומן כאופציונלי</li>
                                        <li>בעת שמירת הדירוג, יתרת הדירוג חייבת לעמוד על 0 נקודות בדיוק</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-rank item-center'>

                    {!edit ?
                        <Board EditClicked={EditClicked} time_message={time_message} />

                        :
                        <BoardEditable SaveClicked={SaveClicked} time_message={time_message} balance={balance} />
                    }

                </div>
            </div>
        </div>
    )
}


export default Ranking;