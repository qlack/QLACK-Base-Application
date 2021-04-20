package com.eurodyn.qlack.baseapplication.resource;

import com.eurodyn.qlack.baseapplication.dto.EmployeeDTO;
import com.eurodyn.qlack.baseapplication.model.Employee;
import com.eurodyn.qlack.baseapplication.service.EmployeeService;
import com.eurodyn.qlack.common.exception.QExceptionWrapper;
import com.eurodyn.qlack.util.data.exceptions.ExceptionWrapper;
import com.eurodyn.qlack.util.data.filter.ReplyFilter;
import com.eurodyn.qlack.util.data.filter.ReplyPageableFilter;
import com.eurodyn.qlack.util.querydsl.EmptyPredicateCheck;
import com.querydsl.core.types.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("sensitive")
@RequiredArgsConstructor
public class SensitiveResource {

  private final EmployeeService employeeService;

  @EmptyPredicateCheck
  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  @ReplyPageableFilter("-createdBy,-createdOn")
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not retrieve employees list.")
  public Page<EmployeeDTO> findAll(@QuerydslPredicate(root = Employee.class) Predicate predicate,
      Pageable pageable) {
    return employeeService.findAll(predicate, pageable);
  }

  @EmptyPredicateCheck
  @GetMapping(path = "nofilter", produces = MediaType.APPLICATION_JSON_VALUE)
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not retrieve employees list.")
  public Page<EmployeeDTO> findAllUnfiltered(@QuerydslPredicate(root = Employee.class) Predicate predicate,
      Pageable pageable) {
    return employeeService.findAll(predicate, pageable);
  }

  @ReplyFilter("-createdBy,-createdOn")
  @GetMapping(path = "{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not fetch employee.")
  public EmployeeDTO get(@PathVariable String id) {
    return employeeService.findById(id);
  }

  @GetMapping(path = "{id}/nofilter", produces = MediaType.APPLICATION_JSON_VALUE)
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, logMessage = "Could not fetch employee.")
  public EmployeeDTO getUnfiltered(@PathVariable String id) {
    return employeeService.findById(id);
  }

}
