import axios, { type AxiosResponse, isAxiosError } from 'axios';
import { IAuth, IAuthRegister, IAuthResponse } from '../interfaces';
import { clearToken, getToken } from './token';

const apiUrl: unknown = process.env.EXPO_PUBLIC_API_URL;

if (typeof apiUrl !== "string" || apiUrl === "") {
  throw new Error("EXPO_PUBLIC_API_URL is not set");
}

const baseURL = `${apiUrl}/api/users`;

const loginUser = async (userObject: IAuth): Promise<IAuthResponse> => {
    try {
        const { data }: AxiosResponse<IAuthResponse> = await axios.post<IAuthResponse>(`${baseURL}/login`, userObject);
        console.log(data)
        return data;
    } catch (e) {
        console.log(e)
        if (isAxiosError(e)) {
            console.log(e.response?.status, e.message);
        }
        throw new Error("Wrong username or password");
    }
}

const registerUser = async (userObject: IAuthRegister): Promise<void> => {
    try {
        await axios.post(`${baseURL}/register`, userObject);
    } catch (e) {
        console.log(e)
        if (isAxiosError(e)) {
            console.log(e.response?.status, e.message);
        }
        throw new Error("Username or Email must be unique");
    }
}

const getMe = async (): Promise<IAuthResponse> => {
    const token: string | null = await getToken();
    if (!token) throw new Error("services/getMe: Token is missing.");
    console.log(token)
    try {
        const { data }: AxiosResponse<IAuthResponse> = await axios.get<IAuthResponse>(`${baseURL}/me`, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        console.log(data)
        return data;
    } catch (e) {
        console.log(e)
        if (isAxiosError(e)) {
            if (e.response?.status === 401) {
                await clearToken();
                console.log("Authorize for access.");
                throw new Error("Authorize for access.");
            }
            console.log(e.response?.status, e.message);
        }
        throw new Error("You need to authorize to use account");
    }
}

export default {
    loginUser,
    registerUser,
    getMe
}