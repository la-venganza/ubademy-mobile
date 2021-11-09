interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    age: number,
    role: string;
    birth_date: string,
    phone_type: string,
    phone_number: string,
    subscription:string,
    is_admin: boolean;
    user_id: string;
    blocked: boolean;
}

export default IUser;
