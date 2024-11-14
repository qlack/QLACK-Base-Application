package com.eurodyn.qlack.baseapplication.resource;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.eurodyn.qlack.baseapplication.mapper.BaseMapper;
import com.eurodyn.qlack.baseapplication.repository.BaseRepository;
import com.eurodyn.qlack.baseapplication.dto.EmployeeDTO;
import com.eurodyn.qlack.baseapplication.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@EnableSpringDataWebSupport
@ContextConfiguration(classes = {SensitiveResource.class, EmployeeService.class})
@ExtendWith(SpringExtension.class)
public class SensitiveResourceTest {

    @MockBean
    private BaseMapper baseMapper;

    @MockBean
    private BaseRepository baseRepository;

    @Autowired
    private SensitiveResource sensitiveResource;

    @MockBean
    private EmployeeService employeeService;

    ZonedDateTime atStartOfDayResult1 = LocalDate.of(2021, 1, 1).atStartOfDay().atZone(ZoneId.systemDefault());

    EmployeeDTO employeeDTO = new EmployeeDTO();

    @BeforeEach
    public void setup() {
        employeeDTO.setCreatedBy("Tester1");
        employeeDTO.setCreatedOn(atStartOfDayResult1.toInstant());
        employeeDTO.setDepartment("Department");
        employeeDTO.setFirstName("John");
        employeeDTO.setHiringDate(atStartOfDayResult1.toInstant());
        employeeDTO.setId(UUID.randomUUID().toString());
        employeeDTO.setLastName("Doe");
        employeeDTO.setModifiedBy("Tester1");
    }

    @Test
    public void testGet() throws Exception {

        when(employeeService.findById(anyString())).thenReturn(employeeDTO);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/sensitive/{id}", employeeDTO.getId())
                        .contentType(MediaType.APPLICATION_JSON);
        ResultActions resultActions = MockMvcBuilders.standaloneSetup(sensitiveResource)
                .build()
                .perform(requestBuilder);
        resultActions.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.id").value(employeeDTO.getId()));
    }

    @Test
    public void testGetUnfiltered() throws Exception {

        when(employeeService.findById(anyString())).thenReturn(employeeDTO);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/sensitive/{id}/nofilter", employeeDTO.getId())
                .contentType(MediaType.APPLICATION_JSON);
        ResultActions resultActions = MockMvcBuilders.standaloneSetup(sensitiveResource)
                .build()
                .perform(requestBuilder);

        resultActions.andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.id").value(employeeDTO.getId()));
    }
}