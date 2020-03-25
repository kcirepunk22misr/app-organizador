export interface LoginUser {
    _id: string;
    firstName: string;
    lastName: string;
    sex: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    active: boolean;
    _doc?: object
} 