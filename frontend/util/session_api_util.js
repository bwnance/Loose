export const signup = (formUser) => {
    return $.ajax({
        type: "POST",
        url: "/api/users",
        data: { user: formUser }
    })
}

export const login = (formUser) => {
    return $.ajax({
        type: "POST",
        url: "/api/session",
        data: { user: formUser }
    })
}

export const logout = () => {
    return $.ajax({
        type: "DELETE",
        url: "/api/session"
    })
}

export const checkEmail = (email) => {
    return $.ajax({
        type: "GET", 
        url: '/api/session/check_email', 
        data: {email}
    })
}