import { HttpStatus } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/user.dto';

export interface commonParams {
  fromDate?: string;
  toDate?: string;
}

export interface sortParams {
  order?: string;
  sortby?: string;
  skip?: number;
  take?: number;
}

export interface FindUserDatas {
  id: string;
  name: string;
  age: number;
  gender: string;
  country: string;
}

export interface FindUserParams extends commonParams, sortParams {
  id?: string;
  name?: string;
  age?: number;
  gender?: string;
  country?: string;
}

export interface FindUserQueryParams {
  query: FindUserParams;
}

export type FindUserParamsResponse = {
  total: number;
  data: Array<FindUserDatas>;
  message: string;
  status: HttpStatus;
};

export interface CreateUserParams {
  data: CreateUserDto;
}

export type CreateUserParamsResponse = {
  id: string;
  message: string;
  status: HttpStatus;
};

export interface UpdateUserParams {
  id: string;
  data: UpdateUserDto;
}

export type UpdateUserParamsResponse = {
  id: string;
  message: string;
  status: HttpStatus;
};

export interface DeleteUserParams {
  id: string;
}

export type DeleteUserParamsResponse = {
  message: string;
  status: HttpStatus;
};
