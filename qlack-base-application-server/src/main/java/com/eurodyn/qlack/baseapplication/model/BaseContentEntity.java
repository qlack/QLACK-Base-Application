package com.eurodyn.qlack.baseapplication.model;

import com.querydsl.core.annotations.QuerySupertype;
import javax.persistence.MappedSuperclass;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.OptimisticLockType;
import org.hibernate.annotations.OptimisticLocking;
import org.springframework.content.commons.annotations.ContentId;
import org.springframework.content.commons.annotations.ContentLength;

@Data
@QuerySupertype
@MappedSuperclass
@EqualsAndHashCode(callSuper = true)
@OptimisticLocking(type = OptimisticLockType.VERSION)
public abstract class BaseContentEntity extends BaseEntity {

  @ContentId
  private String contentId;
  @ContentLength
  private long fileSize;
}
