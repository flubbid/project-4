import axios from 'axios';
import { removeToken, setToken, getUserFromToken, getToken } from '../utils/tokenService';

const BASE_URL = 'http://localhost:3001/api';

const getHeaders = () => {
    const token = getToken();
    const headers = {};

    if (token) {
        headers['Authorization'] = token;
    }

    return headers;
}

export const login = (body) => async (dispatch) => {
    try {
        const { data } = await axios({
            method: 'POST',
            url: `${BASE_URL}/users/login`,
            data: body
        })

        if (data && data.token) {
            setToken(data.token);

            const user = getUserFromToken();

            dispatch({
                type: 'LOGIN',
                data: user
            });
        }
    } catch ({ response, message }) {
        dispatch({
            type: 'LOGIN',
            error: response && response.data ? response.data.message : message
        })
    }
}

export const signup = (body) => async (dispatch) => {
    try {
        const { data } = await axios({
            method: 'POST',
            url: `${BASE_URL}/users/signup`,
            data: body
        })

        if (data && data.token) {
            setToken(data.token);

            const user = getUserFromToken();

            dispatch({
                type: 'LOGIN',
                data: user
            });
        }
    } catch ({ response, message }) {
        dispatch({
            type: 'LOGIN',
            error: response && response.data ? response.data.message : message
        })
    }
}

export const logout = () => async (dispatch) => {
    removeToken();

    dispatch({
        type: 'LOGOUT'
    })
}

export const getQuizzes = () => async (dispatch) => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: `${BASE_URL}/quiz`,
            headers: getHeaders()
        })

        dispatch({
            type: 'GET_QUIZZES',
            data
        })

    } catch ({ response, message }) {
        dispatch({
            type: 'GET_QUIZZES',
            error: response && response.data ? response.data.message : message
        })
    }
}

export const createQuiz = (body) => async dispatch => {
    try {
        const { data } = await axios({
            method: 'POST',
            url: `${BASE_URL}/quiz`,
            headers: getHeaders(),
            data: body
        })

        dispatch({
            type: 'CREATE_QUIZ',
            data
        })

    } catch ({ response, message }) {

        dispatch({
            type: 'CREATE_QUIZ',
            error: response && response.data ? response.data.message : message
        })
    }
}

export const updateQuiz = (id, body) => async (dispatch) => {
    try {
        const { data } = await axios({
            method: 'PUT',
            url: `${BASE_URL}/quiz/${id}`,
            headers: getHeaders(),
            data: body
        })

        dispatch({
            type: 'UPDATE_QUIZ',
            data
        })

    } catch ({ response, message }) {
        console.dir(response);

        dispatch({
            type: 'UPDATE_QUIZ',
            error: response && response.data ? response.data.message : message
        })
    }
}

export const deleteQuiz = (id) => async (dispatch) => {
    try {
        const { data } = await axios({
            method: 'DELETE',
            url: `${BASE_URL}/quiz/${id}`,
            headers: getHeaders()
        })

        dispatch({
            type: 'DELETE_QUIZ',
            data
        })

    } catch ({ response, message }) {
        console.dir(response);

        dispatch({
            type: 'DELETE_QUIZ',
            error: response && response.data ? response.data.message : message
        })
    }
}

export const getQuiz = (quizId) => async (dispatch) => {
    try {
        const { data } = await axios({
            method: 'GET',
            url: `${BASE_URL}/questions/${quizId}`,
            headers: getHeaders()
        })

        dispatch({
            type: 'GET_QUIZ',
            data: data
        })

    } catch ({ response, message }) {
        console.dir(response);

        dispatch({
            type: 'GET_QUIZ',
            error: response && response.data ? response.data.message : message
        })
    }
}

export const createQuestion = (quizId, body) => async (dispatch) => {
    try {
        const { data } = await axios({
            method: 'POST',
            url: `${BASE_URL}/questions/${quizId}`,
            headers: getHeaders(),
            data: body
        })

        dispatch({
            type: 'CREATE_QUESTION',
            data: data
        })

    } catch ({ message, response }) {
        console.dir(response);

        dispatch({
            type: 'CREATE_QUESTION',
            error: response && response.data ? response.data.message : message
        })
    }
}

export const deleteQuestion = (quizId, qid) => async (dispatch) => {
    try {
        const { data } = await axios({
            method: 'DELETE',
            url: `${BASE_URL}/questions/${quizId}/${qid}`,
            headers: getHeaders()
        })

        dispatch({
            type: 'DELETE_QUESTION',
            data: data
        })

    } catch ({ response, message }) {
        console.dir(response);

        dispatch({
            type: 'DELETE_QUESTION',
            error: response && response.data ? response.data.message : message
        })
    }
}