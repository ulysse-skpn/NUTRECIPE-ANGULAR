import { IUserIn, IUserOut } from "../interfaces/IUser";

const mockUserOut:IUserOut = 
{
    user: 
    {
        id:1,
        last_name:"SEKPON",
        first_name:"ulysse",
        phone_number:"0000000000",
        email:"u.sekpon@gmail.com",
        password:"azerty",
        role:"user",
        receiveEmail:true,
        receiveNotification:false,
        created_at:"0000-00-00 00:00:00",
        updated_at:"0000-00-00 00:00:00"
    },
    access_token: "",
    expires_in: 0
}

const mockUserInAdmin:IUserIn = 
{
    last_name: "",
    first_name: "",
    phone_number: "",
    email: "",
    password: "",
    role: "",
    receiveEmail: false,
    receiveNotification: false
}

const mockUserOutAdmin:IUserOut = 
{
    user: 
    {
        id:1,
        last_name:"SEKPON",
        first_name:"ulysse",
        phone_number:"0000000000",
        email:"u.sekpon@gmail.com",
        password:"azerty",
        role:"admin",
        receiveEmail:true,
        receiveNotification:false,
        created_at:"0000-00-00 00:00:00",
        updated_at:"0000-00-00 00:00:00"
    },
    access_token: "",
    expires_in: 0
}

const mockPassword: string = "oNy0Kcg$HLn"

export { mockUserOut , mockUserOutAdmin , mockUserInAdmin , mockPassword }