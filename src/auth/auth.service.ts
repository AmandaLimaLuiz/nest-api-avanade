import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    authLogin(login:string, password: string){
        return {login, password, msg: "Login realizado com sucesso!"};
    }
}
