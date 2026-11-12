export enum Week {
    Monday = 0,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
};

export interface Idata {
    id: number,
    weekData: Week[],
    username?: string,
    bbmiMetric: number,
    height: number,
    weight: number,
    water: number
};

export interface IAuth {
    username: string,
    password: string
}

export interface IAuthRegister {
    username: string,
    email: string,
    password: string
}

export interface IAuthResponse {
    username: string,
    token: string
}