import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { commonErrors } from 'src/constants/error';
import { User } from 'src/entities/user.entity';
import {
  CreateUserParams,
  CreateUserParamsResponse,
  FindUserParams,
  FindUserParamsResponse,
  FindUserQueryParams,
  UpdateUserParams,
  UpdateUserParamsResponse,
} from 'src/interfaces/user.interface';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  CreateUser = async (
    params: CreateUserParams,
  ): Promise<CreateUserParamsResponse> => {
    try {
      const { data } = params;

      const userData = {
        User,
        ...plainToClass(User, data),
      };

      await this.userRepo.create(userData);

      const saveUser = await this.userRepo.save(userData);

      return {
        id: saveUser?.id,
        message: 'User Created Successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message:
            error instanceof Error
              ? error.message
              : commonErrors.noMessage.message,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  findAllUser = async (
    queryParams: FindUserQueryParams,
  ): Promise<FindUserParamsResponse> => {
    try {
      const { query: params } = queryParams;
      const filter: FindManyOptions = {};

      const where: any = {};

      if (params.id) {
        //params - whatever we type in params
        where.id = `${params.id}`;
      }

      if (params.name) {
        where.name = `${params.name}`;
      }
      if (params.age) {
        where.age = `${params.age}`;
      }

      if (params.gender) {
        where.gender = `${params.gender}`;
      }

      if (params.country) {
        where.country = `${params.country}`;
      }

      let skip = 0;
      let take = 0;
      let pagination = '';
      const sortby = params.sortby || 'createdAt';
      const order = params.order || 'DESC';
      const sort: any = {}; // sort: any - we giving any beacuse sort can be number,string,null so giving any(any accepts alltypes)
      sort[sortby] = order; //sorting order
      filter.order = sort; //filter order

      if (
        params.skip &&
        params.take &&
        !isNaN(params.skip) &&
        !isNaN(params.take)
      ) {
        skip = Number(params.skip);
        take = Number(params.take);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        pagination = ` LIMIT ${take} OFFSET ${skip}`;
      }

      filter.where = where;

      const [data, total] = await this.userRepo.findAndCount(filter);

      return {
        total: total,
        data: data,
        message: 'Success',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message:
            error instanceof Error
              ? error.message
              : commonErrors.noMessage.message,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  findOneUser = async (id: string): Promise<any> => {
    try {
      const idExist = await this.userRepo.findOne({
        where: { id: id },
      });

      if (!idExist) {
        throw Error(commonErrors.userNotFound.message);
      }

      return {
        data: idExist,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message:
            error instanceof Error
              ? error.message
              : commonErrors.noMessage.message,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  };

  updateUser = async (
    params: UpdateUserParams,
  ): Promise<UpdateUserParamsResponse> => {
    try {
      const { data, id } = params;

      const idExist = await this.userRepo.findOne({
        where: { id: id },
      });
      if (!idExist) throw Error(commonErrors.userNotFound.message);

      // const userData = {
      //   User,
      //   ...plainToClass(User, data),
      // };

      const UpdateUserDatas = {
        id,
        name: data.name,
        age: data.age,
        gender: data.gender,
        country: data.country,
      };

      await this.userRepo.update(id, UpdateUserDatas);

      return {
        id: id,
        message: 'User Updated successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message:
            error instanceof Error
              ? error.message
              : commonErrors.noMessage.message,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  };
}
