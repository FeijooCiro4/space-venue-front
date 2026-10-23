export interface UserComplete {
    idUser: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    isActive: boolean;
    role: string;
}

export type CredentialRegister = Omit<UserComplete, 'idUser' | 'isActive' | 'role'>;