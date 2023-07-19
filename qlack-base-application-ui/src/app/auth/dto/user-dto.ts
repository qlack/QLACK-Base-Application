import {BaseDto} from "../../dto/base-dto";
import {FileDto} from "../../files/dto/file-dto";
import {ExtraInfoDto} from "../../dto/extra-info-dto";

export class UserDto extends BaseDto {
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  status?: number;
  profilepic?: FileDto;
  extraInfo?: ExtraInfoDto;
}
