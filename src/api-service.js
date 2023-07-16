// const BASE_URL= "https://api-fair-division.herokuapp.com/";
const BASE_URL= "http://localhost:8000/";


export class API {
    static loginUser(body)
    {
        return fetch(BASE_URL+"auth/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static sendResetEmail(body)
    {
        return fetch(BASE_URL+"api/register/send_reset_email/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static ResetPasswordEmail(body)
    {
        return fetch(BASE_URL+"api/auth/passwordreset/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static ResetPasswordCode(body)
    {
        return fetch(BASE_URL+"api/auth/passwordreset/validate_token/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static ResetPasswordConfirm(body)
    {
        return fetch(BASE_URL+"api/auth/passwordreset/confirm/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static getUserStatus(username)
    {
        return fetch(BASE_URL+"api/users/get_user_status/?username="+username,
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
            }
        })
        .then(resp => resp.json())
    }
    static registerUser(body)
    {
        return fetch(BASE_URL+"api/register/post/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type':  'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }
    static studentOrOffice(token)
    {
        return fetch(BASE_URL+"api/student/student_or_office/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }
    static getUserDetails(token)
    {
        return fetch(BASE_URL+"api/users/get_user_details/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }

    static getStudentDetails(token)
    {
        return fetch(BASE_URL+"api/student/get_student_details/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }

    static updateStudentDetails(body,token)
    {
        return fetch(BASE_URL+"api/student/update_student_details/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }
    static getCourse_group(token)
    {
        return fetch(BASE_URL+"api/course_group/get_course_group/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }

    static getCoursesA(token)
    {
        return fetch(BASE_URL+"api/courses/get_semester_a/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }

    static getCoursesB(token)
    {
        return fetch(BASE_URL+"api/courses/get_semester_b/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }

    static getLast_ranking(token)
    {
        return fetch(BASE_URL+"api/course_group/get_last_rating/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }

    static getTime(token)
    {
        return fetch(BASE_URL+"api/office/get_time/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }
    static isClose(token)
    {
        return fetch(BASE_URL+"api/office/close_ranking/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }
    static getDates(token)
    {
        return fetch(BASE_URL+"api/office/get_dates/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }
    static MyStudents(token)
    {
        return fetch(BASE_URL+"api/office/my_students/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }
    static MyCourses(token)
    {
        return fetch(BASE_URL+"api/office/my_courses/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }
    
    static getResults(token)
    {
        return fetch(BASE_URL+"api/result/get_results/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }

    static rank_courses(course_group, token)
    {
        return fetch(BASE_URL+"api/ranking/rank_courses/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( {ranks: course_group} )
        })
        .then(resp => resp.json())
    }
    static createStudents(token, jsonData)
    {
        return fetch(BASE_URL+"api/student/create_objects/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( {students: jsonData} )
        })
        .then(resp => resp.json())
    }
    static createCourses(token, jsonData)
    {
        return fetch(BASE_URL+"api/courses/create_objects/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( {courses: jsonData} )
        })
        .then(resp => resp.json())
    }
    
    static createDate(token, StartDate, EndDate, StartTime, EndTime)
    {
        return fetch(BASE_URL+"api/office/set_date/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify( {StartDate, EndDate, StartTime, EndTime} )
        })
        .then(resp => resp.json())
    }
    static doAlgo(token)
    {
        return fetch(BASE_URL+"api/office/algo/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(resp => resp.json())
    }
}