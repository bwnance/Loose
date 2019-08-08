export const getCurrentChannel = (state) => {
    const currentType = state.ui.chatWindow.messageableType
    const currentId = state.ui.chatWindow.id
    if(currentType === "Channel"){
        return state.entities.channels[currentId]
    }
    if(currentType === "DirectMessage"){
        return state.entities.dms[currentId]
    }
}