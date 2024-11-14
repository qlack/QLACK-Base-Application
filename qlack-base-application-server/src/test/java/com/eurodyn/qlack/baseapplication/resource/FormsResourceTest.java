package com.eurodyn.qlack.baseapplication.resource;

import com.eurodyn.qlack.baseapplication.dto.FormDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {FormsResource.class})
@ExtendWith(SpringExtension.class)
class FormsResourceTest {
    @Autowired
    private FormsResource formsResource;

    @Test
    void testSave_status_OK() throws Exception {

        FormDTO formDTO = new FormDTO();
        formDTO.setAge("42");
        formDTO.setName("Test");
        String content = (new ObjectMapper()).writeValueAsString(formDTO);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/forms")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);

        MockMvcBuilders.standaloneSetup(formsResource)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.content().string("{\"name\":\"Test\",\"age\":\"42\"}"));
    }

    @Test
    void testSave_status_400() throws Exception {

        FormDTO formDTO = new FormDTO();
        formDTO.setAge("test");
        formDTO.setName("");
        String content = (new ObjectMapper()).writeValueAsString(formDTO);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/forms")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);

        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(formsResource).build().perform(requestBuilder);

        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(400));
    }

}
