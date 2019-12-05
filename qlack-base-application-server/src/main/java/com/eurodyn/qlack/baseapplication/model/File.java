package com.eurodyn.qlack.baseapplication.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "file")
public class File extends BaseEntity {

  @Column
  private String name;
}

