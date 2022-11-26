import { IsMongoId, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsMongoId()
  todoId: string;
}
