package com.eurodyn.qlack.baseapplication.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "user")
public class User extends BaseEntity {
  @Column
  private String email;

  @Column
  private String password;

  @Column(name = "fn")
  private String firstname;

  @Column(name ="ln")
  private String lastname;

  @Column
  private byte status;
}
