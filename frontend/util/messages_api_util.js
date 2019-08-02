export const sendMessage = (message) => {
    return $.ajax({
        type: "POST",
        url: `/api/channels/${message.channel_id}/messages`,
        data: { message }
    })
}
export const fetchMessages = (channelId) => {
    return $.ajax({
        type: "GET",
        url: `/api/channels/${channelId}/messages/`
    })
}