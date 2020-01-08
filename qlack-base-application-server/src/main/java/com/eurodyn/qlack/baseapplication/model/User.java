package com.eurodyn.qlack.baseapplication.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "profile_pic")
  private File profilepic;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "extra_info")
  private ExtraInfo extraInfo;
}
