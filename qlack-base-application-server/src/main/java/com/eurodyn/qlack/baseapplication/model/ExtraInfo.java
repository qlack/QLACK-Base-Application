package com.eurodyn.qlack.baseapplication.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "extra_info")
@EqualsAndHashCode(callSuper = true)
public class ExtraInfo extends BaseEntity {
  @Column
  private Long age;
  @Column
  private Long weight;
}
