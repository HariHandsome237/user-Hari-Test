import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  name!: string;

  @IsString()
  age!: number;

  @IsString()
  gender!: string;

  @IsString()
  country!: string;
}

export class CreateUserDto extends UserDto {}
export class UpdateUserDto extends UserDto {}
