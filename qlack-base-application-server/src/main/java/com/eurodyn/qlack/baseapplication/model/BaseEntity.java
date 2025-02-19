package com.eurodyn.qlack.baseapplication.model;

import com.querydsl.core.annotations.QuerySupertype;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OptimisticLockType;
import org.hibernate.annotations.OptimisticLocking;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

@Data
@QuerySupertype
@MappedSuperclass
@OptimisticLocking(type = OptimisticLockType.VERSION)
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

  @Id
  @GeneratedValue
  @UuidGenerator
  private String id;

  @CreatedDate
  @Column(name = "created_on", updatable = false, nullable = false)
  private Instant createdOn;

  @CreatedBy
  @Column(name = "created_by", updatable = false, nullable = false)
  private String createdBy;

  @LastModifiedDate
  @Column(name = "modified_on")
  private Instant modifiedOn;

  @LastModifiedBy
  private String modifiedBy;

  @Version
  private Long version;
}
