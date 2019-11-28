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
public class LoginInfoDTO {

  @Email(message = "Should be a valid email")
  private String email;
  @NotEmpty
  private String password;
}

