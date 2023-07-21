package com.eurodyn.qlack.baseapplication.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = true)
@SuppressWarnings("java:S1068")
public class FileDTO extends BaseDTO {

  private String description;
  private long fileSize;
  private String fileName;
}
