const TOKEN = "51cac34c27be7bc14410b54629dfc51896f52589"

export class API {
    static getCourse_group()
    {
        return fetch("http://127.0.0.1:8000/api/course_group/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        })
        .then(resp => resp.json())
    }

    static getCoursesA()
    {
        return fetch("http://127.0.0.1:8000/api/courses/get_semester_a/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        })
        .then(resp => resp.json())
    }

    static getCoursesB()
    {
        return fetch("http://127.0.0.1:8000/api/courses/get_semester_b/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        })
        .then(resp => resp.json())
    }

    static getLast_ranking()
    {
        return fetch("http://127.0.0.1:8000/api/course_group/get_last_rating/",
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        })
        .then(resp => resp.json())
    }

    static rank_courses(course_group)
    {
        return fetch("http://127.0.0.1:8000/api/ranking/rank_courses/",
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify( {ranks: course_group} )
        })
        .then(resp => resp.json())
    }
}