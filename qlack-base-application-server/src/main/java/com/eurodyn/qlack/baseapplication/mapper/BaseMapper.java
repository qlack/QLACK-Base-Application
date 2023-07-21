package com.eurodyn.qlack.baseapplication.mapper;

import com.eurodyn.qlack.baseapplication.dto.BaseDTO;
import com.eurodyn.qlack.baseapplication.model.BaseEntity;
import com.eurodyn.qlack.baseapplication.repository.BaseRepository;
import com.eurodyn.qlack.util.data.optional.ReturnOptional;
import java.util.Collection;
import java.util.List;
import java.util.stream.StreamSupport;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;

/**
 * A base mapper providing default conversions.
 *
 * @param <D> A DTO class extending the {@link BaseDTO}
 * @param <E> A model/entity class extending the {@link BaseEntity}
 */
@SuppressWarnings("MapperOrMapperConfigMissing")
public abstract class BaseMapper<D extends BaseDTO, E extends BaseEntity> {

  // The Spring Data Repository to use for Entities. This is a dynamic parametrised type resolved
  // in runtime.
  @Autowired
//  @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
  BaseRepository<E> repository;

  /**
   * Converts a DTO to the respective Entity class.
   *
   * @param dto The DTO to be converted.
   * @return Returns the Entity representation of the DTO.
   */
  @Mapping(ignore = true, target = "modifiedBy")
  @Mapping(ignore = true, target = "modifiedOn")
  @Mapping(ignore = true, target = "createdBy")
  @Mapping(ignore = true, target = "version")
  public abstract E map(D dto);

  /**
   * Converts an Entity class to a DTO.
   *
   * @param entity The Entity class to convert.
   * @return Returns the DTO representation of the Entity class.
   */
  public abstract D map(E entity);

  /**
   * Copies the content of a DTO class to the given Entity class.
   *
   * @param dto The DTO to act as data source.
   * @param entity The Entity class to act as data target.
   */
  @Mapping(ignore = true, target = "modifiedBy")
  @Mapping(ignore = true, target = "modifiedOn")
  @Mapping(ignore = true, target = "createdBy")
  @Mapping(ignore = true, target = "version")
  public abstract void map(D dto, @MappingTarget E entity);

  /**
   * Convenience method to map a Spring {@link org.springframework.data.domain.Pageable} result list
   * to a list of DTOs.
   *
   * @param all The result data {@link Page} to convert.
   */
  public Page<D> map(Page<E> all) {
    return all.map(this::map);
  }

  /**
   * Convenience method to convert a {@link Collection} of DTOs to their {@link Iterable} Entity
   * class representations.
   *
   * @param collection The collection of DTOs to convert.
   * @return Returns an {@link Iterable} of Entity classes mapped after the given DTOs.
   */
  public Iterable<E> mapDTOs(Collection<D> collection) {
    return collection.parallelStream().map(this::map).toList();
  }

  /**
   * Convenience method to convert a {@link Collection} of Entity classes to their {@link Iterable}
   * DTO representation.
   *
   * @param collection The collection of Entity classes to convert.
   * @return Returns an {@link Iterable} of DTOs mapped after their given Entity classes.
   */
  public Iterable<D> mapModels(Collection<E> collection) {
    return collection.parallelStream().map(this::map).toList();
  }

  /**
   * Converts a list of Entity classes to their DTO representation.
   *
   * @param list The list of Entity classes to map to DTO.
   * @return Returns a {@link List} of DTOs mapped after their respective Entity class.
   */
  public List<D> map(List<E> list) {
    return list.stream().map(this::map).toList();
  }

  /**
   * Converts an {@link Iterable} Entity classes to their {@link List} DTO representation.
   *
   * @param list The {@link Iterable} of Entity classes to be converted.
   * @return Returns a list of DTOs mapped after their respective Entity class.
   */
  public List<D> map(Iterable<E> list) {
    return StreamSupport.stream(list.spliterator(), false).map(this::map).toList();
  }

  /**
   * Finds an Entity class by its {@link Long} primary key.
   *
   * @param entityId The primary key of the Entity to lookup.
   * @return Returns the Entity represented by the given primary key.
   * @throws com.eurodyn.qlack.common.exception.QDoesNotExistException when no Entity could be
   * found.
   */
  public E map(String entityId) {
    return ReturnOptional.r(repository.findById(entityId));
  }

  /**
   * Returns the {@link Long} primary key of the given Entity.
   *
   * @param entity The Entity to find its {@link Long} primary key value.
   * @return Returns the primary key value of the given Entity.
   */
  public String mapToEntityId(E entity) {
    return entity != null ? entity.getId() : null;
  }
}
