import { Injectable } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {

async getAllTodos(){
  return 'all Todos';
}

async getById(getById : number){
  return 'todo by id';
}

async addTodo(todoBody : AddTodoDto){
  return 'Add todo sucessfully';
}

async deleteByTodo(todoId : number){
  return 'delete todo'
}

async updateTodo(bodyData : UpdateTodoDto){
  return 'update todo'
}

async updateTodoStatus(bodyData: UpdateTodoStatusDto){
  return 'body status';
}

  // async updateTodoStatus(bodyData: UpdateTodoStatusDto) {
  //   return bodyData;
  // }
  // async updateTodoImportant(bodyData: UpdateTodoImportantDto) {
  //   return bodyData;
  // }
  // async getImportantTodo() {
  //   return 'important-todo';
  // }
}
