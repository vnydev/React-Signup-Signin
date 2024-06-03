import { httpPost } from './http.service'
import { User, LoginResponse, SignupResponse } from '../interfaces/user.interface'

export const registerUser = async (body: User): Promise<SignupResponse> => {
    const path = '/users/signup'
    const { data } = await httpPost(path, body)
    return data
}

export const login = async (body: User): Promise<LoginResponse> => {
    const path = '/auth/login'
    const { data } = await httpPost(path, body)
    return data
}
