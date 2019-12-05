package com.eurodyn.qlack.baseapplication.mapper;

import com.eurodyn.qlack.baseapplication.dto.BaseDTO;
import com.eurodyn.qlack.baseapplication.model.BaseEntity;
import com.eurodyn.qlack.baseapplication.repository.BaseRepository;
import com.eurodyn.qlack.util.data.optional.ReturnOptional;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public abstract class BaseMapper<D extends BaseDTO, E extends BaseEntity> {

  @Autowired
  BaseRepository<E> repository;

  @Mapping(ignore = true, target = "modifiedBy")
  @Mapping(ignore = true, target = "modifiedOn")
  @Mapping(ignore = true, target = "createdBy")
  @Mapping(ignore = true, target = "version")
  public abstract E map(D dto);

  public abstract D map(E entity);

  @Mapping(ignore = true, target = "modifiedBy")
  @Mapping(ignore = true, target = "modifiedOn")
  @Mapping(ignore = true, target = "createdBy")
  @Mapping(ignore = true, target = "version")
  public abstract void map(D dto, @MappingTarget E entity);

  public Page<D> map(Page<E> all) {
    return all.map(this::map);
  }

  public Iterable<E> mapDTOs(Collection<D> all) {
    return StreamSupport.stream(all.spliterator(), true).map(this::map)
        .collect(Collectors.toList());
  }

  public Iterable<D> mapModels(Collection<E> all) {
    return StreamSupport.stream(all.spliterator(), true).map(this::map)
        .collect(Collectors.toList());
  }

  public List<D> map(List<E> all) {
    return all.stream().map(this::map).collect(Collectors.toList());
  }

  public List<D> map(Iterable<E> all) {
    return StreamSupport.stream(all.spliterator(), false).map(this::map)
        .collect(Collectors.toList());
  }

  public E map(String entityId) {
    return ReturnOptional.r(repository.findById(entityId));
  }

  public String mapToEntityId(E entity) {
    return entity != null ? entity.getId() : null;
  }

}
