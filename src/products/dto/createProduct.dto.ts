import {IsNotEmpty, IsString, IsNumber} from 'class-validator';

export class CreateProductDTO{
    @IsString()
    @IsNotEmpty()
    nameProduct: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    



}