import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(500)
    @ApiProperty({ required: false })
    description?: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    assignedTo: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    status: string;

    @IsDate()
    @IsNotEmpty()
    @ApiProperty()
    dueDate: Date;

    @IsDate()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    startDate?: Date;


    @IsDate()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({ required: false })
    endDate?: Date;
}
