import * as UsersApiUtil from '../util/users_api_util'



export const RECEIVE_USERS = "RECEIVE_USERS"
export const RECEIVE_USER = "RECEIVE_USER"
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users
    }
}
export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}
export const receiveUserErrors = (errors) => {
    return {
        type: RECEIVE_USER_ERRORS,
        errors
    }
}


export const getUsers = (channelId) => dispatch => {
    return UsersApiUtil.fetchUsers(channelId)
        .then((users) => dispatch(receiveUsers(users)))
        .fail((errors) => dispatch(receiveUserErrors(errors)))
}
