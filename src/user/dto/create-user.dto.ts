import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsString()
    age: number;
}
