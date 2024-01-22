import dotenv from 'dotenv';
dotenv.config();

const BASE_URL= process.env.REACT_APP_BASE_URL;

export class API {
    static getUserStatus(username)
    {
        return fetch(BASE_URL+"api/register/get_user_status/?username="+username,
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
            }
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

    static studentRankingStatus(token)
    {
        return fetch(BASE_URL+"api/course_group/student_ranking_status/",
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

    static getResultsInfo(token)
    {
        return fetch(BASE_URL+"api/result/get_results_info/",
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

    static getAllocation(token)
    {
        return fetch(BASE_URL+"api/student/get_allocation/",
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

    static getQuestions(token)
    {
        return fetch(BASE_URL+"api/question/get_questions/",
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

    static getQ_A(token)
    {
        return fetch(BASE_URL+"api/question/get_questions_answers/",
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

    static SaveResultsFeedback(course_group, token)
    {
        return fetch(BASE_URL+"api/ranking/save_results_feedback/",
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
    
    static saveAnswers(course_group, token)
    {
        return fetch(BASE_URL+"api/question/save_answers/",
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