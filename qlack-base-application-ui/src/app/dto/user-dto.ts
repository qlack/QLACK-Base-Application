import {BaseDto} from './base-dto';

export class UserDto extends BaseDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  status: number;
}
