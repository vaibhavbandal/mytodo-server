import { IsBoolean, IsString } from 'class-validator';

export class AddTodoDto {
  @IsString()
  title: string;

  @IsString()
  desc: string;

  @IsBoolean()
  isImportant: boolean;
}
