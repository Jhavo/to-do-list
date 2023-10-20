import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    password: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    roleId: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    superior: number;
}
