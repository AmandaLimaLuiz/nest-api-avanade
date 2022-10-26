import { Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    async create(): Promise<String> {
        return 'Usuário criado com sucesso!'
    }
    async findAll(): Promise<String> {
        return 'Lista de usuario!'
    }
    async findOne(id: number): Promise<String> {
        return `Usuario ${id}`
    }
    async update(id: number, req: UpdateUserDTO): Promise<String> {
        return `Usuario ${id} atualizado com sucesso!`
    }

}
