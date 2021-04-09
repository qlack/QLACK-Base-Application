import {BaseDto} from './base-dto';
import {FileDto} from './file-dto';
import {ExtraInfoDto} from './extra-info-dto';

export class UserDto extends BaseDto {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  status: number;
  profilepic: FileDto;
  extraInfo: ExtraInfoDto;
}
