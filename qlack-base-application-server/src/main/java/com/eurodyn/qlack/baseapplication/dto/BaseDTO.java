package com.eurodyn.qlack.baseapplication.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.Data;

import java.time.Instant;

@Data
public abstract class BaseDTO {

  private String id;

  @JsonProperty(access = Access.READ_ONLY)
  private Instant createdOn;

  @JsonProperty(access = Access.READ_ONLY)
  private String createdBy;

  @JsonProperty(access = Access.READ_ONLY)
  private Instant modifiedOn;

  @JsonProperty(access = Access.READ_ONLY)
  private String modifiedBy;

}
