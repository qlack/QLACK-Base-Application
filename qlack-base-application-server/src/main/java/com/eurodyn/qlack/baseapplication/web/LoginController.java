package com.eurodyn.qlack.baseapplication.web;

import com.eurodyn.qlack.baseapplication.dto.LoginInfoDTO;
import com.eurodyn.qlack.baseapplication.service.LoginService;
import com.eurodyn.qlack.common.exception.QAuthenticationException;
import com.eurodyn.qlack.common.exception.QExceptionWrapper;
import com.eurodyn.qlack.util.data.exceptions.ExceptionWrapper;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {

  @Autowired
  private final LoginService loginService;


  @CrossOrigin(origins = "*")
  @PostMapping
  @ExceptionWrapper(wrapper = QExceptionWrapper.class,
      logMessage = "Invalid credentials.")
  public ResponseEntity login(@Valid @RequestBody LoginInfoDTO loginInfoDTO) {
    if (!loginService.canLogin(loginInfoDTO)) {
      throw new QAuthenticationException("Invalid credentials.");
    }
      return ResponseEntity.ok().build();
  }

}
