export const deleteMessage = (message) => {
    App.messaging.send({type: "DELETE_MESSAGE", data: {message_id: message.id}})
}
export const updateMessage = (message_id, message) => {
    App.messaging.send({ type: "UPDATE_MESSAGE", data: {message_id: message_id, message: message}})
}