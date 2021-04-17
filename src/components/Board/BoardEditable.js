import React, {useState, useEffect} from 'react';
import './Board.css';
import { API } from "../../api-service";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useCookies } from "react-cookie";

function BoardEditable(props)
{
    const [course_group, setCourse_group] = useState([]);
    const [ token ] = useCookies(['mr-token']);

    useEffect(()=>{
      API.getLast_ranking(token['mr-token'])
        .then(resp => setCourse_group(resp))
        .catch(error => console.log(error))
    }, [])

    function handleOnDragEnd(result) 
    {
        const items = Array.from(course_group);
        const [reorderedItems] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItems);
        setCourse_group(items);
    }

    return (
        <div>
            <div className='container-rank'>
                <div className='course_group'>
                    <h1>דירוג עדיפויות</h1>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="courses">
                        {(provided) =>(
                            <div data-testid="editableCard" {...provided.drooppableProps} ref={provided.innerRef}>
                                {course_group.map((course_group, index) => {
                                    return (
                                        <Draggable key={index} draggableId={index+''} index={index}>
                                        {(provided) =>(  
                                        <div data-testid={`dragAndDropCourse${index}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <div className='item'>
                                                <div data-testid="groupName" className='name'>{course_group.name}</div>
                                                <div data-testid="groupIndex" className='index'>{index+1}</div>
                                            </div>
                                        </div>)}
                                    </Draggable> 
                                    )
                                })
                                }
                                {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
            <button data-testid="saveButton" className="btn btn-lg btn-primary" onClick={props.SaveClicked(course_group)}>שמור</button>
        </div>
    );
}

export default BoardEditable