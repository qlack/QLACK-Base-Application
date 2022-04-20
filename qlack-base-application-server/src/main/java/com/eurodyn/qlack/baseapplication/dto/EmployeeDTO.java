package com.eurodyn.qlack.baseapplication.dto;

import java.time.Instant;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
public class EmployeeDTO extends BaseDTO {
  @NotNull
  private String firstName;
  @NotNull
  private String lastName;
  @NotNull
  private String department;
  @NotNull
  private Instant hiringDate;
}
