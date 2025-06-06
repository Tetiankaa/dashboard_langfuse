import {apiService} from "./apiService.ts";
import type {ILoginData} from "../interfaces/login-data.interface.ts";
import {urls} from "../constants/urls.ts";

const authService = {
    login: (data: ILoginData) => apiService.post(urls.auth.login, data)
}

export {
    authService
}
