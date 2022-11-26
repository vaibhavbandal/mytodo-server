import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoImportantDto } from './dto/update-todo-important.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get('getall')
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get('getbyid/:id')
  async getById(@Param('todoId') todoId: number) {
    return this.todoService.getById(todoId);
  }

  @Post('add')
  async addTodo(@Body() bodyData: AddTodoDto) {
    return this.todoService.addTodo(bodyData);
  }

  @Delete('deletebyid/:id')
  async deleteByTodo(@Param('todoId') todoId: number) {
    return this.todoService.deleteByTodo(todoId);
  }

  @Put('updatebyid/:id')
  async updateTodo(@Body() bodyData: UpdateTodoDto) {
    return this.todoService.updateTodo(bodyData);
  }

  @Put('status')
  async updateTodoStatus(@Body() bodyData: UpdateTodoStatusDto) {
    return this.todoService.updateTodoStatus(bodyData);
  }

}
