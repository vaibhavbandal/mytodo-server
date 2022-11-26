import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/utils/Guards';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoImportantDto } from './dto/update-todo-important.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';


@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get('getall')
  async getAllTodos(@Request() req: any) {
    const user = req.user;
    return this.todoService.getAllTodos(user);
  }

  @Get('getbyid/:id')
  async getById(@Param('id') todoId: string) {
    return this.todoService.getById(todoId);
  }

  @Post('add')
  async addTodo(@Body() bodyData: AddTodoDto, @Request() req: any) {
    const user = req.user;
    return this.todoService.addTodo(bodyData, user);
  }

  @Delete('deletebyid/:id')
  async deleteByTodo(@Param('id') todoId: string) {
    return this.todoService.deleteByTodo(todoId);
  }

  @Put('updatebyid')
  async updateTodo(@Body() bodyData: UpdateTodoDto) {
    return this.todoService.updateTodo(bodyData);
  }

  @Put('status')
  async updateTodoStatus(@Body() bodyData: UpdateTodoStatusDto) {
    return this.todoService.updateTodoStatus(bodyData);
  }

  @Put('isImportant')
  async isImportantUpdate(@Body() bodyData : UpdateTodoImportantDto){
    return this.todoService.updateTodoImportant(bodyData);
  }

  @Get('getIsImportant')
  async getIsImportant(){
    return this.todoService.getIsImportant();
  }


}
