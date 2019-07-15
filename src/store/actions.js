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
    } catch (e) {
        dispatch({
            type: 'LOGIN',
            error: e.response.data ? e.response.data.message : e.message
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

    } catch (e) {
        console.dir(e);

        dispatch({
            type: 'GET_QUIZZES',
            error: e.response.data ? e.response.data.message : e.message
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

    } catch (e) {
        console.dir(e);

        dispatch({
            type: 'CREATE_QUIZ',
            error: e.response.data ? e.response.data.message : e.message
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

    } catch (e) {
        console.dir(e);

        dispatch({
            type: 'UPDATE_QUIZ',
            error: e.response.data ? e.response.data.message : e.message
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

    } catch (e) {
        console.dir(e);

        dispatch({
            type: 'DELETE_QUIZ',
            error: e.response.data ? e.response.data.message : e.message
        })
    }
}