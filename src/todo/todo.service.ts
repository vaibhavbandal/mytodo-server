import { Injectable } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoImportantDto } from './dto/update-todo-important.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  async addTodo(bodyData: AddTodoDto) {
    return bodyData;
  }
  async deleteTodo() {
    return 'delete todo';
  }
  async updateTodo(bodyData: UpdateTodoDto) {
    return bodyData;
  }
  async updateTodoStatus(bodyData: UpdateTodoStatusDto) {
    return bodyData;
  }
  async updateTodoImportant(bodyData: UpdateTodoImportantDto) {
    return bodyData;
  }
  async getAllTodos() {
    return 'get-all-todos';
  }
  async getSingleTodo() {
    return 'get-single-todo';
  }
  async getImportantTodo() {
    return 'important-todo';
  }

  async getPendingTodo() {
    return 'important-todo';
  }

  async getTodaysTodo() {
    return 'todays-todo';
  }
}
