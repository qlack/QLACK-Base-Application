package com.eurodyn.qlack.baseapplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.Optional;

@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider", modifyOnCreate = false)
public class DBAuditConfig {

  @Bean
  public AuditorAware<String> auditorProvider() {
    return () -> Optional.of("SYSTEM");
  }

}
