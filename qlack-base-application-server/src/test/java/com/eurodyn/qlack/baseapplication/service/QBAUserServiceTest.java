package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.common.exception.QAuthenticationException;
import com.eurodyn.qlack.fuse.aaa.dto.UserDTO;
import com.eurodyn.qlack.fuse.aaa.service.UserService;
import com.eurodyn.qlack.fuse.audit.dto.AuditDTO;
import com.eurodyn.qlack.fuse.audit.service.AuditService;
import com.eurodyn.qlack.util.jwt.dto.JwtDTO;
import com.eurodyn.qlack.util.jwt.dto.JwtGenerateRequestDTO;
import com.eurodyn.qlack.util.jwt.service.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.anyBoolean;
import static org.mockito.Mockito.*;

@ContextConfiguration(classes = {QBAUserService.class})
@ExtendWith(SpringExtension.class)
class QBAUserServiceTest {
    @MockitoBean
    private AuditService auditService;

    @MockitoBean
    private JwtService jwtService;

    @Autowired
    private QBAUserService qBAUserService;

    @MockitoBean
    private UserService userService;


    @Test
    void testAuthenticate() {
        UserDTO userDTO = new UserDTO();
        userDTO.setExternal(true);
        userDTO.setId("1");
        userDTO.setPassword("TestPass");
        userDTO.setSessionId("1");
        userDTO.setStatus((byte) 'A');
        userDTO.setSuperadmin(true);
        userDTO.setUserAttributes(new HashSet<>());
        userDTO.setUsername("tester1");
        when(userService.login(Mockito.<String>any(), Mockito.<String>any(), anyBoolean())).thenReturn(userDTO);
        when(userService.canAuthenticate(Mockito.<String>any(), Mockito.<String>any())).thenReturn("Can Authenticate");
        doNothing().when(auditService)
                .audit(Mockito.<String>any(), Mockito.<String>any(), Mockito.<String>any(), isA(Object[].class));
        when(jwtService.generateJwt(Mockito.<JwtGenerateRequestDTO>any())).thenReturn("Generate Jwt");

        JwtDTO actualAuthenticateResult = qBAUserService.authenticate("tester1@test.com", "TestPass");

        verify(userService).canAuthenticate(eq("tester1@test.com"), eq("TestPass"));
        verify(userService).login(eq("Can Authenticate"), isNull(), eq(true));
        verify(auditService).audit(eq("Security"), eq("Authentication"), eq("User {0} authenticated successfully."),
                isA(Object[].class));
        verify(jwtService).generateJwt(isA(JwtGenerateRequestDTO.class));
        assertEquals("Generate Jwt", actualAuthenticateResult.getJwt());
    }


    @Test
    void testAuthenticate_QAuthenticationException() {
        when(userService.canAuthenticate(Mockito.<String>any(), Mockito.<String>any())).thenReturn("");
        when(auditService.audit(Mockito.<AuditDTO>any())).thenReturn("Audit");

        assertThrows(QAuthenticationException.class, () -> qBAUserService.authenticate("tester1@test.com", "TestPass"));
        verify(userService).canAuthenticate(eq("tester1@test.com"), eq("TestPass"));
        verify(auditService).audit(isA(AuditDTO.class));
    }
}
