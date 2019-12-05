package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.dto.BaseDTO;
import com.eurodyn.qlack.baseapplication.mapper.BaseMapper;
import com.eurodyn.qlack.baseapplication.model.BaseEntity;
import com.eurodyn.qlack.baseapplication.repository.BaseRepository;
import com.eurodyn.qlack.util.data.optional.ReturnOptional;
import com.querydsl.core.types.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Service
@Validated
@Transactional
public abstract class BaseService<D extends BaseDTO, E extends BaseEntity> {

  @Autowired
  protected BaseRepository<E> repository;

  @Autowired
  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  protected BaseMapper<D, E> mapper;

  public D save(D dto) {
    if (dto.getId() != null) {
      final E entity = ReturnOptional.r(repository.findById(dto.getId()));
      mapper.map(dto, entity);
      return dto;
    } else {
      E entity = mapper.map(dto);
      entity = repository.save(entity);
      return mapper.map(entity);
    }
  }

  public Page<D> findAll(Predicate predicate, Pageable pageable) {
    final Page<E> all = repository.findAll(predicate, pageable);

    return mapper.map(all);
  }

  public List<D> findAll(Predicate predicate, Sort sort) {
    final Iterable<E> all = repository.findAll(predicate, sort);
    return mapper.map(all);
  }

  public D findById(String id) {
    final E entity = ReturnOptional.r(repository.findById(id));

    return mapper.map(entity);
  }

  public E findEntityById(String id) {
    return ReturnOptional.r(repository.findById(id));
  }

  public D deleteById(String id) {
    final E entity = findEntityById(id);
    final D dto = mapper.map(entity);

    repository.deleteById(id);

    return dto;
  }

  public long count(Predicate predicate) {
    return repository.count(predicate);
  }
}
