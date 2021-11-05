
export default function AuthorizationHeaderService() {

    const authorization_token = JSON.parse(localStorage.getItem("user"))

    if (authorization_token && authorization_token.jwttoken) {
        return { headers: { Authorization: 'Bearer ' + authorization_token.jwttoken } }
    } else {
        return {}
    }
}