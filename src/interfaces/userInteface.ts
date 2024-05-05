export interface ILoginData {
    email:string
    password: string
} 

export interface IRegisterData extends ILoginData {
    name: string
}

export interface IUser extends IRegisterData {
    id: string
}
