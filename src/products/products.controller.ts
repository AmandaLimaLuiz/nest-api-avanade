import { Body, Controller, Get, Post, Param, ParseUUIDPipe, Patch } from '@nestjs/common';
import { CreateProductDTO } from './dto/createProduct.dto';
import { UpdateProductDTO } from './dto/updateProduct.dto';
import { ProductService } from './products.service';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsServices: ProductService) { }

    // criar
  @Post()
  create(@Body() req: CreateProductDTO) {
    return this.productsServices.create();
  }
  // listar todos
  @Get()
  findAll(){
    return this.productsServices.findAll()
  }
  // listar um
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id:number){
    return this.productsServices.findOne(id)
  }

  // atualizar
  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: number,
  @Body() req: UpdateProductDTO){
    return this.productsServices.update(id, req);
  }
  // deletar
  
}

