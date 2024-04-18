export interface UserToken {
    user: string,
    role: string,
    expires: number
}

export const getUser = (): UserToken | null => {
    let tokenData = localStorage.getItem("user");
    if (!tokenData) {
        return null;
    }

    let token: UserToken = JSON.parse(tokenData);
    if (token.expires < Date.now()) {
        return null;
    }


    return token;
}