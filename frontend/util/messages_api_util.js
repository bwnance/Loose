export const sendMessage = (message) => {
    return $.ajax({
        type: "POST",
        url: `/api/channels/${message.channel_id}/messages`,
        data: { message }
    })
}