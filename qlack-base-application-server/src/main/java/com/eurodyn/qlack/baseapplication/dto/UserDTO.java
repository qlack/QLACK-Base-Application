package com.eurodyn.qlack.baseapplication.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.ReadOnlyProperty;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDTO extends BaseDTO {

  @Email
  String email;
  @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W\\_])[A-Za-z\\d\\W\\_]{8,}$")
  String password;
  @Length(min=10, max = 60)
  String firstname;
  @Length(min=10, max = 60)
  String lastname;
  @ReadOnlyProperty
  @NotNull
  byte status;
  @JsonProperty(access = Access.READ_ONLY)
  private FileDTO profilepic;
  @Valid
  private ExtraInfoDTO extraInfo;
}
