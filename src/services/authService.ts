import axios, { type AxiosResponse, isAxiosError } from 'axios';
import { IAuth, IAuthResponse } from '../interfaces';

const apiUrl: unknown = process.env.EXPO_PUBLIC_API_URL;

if (typeof apiUrl !== "string" || apiUrl === "") {
  throw new Error("EXPO_PUBLIC_API_URL is not set");
}

const baseURL = `${apiUrl}/api/user`;

const loginUser = async (userObject: IAuth): Promise<IAuthResponse> => {
    try {
        const { data }: AxiosResponse<IAuthResponse> = await axios.post<IAuthResponse>(`${baseURL}/login`, userObject);
        return data;
    } catch (e) {
        console.log(e)
        if (isAxiosError(e)) {
            console.log(e.response?.status, e.message);
        }
        throw new Error("services/userInfoService: getAll(), Cant get data!");
    }
}

export default {
    loginUser
}