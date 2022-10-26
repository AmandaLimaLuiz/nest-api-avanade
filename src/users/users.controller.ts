import { Body, Controller, Get, Post, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersServices: UsersService) { }

    // criar
  @Post()
  create(@Body() req: CreateUserDTO) {
    return this.usersServices.create();
  }
  // listar todos
  @Get()
  findAll(){
    return this.usersServices.findAll()
  }
  // listar um
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id:number){
    return this.usersServices.findOne(id)
  }

  // atualizar
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: number,
  @Body() req: UpdateUserDTO){
    return this.usersServices.update(id, req);
  }
  // deletar
  
}
