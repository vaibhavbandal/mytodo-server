import { Status } from '@prisma/client';
import { IsMongoId, IsString } from 'class-validator';

export class UpdateTodoStatusDto {
  @IsString()
  status: Status;

  @IsMongoId()
  todoId: string;
}
