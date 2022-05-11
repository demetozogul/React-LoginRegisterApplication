export interface IUserRegister {
    user: RegisterUser[];
}

export interface RegisterUser {
    durum:       boolean;
    mesaj:       string;
    kullaniciId: string;
}
