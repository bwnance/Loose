export const sendMessage = (message) => {
    return $.ajax({
        type: "POST",
        url: `/api/channels/${message.channel_id}/messages`,
        data: { message }
    })
}
export const fetchMessagesFromChannel = (channelId) => {
    return $.ajax({
        type: "GET",
        url: `/api/channels/${channelId}/messages/`
    })
}
export const fetchMessagesFromDM = (DMId) => {
    return $.ajax({
        type: "GET",
        url: `/api/direct_messages/${DMId}/messages/`
    })
}