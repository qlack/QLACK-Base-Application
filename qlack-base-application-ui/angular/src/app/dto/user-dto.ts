import {BaseDto} from './base-dto';
import {FileDto} from './file-dto';

export class UserDto extends BaseDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  status: number;
  profilepic: FileDto;
}
