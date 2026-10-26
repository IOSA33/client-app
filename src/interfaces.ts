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
    weekData: Week[],
    username?: string,
    bbmiMetric: number,
    height: number,
    currentWeight: number,
};