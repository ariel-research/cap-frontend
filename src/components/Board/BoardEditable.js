import React, {useState, useEffect} from 'react';
import './Board.css';
import { API } from "../../api-service";
import { useCookies } from "react-cookie";
import Slider from './slider';
import CLIPPY from './CLIPPY-00.png'; // Tell webpack this JS file uses this image

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {usolve} from "mathjs"

function BoardEditable(props)
{
    const [course_group, setCourse_group] = useState([]);
    const [ token ] = useCookies(['mr-token']);
    const [ balance, setBalance ] = useState(props.balance);
    const [ max_options, setMaxOptions] = useState(5);
    const [selectedOption, setSelectedOption] = useState(''); // State for selected option
    const MAX_POINTS = 1000;
    
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };  
    
    const suggestClicked = () => {
      const options =Number(max_options);
      
      if(selectedOption=== 'e'){ //equal partition
    
        
        let weight =MAX_POINTS/options;
        
        //add the reminder(extra) to the top course
        //const extra = parseInt((weight - parseInt(weight))*options) 
        //partition(0,weight+extra);

        for (let i = 0; i <options; i++) {
          
            partition(i,weight);
        }
      }
      else if (selectedOption=== 'o'){ //partition by list order
        orderPartition();
      }
      else if (selectedOption === 'z'){ //reset all score
        for (let i = 0; i <options; i++) {
          
          partition(i,0);
        }
      }
      setBalance(MAX_POINTS - course_group.reduce(function(prev, current) {
        return prev + +current.score
        }, 0))
        };  

    const partition = (i,weight) => {
        weight = parseInt(weight)
        course_group[i].score = weight

    }

    const orderPartition = () => {
    
      const options =Number(max_options);
      let factor = (options*0.5)*(options+1);
      const a = [[factor]];
      const b = [MAX_POINTS];
      const x = usolve(a,b)[0][0];
      let extra = 0;
      //add the reminder(extra) to the top course
      

      /*for (let i =0; i <options; i++) {
        
        const weight =parseInt( x*(options-i))
        partition(i,weight)
      }*/
      const weights = Array.from({ length: options }, (_, i) =>
      (x * (options - i))
      );

      weights.forEach((weight, i) =>{
        //extra += (weight - parseInt(weight))
        partition(i, weight);
      })
      //partition(0,weights[0]+extra)
    }
    const handleDragEnd = (result) => {
      if (!result.destination) return; // Not a valid drop target
      
      const { source, destination } = result;
      const updatedCourseGroup = Array.from(course_group);

      // Reorder the course cards
      const [removed] = updatedCourseGroup.splice(source.index, 1);
      updatedCourseGroup.splice(destination.index, 0, removed);
      
      // Update the state with the new order
      setCourse_group(updatedCourseGroup);
      
    };

    const changeSlide = (v,i) => {
        course_group[i].score=Number(v)
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
                        שימ/י לב שלא תוכל לקבל קורס שקיבל 0 נקודות *<br/>
                        אם לא תזכ/י בקורס הרצוי, הנקודות יועברו אוטומטית לקורס הבא ברשימה שלך *<br/>
                        !בהצלחה
                        שימ/י לב שלא ניתן לשמור דירוג עם סכום נקודות שלילי *<br/>
                        ניתן להשתמש בחיצי המקלדת לדירוג מדויק יותר *<br/>
                        שימ/י לב קורסי בחירה שבצבע אדום מתנגשים לך עם קורסי חובה *<br/>
                </div><br />
             <div className='container-rank'>
                <div className='course_group'>
                    <div className="title">
                        <p className="ramainingMoney">:הנקודות שנותרו לך<br></br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{balance}</p>
                        <div>
                            <p className="ramainingTime">{props.time_message}</p>
                            <button className="button-nice" style={{marginLeft:'30%',width:'40%', backgroundColor:'black'}} onClick={props.SaveClicked(course_group, balance)}>שמירת שינויים</button>
                            <div className="rowC">
                            <img src={CLIPPY} width={200} height={200} alt="assistant" />
                              <div className="dropdown">
                                <select value={selectedOption} onChange={handleOptionChange}>
                                  <option value="">בחרו חלוקת ניקוד</option>
                                  <option value="o">לפי סדר הרשימה</option>
                                  <option value="e">חלוקה שווה</option>
                                  <option value="z">אפס ניקוד</option>
                                </select>
                              </div> 
                              <div>עבור <input
                              type="number"
                              onChange={event => setMaxOptions(event.target.value)}
                              value={max_options}
                              min={0}
                              max={course_group.length}
                              
                            /> הקורסים העליונים</div>
                             
                              <button className="button-nice" onClick={suggestClicked}>הצע חלוקת ניקוד</button>
                           </div>
                        </div>
                    </div>
                    <DragDropContext onDragEnd={handleDragEnd}>
                      <Droppable droppableId="course-group">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            data-testid="card"
                            className="whiteLines"
                          >
                            {course_group.map((course_group, index) => (
                            <Draggable
                              key={index}
                              draggableId={`course-${index}`}
                              index={index}
                            >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="item"
                              >
                              <div className="item-title">
                              
                                  {<Slider course_group={course_group} i={index} change={changeSlide}/>}
                                    {course_group.overlap && <div style={{color: 'red'}} data-testid="groupName">{course_group.name}</div>}
                                    {!course_group.overlap && <div data-testid="groupName" className='name'>{course_group.name}</div>}                                    
                                   {<div data-testid="groupIndex" className='index'>.{index+1}</div>} 
                               
                               
                              </div>
                              <div className="item-details">
                              {<div data-testid="groupName" className='hours'>בשעות: {(course_group.time_start).substring(0, 5)}-{(course_group.time_end).substring(0, 5)}</div>}
                              {<div data-testid="groupName" className='lecturer'>מרצה: {course_group.lecturer}</div>}
                              {<div data-testid="groupName" className='day'>יום: {course_group.day}</div>}
                              {<div data-testid="groupName" className='semester'>סמסטר: {course_group.semester}</div>}
                            
                            </div>
                          </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
                    
                  </div>
              </div>
          </div>
       
        
    );
}

export default BoardEditable