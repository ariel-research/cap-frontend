
import React, { Component} from 'react';
import Navbar_Office from './Navbar_Office';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


class Office extends Component {
constructor(props){
  super(props);
  this.state = {
    startDate: null,
    endDate: null,
    selectedFile: null
   
  }
}

//////////// -Files uploading- ////////////
// On file select (from the pop up)
onFileChange = event => { 
  // Update the state
  this.setState({ selectedFile: event.target.files[0] });
};
// On file upload (click the upload button)
onFileUpload = () => {  
  // Create an object of formData
  const formData = new FormData();
  // Update the formData object
  formData.append(
    "myFile",
    this.state.selectedFile,
    this.state.selectedFile.name
  );
   // Details of the uploaded file
   console.log(this.state.selectedFile);
    
   // Request made to the backend api
   // Send formData object
   Office.post("api/uploadfile", formData);
 };
 fileData = () => {
  if (this.state.selectedFile) {
    return (
      <div>
      <p>Last Modified:{" "}{this.state.selectedFile.lastModifiedDate.toDateString()}</p>
      </div>
    );
  } else {
    return (
      <div className="emptyFile"><br/>עדיין לא הועלה אף קובץ</div>  
    );
  }
};
//////////// - End Files uploading- ////////////

alertDate = () => {
  alert("התאריכים נרשמו במערכת");
}

render () {
    return (
        <div className="App" data-testid="office">
          <Navbar_Office />     
          <header className="App-header">
            <div className="headline">ברוכים/ות הבאים/ות </div> 
          </header>  
          <div className="headline2"> : על מנת שנוכל לתחיל בתהליך, נדרש  </div>
          <div className="one">  (1) </div><br/>
          <div className="headlineOne">  הגדרת תאריך תחילת הדירוג וסופו </div>
              <br/><br/><div className="dateP" data-testid="datepicker">
              {/* <DateRangePicker 
              
              data-testid="start_date_picker"
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              startDateId="startDateId" // PropTypes.string.isRequired,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              endDateId="endDateId" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              /> */}
              <input type="date" data-testid="start_date_field"></input>
              <input type="date" data-testid="end_date_field"></input>
              <button className="saveButton" data-testid="save_button" 
                onClick={()=>{
                  console.log("Clicked");
                  this.alertDate();
                }}>שמירה</button></div>
              <div className="two">  (2) </div><br/>
               <div className="headlineTwo">  הוספת קבצי סטודנטים/ות </div><br />
              <div className="studentFile">
                        <input type="file" onChange={this.onFileChange} id="myuniqueid" />
                        <label htmlFor="myuniqueid">בחר/י</label>
                        <button className="uploadButton" onClick={this.onFileUpload}>העלאת הקובץ</button>
                        {this.fileData()}
              </div>
                  
        </div>
      );
    }
  }  
  export default Office;

