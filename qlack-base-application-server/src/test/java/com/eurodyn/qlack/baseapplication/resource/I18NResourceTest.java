package com.eurodyn.qlack.baseapplication.resource;

import static org.mockito.Mockito.when;

import com.eurodyn.qlack.fuse.lexicon.service.KeyService;

import java.util.HashMap;

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

@ContextConfiguration(classes = {I18NResource.class})
@ExtendWith(SpringExtension.class)
class I18NResourceTest {
    @Autowired
    private I18NResource i18NResource;

    @MockBean
    private KeyService keyService;

    @Test
    void testProcess_successfull() throws Exception {

        when(keyService.getTranslationsForLocale(Mockito.<String>any())).thenReturn(new HashMap<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/i18n/{locale}", "en");
        MockMvcBuilders.standaloneSetup(i18NResource)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.content().string("{}"));
    }
}
