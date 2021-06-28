import React, { Component } from 'react';
import NavbarOffice from './Navbar_Office';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { API } from '../../api-service';
import Cookies from 'js-cookie';
import './office.css'



class Office extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filesName: '',
      files: null,
      CourseFilesName: '',
      CourseFile: null,
      StartTime: null,
      EndTime: null,
      StartDate: null,
      EndDate: null,
      token: Cookies.get('mr-token')

    }
  }
  
  //////////// -Files uploading- ////////////
  // On file select (from the pop up)
  onFileChange = event => {
    // Update the state
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    this.setState({filesName: event.target.files[0].name})
    fileReader.onload = e => {
      this.setState({ files: e.target.result });
    };
  };
  onFileCourseChange = event => {
    // Update the state
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    this.setState({CourseFilesName: event.target.files[0].name})
    fileReader.onload = e => {
      this.setState({ CourseFile: e.target.result });
    };
  };
  changeStartTime = event => {
    // Update the state
    this.setState({StartDate:(event.target.value).split('T')[0], StartTime:(event.target.value).split('T')[1]})
  };
  changeEndTime = event => {
    // Update the state
    this.setState({EndDate:(event.target.value).split('T')[0], EndTime:(event.target.value).split('T')[1]})
  };

  // On file upload (click the upload button)
  saveStudent = () => {
    const {files} = this.state
    if(files)
    {
      API.createStudents(Cookies.get('mr-token'), files)
      .then(resp => alert(resp))
      .catch(error => console.log(error))
    }
    else
    {
      alert("נדרש להעלות קבצי סטודנטים")
    }
  };
  saveCourses = () => {
    const {CourseFile} = this.state
    if(CourseFile)
    {
      API.createCourses(Cookies.get('mr-token'), CourseFile)
      .then(resp => alert(resp))
      .catch(error => console.log(error))
    }
    else
    {
      alert("נדרש להעלות קבצי קורסים")
    }
  };
  saveDate = () => {
    const {StartDate, EndDate, StartTime, EndTime} = this.state
    if(StartDate && EndDate && StartTime && EndTime)
    {
      API.createDate(Cookies.get('mr-token'), StartDate, EndDate, StartTime, EndTime)
      .then(resp => alert(resp))
      .catch(error => console.log(error))
    }
    else
    {
      alert("לא צוין תאריך התחלה או סיום")
    }
  };


  ///////////////// - filesData - /////////////////
  fileData = () => {
    if (this.state.files) {
      return (
        <div>
          <p data-testid="lastModifiedOfFile">{this.state.filesName} </p>
        </div>
      );
    } else {
      return (
        <div>בחר/י</div>
      );
    }
  };
  fileDataCourse= () => {
    if (this.state.CourseFile) {
      return (
        <div>
          <p data-testid="lastModifiedOfFile">{this.state.CourseFilesName}</p>
        </div>
      );
    } else {
      return (
        <div>בחר/י</div>
      );
    }
  };
  //////////// - End Files uploading- ////////////

  alertDate = () => {
    alert("הרשומות נרשמו במערכת");
  }

  checkPermission = () => 
  {
    if(!Cookies.get('mr-token')) window.location.href = '/';
    API.studentOrOffice(Cookies.get('mr-token'))
    .then(resp => {                
        if(resp === 1) //student
            window.location.href = '/courses_info';
        if(resp === 3) //error
            alert("error")
    })
    .catch(error => console.log(error))
  }

  componentDidMount(){
    this.checkPermission();
  }

  render() {
    return (
      <div className="office" data-testid="office">
        <NavbarOffice active='הגדרות' />
        <header className="App-header">
          <div className="headline">ברוכים/ות הבאים/ות </div>
        </header>
        <div className='container-office'>
          <div className='layout-office'>
            <h2 style={{marginRight: '8px',color:'white'}}> : על מנת שנוכל להתחיל בתהליך, נדרש </h2>
            <div className='fill-in-office'>
              <h4>:הגדרת תאריך תחילת הדירוג וסופו </h4>
              <div className="dates" data-testid="datepicker">
                <input className="fill-date" type="datetime-local" onChange={this.changeStartTime} data-testid="start_date_field"></input><br/>
                <input className="fill-date" type="datetime-local" onChange={this.changeEndTime} data-testid="end_date_field"></input><br/>
                <button className="saveB" onClick={this.saveDate} data-testid="save_button">שמירה</button>
              </div>
              <h4> (json:פורמט) הוספת קבצי סטודנטים/ות</h4>
              <p style={{marginRight:'5%'}}>:דוגמא לפורמט תקין</p>
              <p style={{marginRight:'5%'}}>[&#123;  "id":"01", "name": "Tom", "password": "19283746", "email": "tom@gmail.com","amount_elective":5,"courses":["1","9","14"]&#125;]</p>
              <div className="studentFile">
                <button className="save-student" onClick={this.saveStudent} data-testid="save_button">שמירה</button> 
                <input type="file" onChange={this.onFileChange} id="myuniqueid" data-testid="fileUpload"/>
                <label className="save-student" htmlFor="myuniqueid">{this.fileData()}</label>
              </div>
              <h4 >  (json:פורמט) הוספת קבצי קורסים </h4>
              <p style={{marginRight:'5%'}}>:דוגמא לפורמט תקין</p>
              <p style={{marginRight:'5%'}}>[&#123; "id":"601", "name": "course1", "lecturer": "avi ron","capacity": 100, "is_elective": false, "day":"ג", "semester":"א", "start_time":"10:00", "end_time":"13:00"&#125;]</p>
              <div className="studentFile">
                <button className="save-student" onClick={this.saveCourses} data-testid="save_button">שמירה</button>
                <input type="file" onChange={this.onFileCourseChange} id="myuniqueid2" data-testid="fileUpload"/>
                <label className="save-student" htmlFor="myuniqueid2">{this.fileDataCourse()}</label>
              </div>
            </div>

          </div>
        </div>


      </div>
    );
  }
}

export default Office;

