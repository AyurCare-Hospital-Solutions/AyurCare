import { jwtDecode } from "jwt-decode";

export interface UserToken {
    name: string,
    role: string,
    system: string,
    exp: number,
}

export const getUser = (): UserToken | null => {
    let tokenData = localStorage.getItem("jwt");
    if (!tokenData) {
        return null;
    }

    try {
        var token: UserToken = jwtDecode<UserToken>(tokenData);
    } catch (e) {
        return null;
    }

    if (token.exp < Date.now() / 1000) {
        return null;
    }


    return token;
}