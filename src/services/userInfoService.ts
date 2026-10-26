import axios, { type AxiosResponse, isAxiosError } from 'axios';
import { Idata } from '../interfaces';

const baseURL = "/api/";

const getAll = async (): Promise<Idata[]> => {
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
    getAll
}