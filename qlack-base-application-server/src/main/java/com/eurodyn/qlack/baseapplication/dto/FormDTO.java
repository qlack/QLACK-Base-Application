package com.eurodyn.qlack.baseapplication.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class FormDTO {
  @NotNull @Size(min = 2)
  private String name;
  @NotNull @Min(18)
  private String age;
}
