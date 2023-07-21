package com.eurodyn.qlack.baseapplication.dto;


import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@SuppressWarnings("java:S1068")
public class LoginDTO {
  private String email;
  private String password;
}
