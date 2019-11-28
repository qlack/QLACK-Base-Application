package com.eurodyn.qlack.baseapplication;

import static org.assertj.core.api.Assertions.assertThat;

import com.eurodyn.qlack.baseapplication.web.LoginController;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = QlackBaseApplicationServer.class)
@AutoConfigureMockMvc
@TestPropertySource(
    locations = "classpath:applicationIT.properties")
class QlackBaseApplicationServerTests {

  @Autowired
  private LoginController loginController;

  @Test
  public void contextLoads() {
    assertThat(loginController).isNotNull();
  }

}
