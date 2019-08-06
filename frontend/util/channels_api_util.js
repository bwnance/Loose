export const createChannel = (channel) => {
    return $.ajax({
        type: "POST",
        url: `/api/channels/`,
        data: { channel }
    })
}
export const addUsersToChannel = (users, channelId) => {
    return $.ajax({
        type: "POST",
        url: `/api/channels/${channelId}/users`,
        data: { users }
    })
}
export const fetchChannels = () => {
    return $.ajax({
        type: "GET", 
        url: `/api/channels/currentUserChannels`
    })
}
export const fetchAllChannels = () => {
    return $.ajax({
        type: "GET", 
        url: `/api/channels/`
    })
}