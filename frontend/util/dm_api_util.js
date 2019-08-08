export const fetchDMs = () => {
    return $.ajax({
        type: "GET",
        url: `/api/direct_messages/currentUserDMs`
    })
}