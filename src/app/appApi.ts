import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    /*baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',*/
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// api
export const authAPI = {
    register(data: RegisterDataType) {
        return instance.post<RegisterDataType, AxiosResponse<ResponseRegisterType>>("/auth/register", data)
    },
}


// types

export type RegisterDataType = {
    email: string
    password: string
    confirmPassword: string

}
export type ResponseRegisterType = {
    addedUser: {
        _id: string
        email: string
        rememberMe: boolean
        isAdmin: boolean
        name: string
        verified: boolean
        publicCardPacksCount: number
        created: string
        updated: string
        __v: number
    }
    error?: string

}