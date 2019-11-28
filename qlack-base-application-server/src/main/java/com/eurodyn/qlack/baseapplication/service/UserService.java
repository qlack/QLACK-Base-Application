package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.common.exception.QAlreadyExistsException;
import com.eurodyn.qlack.util.data.optional.ReturnOptional;
import com.eurodyn.qlack.baseapplication.dto.UserDTO;
import com.eurodyn.qlack.baseapplication.model.User;
import com.eurodyn.qlack.baseapplication.repository.UserRepository;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService extends BaseService<UserDTO, User> {

  @Autowired
  private final UserRepository repository;

  @Override
  public UserDTO save(UserDTO userDTO) throws RuntimeException {
    if (userDTO.getId() == null && repository.existsByEmail(userDTO.getEmail())) {
      throw new QAlreadyExistsException("Email is already in use.");
    }

    if (userDTO.getId() != null && userDTO.getPassword() == null) {
      User user = ReturnOptional.r(repository.findById(userDTO.getId()));
      userDTO.setPassword(user.getPassword());
    }

    return super.save(userDTO);
  }
}
