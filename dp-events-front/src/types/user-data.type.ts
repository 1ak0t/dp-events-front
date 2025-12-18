import {UserRoles} from "../constants";

export type UserLoggedDataType = {
    id: string;
    token: string;
    email: string;
    surname: string;
    name: string;
    middleName: string;
    role: UserRoles[];
    notificationsCount: number;
    jobTitle: string;
};

export type UpdateUserDataType = {
    id: string;
    data: {
        subscription?: string;
        notificationsCount?: number;
        role?: UserRoles[];
        jobTitle?: string;
        surname?: string;
        name?: string;
        middleName?: string;
    }
}

export type CreateUserDataType = {
    role: UserRoles[];
    jobTitle: string;
    surname: string;
    name: string;
    middleName: string;
    email: string;
    password: string;
}