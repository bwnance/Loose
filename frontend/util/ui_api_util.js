export const checkEmail = (email) => {
    return $.ajax({
        type: "GET",
        url: '/api/session/check_email',
        data: { email }
    })
}