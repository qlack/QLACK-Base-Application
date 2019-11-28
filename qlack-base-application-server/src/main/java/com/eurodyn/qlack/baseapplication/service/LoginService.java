package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.dto.LoginInfoDTO;
import com.eurodyn.qlack.baseapplication.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

  @Autowired
  private final UserRepository userRepository;

  public boolean canLogin(LoginInfoDTO loginInfoDTO) {
    return userRepository.existsByEmailAndPassword(loginInfoDTO.getEmail(), loginInfoDTO.getPassword());
  }

}
