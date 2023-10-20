import { ApiProperty } from "@nestjs/swagger";
import { Task } from "@prisma/client";
import { Exclude } from "class-transformer";

export class TaskEntity implements Task {
    constructor(partial: Partial<TaskEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty({ required: false, nullable: true })
    description: string | null;

    @ApiProperty()
    assignedTo: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    dueDate: Date;

    @ApiProperty({ required: false, nullable: true })
    startDate: Date | null;

    @ApiProperty({ required: false, nullable: true })
    endDate: Date | null;

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
}
