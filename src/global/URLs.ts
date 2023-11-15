const SERVER_PORT: number = 8080
const SERVER_URL: string = `localhost:${SERVER_PORT}`
export const ENDPOINT_LOGIN: string = `http://${SERVER_URL}/login/enter`
export const ENDPOINT_LOGIN_GOOGLE: string = `http://${SERVER_URL}/login/google`
export const ENDPOINT_CONFIRMATION_ACCOUNT_BY_TOKEN_FROM_EMAIL = `http://${SERVER_URL}/email/confirmation/`
export const ENDPOINT_NEW_USER: string = `http://${SERVER_URL}/user/new`
export const ENDPOINT_FIND_USER: string = `http://${SERVER_URL}/user/find/`
export const ENDPOINT_NEW_POSTS: string = `http://${SERVER_URL}/posts/new`
export const ENDPOINT_TEST_TOKEN_BY_REQUEST_CONTROLLER: string = `http://${SERVER_URL}/posts/test-controller`

export const ENDPOINT_LIST_ALL_POSTS = ""
export const ENDPOINT_SEARCH_POST: string = `http://${SERVER_URL}/posts/read-post/`
export const ENDPOINT_PAGINATION_POSTS: string = `http://${SERVER_URL}/posts/page/`

export const ENDPOINT_RECOVER_ACCOUNT: string = `http://${SERVER_URL}/recover/recover-account/`
export const ENDPOINT_NEW_PASSWORD: string = `http://${SERVER_URL}/recover/new-password`