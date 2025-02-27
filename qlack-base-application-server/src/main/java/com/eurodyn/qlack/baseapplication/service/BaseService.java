package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.dto.BaseDTO;
import com.eurodyn.qlack.baseapplication.mapper.BaseMapper;
import com.eurodyn.qlack.baseapplication.model.BaseContentEntity;
import com.eurodyn.qlack.baseapplication.model.BaseEntity;
import com.eurodyn.qlack.baseapplication.repository.BaseRepository;
import com.eurodyn.qlack.util.data.optional.ReturnOptional;
import com.querydsl.core.types.Predicate;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.content.commons.store.ContentStore;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.io.InputStream;
import java.util.List;

@Service
@Validated
@Transactional
abstract class BaseService<D extends BaseDTO, E extends BaseEntity> {

  @Getter
  @Autowired
  private BaseRepository<E> repository;

  @Autowired
  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  private BaseMapper<D, E> mapper;

  @Autowired(required = false)
  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  private ContentStore<E, String> contentStore;

  public D save(D dto, InputStream file) {
    if (StringUtils.isNotEmpty(dto.getId())) {
      final E entity = ReturnOptional.r(repository.findById(dto.getId()));
      mapper.map(dto, entity);
      return dto;
    } else {
      E entity = mapper.map(dto);
      contentStore.setContent(entity, file);
      entity = repository.save(entity);
      return mapper.map(entity);
    }
  }

  public void saveAll(List<D> dto) {
    for (D d : dto) {
      save(d);
    }
  }

  public E saveEntity(D dto) {
    E entity;

    if (StringUtils.isNotEmpty(dto.getId())) {
      entity = ReturnOptional.r(repository.findById(dto.getId()));
      mapper.map(dto, entity);
    } else {
      entity = mapper.map(dto);
      entity = repository.save(entity);
    }

    return entity;
  }

  public D save(D dto) {
    return mapper.map(saveEntity(dto));
  }

  public Page<D> findAll(Predicate predicate, Pageable pageable) {
    final Page<E> all = repository.findAll(predicate, pageable);

    return mapper.map(all);
  }

  public List<D> findAll() {
    return mapper.map(repository.findAll());
  }

  public D findById(String id) {
    return mapper.map(ReturnOptional.r(repository.findById(id)));
  }

  public E findEntityById(String id) {
    return ReturnOptional.r(repository.findById(id));
  }

  public D deleteById(String id) {
    final E entity = findEntityById(id);
    final D dto = mapper.map(entity);

    // Check and remove any file associated with this entity.
    if (entity instanceof BaseContentEntity) {
      contentStore.unsetContent(entity);
    }
    repository.deleteById(id);

    return dto;
  }

  public void deleteByIdIn(List<String> ids) {
    repository.deleteAll(repository.findAllById(ids));
  }

  public String getUserId() {
    return SecurityContextHolder.getContext().getAuthentication().getPrincipal()
        .toString();
  }
}
