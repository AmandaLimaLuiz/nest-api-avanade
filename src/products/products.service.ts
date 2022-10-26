import { Injectable } from '@nestjs/common';
import { UpdateProductDTO } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    async create(): Promise<String> {
        return 'Produto criado com sucesso!'
    }
    async findAll(): Promise<String> {
        return 'Lista de produto!'
    }
    async findOne(id: number): Promise<String> {
        return `Produto ${id}`
    }
    async update(id: number, req: UpdateProductDTO): Promise<String> {
        return `Produto ${id} atualizado com sucesso!`
    }
}
