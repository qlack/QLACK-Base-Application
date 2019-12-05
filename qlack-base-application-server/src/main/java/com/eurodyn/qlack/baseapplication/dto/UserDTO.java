package com.eurodyn.qlack.baseapplication.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
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
  @JsonProperty(access = Access.READ_ONLY)
  private FileDTO profilepic;

}
