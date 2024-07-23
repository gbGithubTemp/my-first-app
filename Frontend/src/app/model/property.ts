import { Ipropertybase } from "./ipropertybase";

export class Property implements Ipropertybase {
    id: number;
    SellRent: number;
    Name: string;
    PType: string;
    BHK: number;
    FType: string;
    Price: number;
    BuiltArea: number;
    CarpetArea?: number;
    Address: string;
    Address2?: string;
    city: string;
    FloorNo?: string;
    TotalFloor?: string;
    RTM: number;
    AOP?: string;
    MainEntrance?: string;
    Secutiry?: number;
    Gated?: number;
    Maintenance?: number;
    Possession?: string;
    Image?: string;
    Description?: string;
    PostedOn: string;
    PostedBy: number;
}