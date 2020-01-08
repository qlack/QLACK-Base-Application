package com.eurodyn.qlack.baseapplication.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "extra_info")
public class ExtraInfo extends BaseEntity {
  @Column
  private Long age;
  @Column
  private Long weight;
}
