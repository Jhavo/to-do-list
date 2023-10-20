import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
    
    @ApiProperty()
    id: number;
  
    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

    @Exclude()
    password: string;

    @ApiProperty()
    roleId: number;

    @ApiProperty()
    superior: number;

    @ApiProperty()
    active: boolean;

    @Exclude()
    createdBy: number;
  
    @Exclude()
    createdAt: Date;

    @Exclude()
    // @ApiProperty({ required: false, nullable: true })
    updatedBy: number | null;
  
    @Exclude()
    updatedAt: Date;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}
