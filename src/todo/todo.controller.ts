import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoImportantDto } from './dto/update-todo-important.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Post('add-todo')
  async addTodo(@Body() bodyData: AddTodoDto) {
    return this.todoService.addTodo(bodyData);
  }

  @Post('delete-todo/:id')
  async deleteTodo() {
    return this.todoService.deleteTodo();
  }

  @Post('update-todo')
  async updateTodo(@Body() bodyData: UpdateTodoDto) {
    return this.todoService.updateTodo(bodyData);
  }

  @Post('update-todo-status')
  async updateTodoStatus(@Body() bodyData: UpdateTodoStatusDto) {
    return this.todoService.updateTodoStatus(bodyData);
  }

  @Post('update-todo-important')
  async updateTodoImportant(@Body() bodyData: UpdateTodoImportantDto) {
    return this.todoService.updateTodoImportant(bodyData);
  }

  @Get('get-all-todos')
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Get('get-single-todo/:id')
  async getSingleTodo() {
    return this.todoService.getSingleTodo();
  }
}
