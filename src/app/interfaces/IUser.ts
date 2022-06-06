export interface IUserIn 
{
    last_name:string
    first_name:string
    phone_number:string
    email:string
    password:string
    role:string
    receiveEmail:boolean
    receiveNotification:boolean
}

export interface IUserOut 
{
    user:IUser
    access_token:string
    expires_in:number
}

export interface IUser 
{
    id:number
    last_name:string
    first_name:string
    phone_number:string
    email:string
    password:string
    role:string
    receiveEmail:boolean
    receiveNotification:boolean
    created_at:string
    updated_at:string
}

export interface IUserOutModif
{
    id:number
    last_name:string
    first_name:string
    phone_number:string
    readonly email:string
    readonly password:string
    role:string
    receiveEmail:boolean
    receiveNotification:boolean
}