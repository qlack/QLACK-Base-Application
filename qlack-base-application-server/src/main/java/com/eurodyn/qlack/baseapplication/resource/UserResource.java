package com.eurodyn.qlack.baseapplication.resource;

import com.eurodyn.qlack.baseapplication.dto.LoginDTO;
import com.eurodyn.qlack.baseapplication.service.QBAUserService;
import com.eurodyn.qlack.common.exception.QAuthenticationException;
import com.eurodyn.qlack.common.exception.QExceptionWrapper;
import com.eurodyn.qlack.util.data.exceptions.ExceptionWrapper;
import com.eurodyn.qlack.util.jwt.dto.JwtDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@Transactional
@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserResource {

  private final QBAUserService qbaUserService;

  /**
   * Authenticates a user and returns a JWT if authentication was successful.
   *
   * @param loginDTO The email and password of the user to authenticate.
   * @return Returns the JWT.
   */
  @PostMapping(value = "auth", produces = MediaType.APPLICATION_JSON_VALUE)
  @Transactional(noRollbackFor = QAuthenticationException.class)
  @ExceptionWrapper(wrapper = QExceptionWrapper.class, ignore = {
      QAuthenticationException.class})
  public JwtDTO authenticate(@RequestBody LoginDTO loginDTO) {
    // Try to authenticate the user.
    return qbaUserService.authenticate(loginDTO.getEmail(), loginDTO.getPassword());
  }
}
