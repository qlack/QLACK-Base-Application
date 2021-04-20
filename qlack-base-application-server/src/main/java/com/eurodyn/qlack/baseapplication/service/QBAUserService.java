package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.config.AppConstants.Audit.Event;
import com.eurodyn.qlack.baseapplication.config.AppConstants.Audit.Level;
import com.eurodyn.qlack.baseapplication.config.AppConstants.Jwt;
import com.eurodyn.qlack.common.exception.QAuthenticationException;
import com.eurodyn.qlack.fuse.aaa.dto.UserDTO;
import com.eurodyn.qlack.fuse.audit.dto.AuditDTO;
import com.eurodyn.qlack.fuse.audit.service.AuditService;
import com.eurodyn.qlack.util.jwt.dto.JwtDTO;
import com.eurodyn.qlack.util.jwt.dto.JwtGenerateRequestDTO;
import com.eurodyn.qlack.util.jwt.service.JwtService;
import java.text.MessageFormat;
import javax.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class QBAUserService {

  private final com.eurodyn.qlack.fuse.aaa.service.UserService qlackUserService;
  private final AuditService auditService;
  private final JwtService jwtService;

  /**
   * Attempts to authenticate a user.
   *
   * @param email    The email to authenticate with.
   * @param password The password to authenticate with.
   * @return Returns a JWT if authentication was successful, or null otherwise.
   */
  @Transactional(noRollbackFor = QAuthenticationException.class)
  public JwtDTO authenticate(@NotBlank String email, @NotBlank String password) {
    // Return an error if the user could not be authenticated.
    String userId = qlackUserService.canAuthenticate(email, password);
    if (StringUtils.isBlank(userId)) {
      auditService.audit(new AuditDTO()
          .setLevel(Level.SECURITY)
          .setEvent(Event.AUTHENTICATION)
          .setOpt1(email)
          .setShortDescription(
              MessageFormat.format("User {0} could not be authenticated.", email)));
      throw new QAuthenticationException("User {0} could not authenticate.", email);
    }

    // Login the user and prepare a JWT.
    final UserDTO userDTO = qlackUserService.login(userId, null, true);
    auditService.audit(Level.SECURITY, Event.AUTHENTICATION,
        "User {0} authenticated successfully.", email);
    final String jwt = jwtService.generateJwt(JwtGenerateRequestDTO.builder()
        .subject(userDTO.getId())
        .claim(Jwt.CLAIM_EMAIL, userDTO.getUsername())
        .build());

    return JwtDTO.builder().jwt(jwt).build();
  }

}
