export const fetchUsers = () =>{
    return $.ajax({ 
        type: "GET",
        url: "/api/users"
    })
}
export const fetchUser = (id) =>{
    return $.ajax({ 
        type: "GET",
        url: `/api/users/${id}`
    })
}
export const createUser = (user) =>{
    return $.ajax({ 
        type: "POST",
        url: `/api/users`,
        data: {user}
    })
}