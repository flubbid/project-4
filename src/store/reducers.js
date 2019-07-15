import { getUserFromToken } from '../utils/tokenService';

const store = (state = {}, action) => {
    if (!state.user && getUserFromToken()) {
        state.user = getUserFromToken();
    }

    switch (action.type) {
        case 'LOGIN': {
            if (action.error) {
                return {
                    ...state,
                    loginError: action.error
                }
            }

            return {
                ...state,
                user: action.data,
                loginError: null
            }
        }

        case 'LOGOUT': {
            return {
                ...state,
                user: null
            }
        }

        case 'GET_QUIZZES': {
            if (action.error) {
                return {
                    ...state,
                    quizError: action.error
                }
            }

            return {
                ...state,
                quizzes: action.data,
                quizError: null
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

export default store;