package com.eurodyn.qlack.baseapplication.mapper;

import com.eurodyn.qlack.baseapplication.dto.UserDTO;
import com.eurodyn.qlack.baseapplication.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValueCheckStrategy;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public abstract class UserMapper extends BaseMapper<UserDTO, User> {

  @Mapping(ignore = true, target = "profilepic")
  @Mapping(ignore = true, target = "extraInfo")
  public abstract void map(UserDTO dto, @MappingTarget User entity);
}
