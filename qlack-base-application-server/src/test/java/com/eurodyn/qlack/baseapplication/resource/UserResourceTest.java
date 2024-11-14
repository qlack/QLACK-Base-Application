package com.eurodyn.qlack.baseapplication.resource;

import static org.mockito.Mockito.when;

import com.eurodyn.qlack.baseapplication.dto.LoginDTO;
import com.eurodyn.qlack.baseapplication.service.QBAUserService;
import com.eurodyn.qlack.util.jwt.dto.JwtDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {UserResource.class})
@ExtendWith(SpringExtension.class)
class UserResourceTest {
    @MockBean
    private QBAUserService qBAUserService;

    @Autowired
    private UserResource userResource;

    @Test
    void testAuthenticate() throws Exception {

        JwtDTO buildResult = JwtDTO.builder().jwt("eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlOTIyOTU2Zi1lYjliLTRlMWItYjI2Yy1kMTY2NTI1MTZkYWQiLCJpYXQiOjE3MzA3MzAwODUsIm5iZiI6MTczMDczMDA4NSwic3ViIjoiNDIiLCJpc3MiOiJxbGFjayIsImV4cCI6MTczMDczMzY4NSwiZW1haWwiOiJqYW5lZG9lIn0.gufTCAxZ16L8sbxunTF2uQzsA9MxqnrA6VahfbLx6AY").build();
        when(qBAUserService.authenticate(Mockito.<String>any(), Mockito.<String>any())).thenReturn(buildResult);
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("tester1@test.com");
        loginDTO.setPassword("TestPass");
        String content = (new ObjectMapper()).writeValueAsString(loginDTO);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/users/auth")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        MockMvcBuilders.standaloneSetup(userResource)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.content().string("{\"jwt\":\"eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlOTIyOTU2Zi1lYjliLTRlMWItYjI2Yy1kMTY2NTI1MTZkYWQiLCJpYXQiOjE"
                        + "3MzA3MzAwODUsIm5iZiI6MTczMDczMDA4NSwic3ViIjoiNDIiLCJpc3MiOiJxbGFjayIsImV4cCI6MTczMDczMzY4NSwiZW1haWw"
                        + "iOiJqYW5lZG9lIn0.gufTCAxZ16L8sbxunTF2uQzsA9MxqnrA6VahfbLx6AY\"}"));
    }
}
