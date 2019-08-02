export const fetchUsers = (channelId) =>{
    return $.ajax({ 
        type: "GET",
        url: "/api/users",
        data: { channelId }
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