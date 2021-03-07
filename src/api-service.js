
export class API {
    static loginUser(body)
    {
        return fetch("http://127.0.0.1:8000/auth/",
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
    static registerUser(body)
    {
        return fetch("http://127.0.0.1:8000/api/users/",
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

    static getCourse_group(token)
    {
        return fetch("http://127.0.0.1:8000/api/course_group/",
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
        return fetch("http://127.0.0.1:8000/api/courses/get_semester_a/",
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
        return fetch("http://127.0.0.1:8000/api/courses/get_semester_b/",
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
        return fetch("http://127.0.0.1:8000/api/course_group/get_last_rating/",
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
        return fetch("http://127.0.0.1:8000/api/ranking/rank_courses/",
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
}