package com.eurodyn.qlack.baseapplication.mapper;

import com.eurodyn.qlack.baseapplication.dto.EmployeeDTO;
import com.eurodyn.qlack.baseapplication.model.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS)
public abstract class EmployeeMapper extends BaseMapper<EmployeeDTO, Employee> {

}
