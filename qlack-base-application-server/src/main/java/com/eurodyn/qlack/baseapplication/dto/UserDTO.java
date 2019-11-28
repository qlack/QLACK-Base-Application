package com.eurodyn.qlack.baseapplication.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO extends BaseDTO {

  @Email(message = "Username should be a vaild email")
  String email;
  String password;
  @NotEmpty
  String firstname;
  @NotEmpty
  String lastname;
  @NotEmpty
  byte status;

}
