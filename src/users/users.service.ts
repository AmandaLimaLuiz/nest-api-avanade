import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService, 
    private emailService: EmailService) {}

    async getUserById(id:string): Promise<users>{
      const user = await this.prisma.users.findUnique({
        where:{
          id:Number(id)
        }
      });
      if(!user){
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      return user;
    }

  // await this.verifyUserExists('gabriel@email.com',false);
  async verifyUserExists(email: string): Promise<boolean> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user ? true : false;
  }

  async crypto(password:string): Promise<string>{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }

  async create(data: CreateUserDTO): Promise<users> {
    const { name, email, password } = data;

    //busca pra saber se o usuário já existe.
    //findUnique é um método do prisma que busca um usuário pelo campo único por exemplo email.
    //findFirst é um método do prisma que busca o primeiro registro que encontrar.

    //verificar se usuário já existe.
    const checkUser = await this.verifyUserExists(email);
    let user = undefined;

    if (!checkUser) {
      user = await this.prisma.users.create({
        data: {
          name,
          email,
          password: await this.crypto(password),
        },
      });
      //enviando email
      if(await this.emailService.sendEmail(email, 'Bem vindo ao sistema', 'Você se cadastrou no site Fiap Avanade',{})){
        console.log('email enviado com sucesso');
      }
      
    }

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          message: 'Erro ao criar usuário!',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }

  async findAll(): Promise<users[]> {
    return await this.prisma.users.findMany();
  }

  async findOne(id: number): Promise<users> {
    return await this.prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, req: UpdateUserDTO): Promise<object> {
    const user = await this.getUserById(id.toString());
    
    const {name, email, password} = req;

    if(email){
      const checkEmail = await this.prisma.users.findMany({
        where:{
          AND:[{email: email}, {id: {not: Number(id)}}],          
        }
      })
      if(checkEmail.length>0){
        throw new HttpException({
          status: HttpStatus.FORBIDDEN,
          message: 'Este e-mail está indisponível',
        },
        HttpStatus.FORBIDDEN,
        )
      }
    }

    const updateUser =  await this.prisma.users.update({
      where:{
        id: id,
      },
      data:{
        name: name? name : user.name,
        email: email? email : user.email,
        password: password? await this.crypto(password) : user.password,
      },
    });
    if(!updateUser){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        message: 'Erro ao atualizar o usuário',
      },
      HttpStatus.FORBIDDEN,
      );
    }
    return {msg: `Usuário ${updateUser.name} atualizado com sucesso! `}
  }

  async remove(id: number): Promise<object> {
    const user = await this.getUserById(id.toString());
    const deleteUser = await this.prisma.users.delete({
      where:{
        id: Number(id),
      },
    });
    if(!deleteUser){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        message: "Erro ao deletar usuário",
      },
      HttpStatus.FORBIDDEN,
      )
    }
    return {msg: `Usuário ${id} deletado com sucesso!`};
  }
}