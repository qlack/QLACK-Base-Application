package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.dto.BaseDTO;
import com.eurodyn.qlack.baseapplication.dto.EmployeeDTO;
import com.eurodyn.qlack.baseapplication.mapper.BaseMapper;
import com.eurodyn.qlack.baseapplication.mapper.EmployeeMapper;
import com.eurodyn.qlack.baseapplication.model.BaseEntity;
import com.eurodyn.qlack.baseapplication.model.Employee;
import com.eurodyn.qlack.baseapplication.repository.BaseRepository;
import com.eurodyn.qlack.baseapplication.repository.EmployeeRepository;
import liquibase.integration.spring.SpringLiquibase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.content.commons.store.ContentStore;
import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @MockBean
    private SpringLiquibase springLiquibase;

    @Mock
    private BaseMapper<BaseDTO, BaseEntity> baseMapper;

    @Mock
    private BaseRepository<BaseEntity> baseRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private EmployeeMapper employeeMapper;

    @Mock
    private ContentStore<Employee, String> contentStore;


    @InjectMocks
    private BaseService<EmployeeDTO, Employee> baseService = new BaseService<>() {};

    EmployeeDTO employeeDTO = new EmployeeDTO();
    EmployeeDTO employeeDTO2 = new EmployeeDTO();
    Employee employee = new Employee();
    ZonedDateTime atStartOfDayResult1 = LocalDate.of(2021, 1, 1).atStartOfDay().atZone(ZoneId.systemDefault());

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);


        employeeDTO.setCreatedBy("Tester1");
        employeeDTO.setCreatedOn(atStartOfDayResult1.toInstant());
        employeeDTO.setDepartment("Department");
        employeeDTO.setFirstName("John");
        employeeDTO.setHiringDate(atStartOfDayResult1.toInstant());
        employeeDTO.setId(UUID.randomUUID().toString());
        employeeDTO.setLastName("Doe");
        employeeDTO.setModifiedBy("Tester1");


        employee.setCreatedBy("Tester1");
        employee.setCreatedOn(atStartOfDayResult1.toInstant());
        employee.setDepartment("Department");
        employee.setFirstName("John");
        employee.setHiringDate(atStartOfDayResult1.toInstant());
        employee.setId(UUID.randomUUID().toString());
        employee.setLastName("Doe");
        employee.setModifiedBy("Tester1");
    }

    @Test
    void testSaveWithFile() throws Exception {

        InputStream file = new ByteArrayInputStream("file content".getBytes());
        when(employeeRepository.findById(employeeDTO.getId())).thenReturn(Optional.of(employee));

        EmployeeDTO result = baseService.save(employeeDTO, file);

        assertEquals(employeeDTO, result);
        verify(employeeRepository).findById(employeeDTO.getId());
        verify(employeeMapper).map(employeeDTO, employee);
    }

    @Test
    void testSaveWithEntityandFile() throws Exception {

        InputStream file = new ByteArrayInputStream("file content".getBytes());

        employeeDTO2.setCreatedBy("Tester2");
        employeeDTO2.setCreatedOn(LocalDate.of(2024, 3, 3).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
        employeeDTO2.setDepartment("Test");
        employeeDTO2.setFirstName("John2");
        employeeDTO2.setHiringDate(LocalDate.of(2024, 3, 3).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
        employeeDTO2.setLastName("Doe2");
        employeeDTO2.setModifiedBy("Tester2");

        Employee employee2 = new Employee();
        employee2.setCreatedBy("Tester2");
        employee2.setCreatedOn(LocalDate.of(2024, 3, 3).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
        employee2.setDepartment("Test");
        employee2.setFirstName("John2");
        employee2.setHiringDate(LocalDate.of(2024, 3, 3).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
        employee2.setLastName("Doe2");
        employee2.setModifiedBy("Tester2");
        when(employeeMapper.map(Mockito.any(EmployeeDTO.class))).thenReturn(employee2);
        when(employeeMapper.map(Mockito.any(Employee.class))).thenReturn(employeeDTO2);
         when(employeeRepository.save(Mockito.any(Employee.class))).thenReturn(employee2);

        EmployeeDTO result = baseService.save(employeeDTO2, file);

        assertEquals(employeeDTO2, result);
        verify(employeeMapper).map(employee2);
    }

    @Test
    void testFindAll() {

        Predicate predicate = mock(Predicate.class);
        Pageable pageable = PageRequest.of(0, 10);
        Page<Employee> page = new PageImpl<>(Collections.singletonList(employee), pageable, 1);
        when(employeeRepository.findAll(predicate, pageable)).thenReturn(page);
        when(employeeMapper.map(page)).thenReturn(new PageImpl<>(Collections.singletonList(new EmployeeDTO()), pageable, 1));

        Page<EmployeeDTO> result = baseService.findAll(predicate, pageable);

        assertEquals(1, result.getTotalElements());
        verify(employeeRepository).findAll(predicate, pageable);
    }

    @Test
    void testFindById() {

        when(employeeRepository.findById(employeeDTO.getId())).thenReturn(Optional.of(employee));
        when(employeeMapper.map(employee)).thenReturn(employeeDTO);

        EmployeeDTO result = baseService.findById(employeeDTO.getId());

        assertEquals(employeeDTO, result);
        verify(employeeRepository).findById(employeeDTO.getId());
        verify(employeeMapper).map(employee);
    }

    @Test
    void testDeleteById() {

        when(employeeRepository.findById(employeeDTO.getId())).thenReturn(Optional.of(employee));
        when(employeeMapper.map(employee)).thenReturn(employeeDTO);
        doNothing().when(employeeRepository).deleteById(employeeDTO.getId());

        EmployeeDTO result = baseService.deleteById(employeeDTO.getId());

        assertEquals(employeeDTO, result);
        verify(employeeRepository).findById(employeeDTO.getId());
        verify(employeeMapper).map(employee);
        verify(employeeRepository).deleteById(employeeDTO.getId());
    }

    @Test
    public void testDeleteByIdIn() {
        List<String> ids = Arrays.asList("id1", "id2");
        List<Employee> entities = Arrays.asList(new Employee(), new Employee());
        when(employeeRepository.findAllById(ids)).thenReturn(entities);

        baseService.deleteByIdIn(ids);

        verify(employeeRepository).deleteAll(entities);
    }

    @Test
    @WithMockUser(username = "testUser")
    public void testGetUserId() {
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getPrincipal()).thenReturn("testUser");
        SecurityContextHolder.setContext(securityContext);

        String userId = baseService.getUserId();

        assertEquals("testUser", userId);
    }

}