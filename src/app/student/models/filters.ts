
export interface params {
    sidx?: string;
    sord?: string;
    rows?: number;
    page?: number,
    _search?: boolean,
    filters?: string,
    records?:string;
}

export class AppFilter implements params {
    sidx: string;
    sord: string = "desc";
    rows: number= 10;
    page: number = 1;
    _search?: boolean=true;
    filters?: any;
    records?:string;
    constructor(instance?: params) {
        Object.assign(this, instance);
    }
}