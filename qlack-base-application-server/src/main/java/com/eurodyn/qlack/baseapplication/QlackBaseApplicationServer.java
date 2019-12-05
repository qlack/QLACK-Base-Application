package com.eurodyn.qlack.baseapplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories({
    "com.eurodyn.qlack.baseapplication.repository"
})
@EntityScan({
    "com.eurodyn.qlack.baseapplication.model"
})
@ComponentScan(basePackages = {
    "com.eurodyn.qlack.baseapplication.web",
    "com.eurodyn.qlack.baseapplication.service",
    "com.eurodyn.qlack.baseapplication.mapper",
    "com.eurodyn.qlack.baseapplication.config",
    "com.eurodyn.qlack.util.*"
})
public class QlackBaseApplicationServer {

  public static void main(String[] args) {
    SpringApplication.run(QlackBaseApplicationServer.class, args);
  }

}
