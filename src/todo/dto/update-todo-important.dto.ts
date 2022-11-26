import { IsBoolean, IsMongoId } from 'class-validator';

export class UpdateTodoImportantDto {
  @IsBoolean()
  isImportant: boolean;
  @IsMongoId()
  todoId: string;
}
