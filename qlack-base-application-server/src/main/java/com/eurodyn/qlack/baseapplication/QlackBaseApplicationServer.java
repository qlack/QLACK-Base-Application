package com.eurodyn.qlack.baseapplication;

import java.util.TimeZone;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import jakarta.annotation.PostConstruct;
import lombok.extern.java.Log;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@Log
@SpringBootApplication
@EntityScan({"com.eurodyn"})
@ComponentScan({"com.eurodyn"})
@EnableJpaRepositories({"com.eurodyn"})
@EnableScheduling
public class QlackBaseApplicationServer {

  public static void main(String[] args) {
    SpringApplication.run(QlackBaseApplicationServer.class, args);
  }

  @PostConstruct
  void started() {
    log.log(Level.INFO, "Timezone name  : {0}", TimeZone.getDefault().getDisplayName());
    log.log(Level.INFO, "Timezone ID    : {0}", TimeZone.getDefault().getID());
    log.log(Level.INFO, "Timezone offset: {0} minutes",
        TimeUnit.MILLISECONDS.toMinutes(TimeZone.getDefault().getRawOffset()));
    log.log(Level.INFO, "Application started.");
  }

}
