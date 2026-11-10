import axios, { type AxiosResponse, isAxiosError } from 'axios';
import { IAuth, IAuthResponse } from '../interfaces';
import { getToken } from './token';

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
        throw new Error("services/loginUser: loginUser(), Cant login!");
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
            console.log(e.response?.status, e.message);
        }
        throw new Error("services/getMe: Cant getme.");
    }
}

export default {
    loginUser,
    getMe
}