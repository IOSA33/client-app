import axios, { type AxiosResponse, isAxiosError } from 'axios';
import { Idata } from '../interfaces';

const apiUrl: unknown = process.env.EXPO_PUBLIC_API_URL;

if (typeof apiUrl !== "string" || apiUrl === "") {
  throw new Error("EXPO_PUBLIC_API_URL is not set");
}

const baseURL = `${apiUrl}/api/userdata`;

const getUserData = async (): Promise<Idata[]> => {
    try {
        const { data }: AxiosResponse<Idata[]> = await axios.get<Idata[]>(baseURL);
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
    getUserData
}