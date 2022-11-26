import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoImportantDto } from './dto/update-todo-important.dto';
import { UpdateTodoStatusDto } from './dto/update-todo-status.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async getAllTodos(user: any) {
    try {
      const allTodos = await this.prismaService.todo.findMany({
        where: {
          userId: user.userId
        }
      });
      return allTodos
    } catch (error) {
      throw new HttpException(
        { msg: 'Not found' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getById(todoId: string) {
    try {
      const getTodoById = await this.prismaService.todo.findUnique({
        where: { id: todoId }
      });
      return getTodoById;
    } catch (error) {
      throw new HttpException(
        { msg: 'Not found' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async addTodo(todoBody: AddTodoDto, user: any) {
    try {
      const todo = await this.prismaService.todo.create({
        data: {
          userId: user.userId,
          title: todoBody.title,
          desc: todoBody.desc,
          isImportant: todoBody.isImportant,
        }
      })
      return todo
    } catch (error) {
      throw new HttpException(
        { msg: 'Try again!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async deleteByTodo(todoId: string) {
    try {
      const todo = await this.prismaService.todo.delete({
        where: {
          id: todoId
        }
      })
      return todo
    } catch (error) {
      throw new HttpException(
        { msg: 'Try again!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async updateTodo(bodyData: UpdateTodoDto) {
    const todo = await this.prismaService.todo.update({
      data: {
        title: bodyData.title,
        desc: bodyData.desc
      },
      where: {
        id: bodyData.todoId
      }
    })
    return todo
  }

  async updateTodoStatus(bodyData: UpdateTodoStatusDto) {
    try {
      const todo = await this.prismaService.todo.update({
        data: {
          status: bodyData.status
        },
        where: {
          id: bodyData.todoId
        }
      })
      return todo
    } catch (error) {
      throw new HttpException(
        { msg: 'Try again!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async updateTodoImportant(bodyData: UpdateTodoImportantDto) {
    try {
      const todo = await this.prismaService.todo.update({
        data: {
          isImportant: bodyData.isImportant
        },
        where: {
          id: bodyData.todoId
        }
      })
      return todo;
    } catch (error) {
      throw new HttpException(
        { msg: 'Try again!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async getIsImportant() {
    try {
      const getIsImportantTodos = await this.prismaService.todo.findMany({
        where: {
          isImportant: true
        }
      })
      return getIsImportantTodos
    } catch (error) {
      throw new HttpException(
        { msg: 'Try again!' },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
