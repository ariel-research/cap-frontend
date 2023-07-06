import React from 'react';
import './Board.css';

function Modal(props){
return (
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">רגע...</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
     
        {/*props.btnsave? 
        
        <div class="modal-body">לשמור את השינויים?</div>
            :
            <div class="modal-body">לבטל את השינויים?</div>
*/}
    
     

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">להמשיך לדרג</button>
        {/*props.btnsave? <button type="button" class="btn btn-primary">סיום ושמירת הדירוג</button> :
        <button type="button" class="btn btn-primary">לבטל שינויים</button> */}
        </div>
    
        
      
    </div>
  </div>
  </div>
);
}
export default Modal;