export const createChannel = (channel) => {
    return $.ajax({
        type: "POST",
        url: `/api/channels/`,
        data: { channel }
    })
}

export const fetchChannels = () => {
    return $.ajax({
        type: "GET", 
        url: `/api/channels`
    })
}