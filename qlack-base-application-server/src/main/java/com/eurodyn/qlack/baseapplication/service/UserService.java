package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.dto.ExtraInfoDTO;
import com.eurodyn.qlack.baseapplication.dto.UserDTO;
import com.eurodyn.qlack.baseapplication.model.ExtraInfo;
import com.eurodyn.qlack.baseapplication.model.User;
import com.eurodyn.qlack.baseapplication.repository.UserRepository;
import com.eurodyn.qlack.common.exception.QAlreadyExistsException;
import com.eurodyn.qlack.util.data.optional.ReturnOptional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService extends BaseService<UserDTO, User> {

  @Autowired
  private final UserRepository repository;

  @Autowired
  private final FileService fileService;

  @Autowired
  private final ExtraInfoService extraInfoService;

  public void upload(UserDTO userDTO) {
    if (isNewUser(userDTO) && repository.existsByEmail(userDTO.getEmail())) {
      throw new QAlreadyExistsException("Email is already in use.");
    }

    if (isNewUser(userDTO)) {
      userDTO.setId(null);
      createUser(userDTO);
    } else {
      updateUser(userDTO);
    }
  }

  private boolean isNewUser(UserDTO userDTO) {
    return userDTO.getId().equals("0");
  }

  private void createUser(UserDTO userDTO) {
    ExtraInfoDTO extraInfoDTO = extraInfoService.save(userDTO.getExtraInfo());
    ExtraInfo extraInfo = extraInfoService.findEntityById(extraInfoDTO.getId());

    User newUser = mapper.map(userDTO);

    newUser.setExtraInfo(extraInfo);

    repository.save(newUser);
  }

  private void updateUser(UserDTO userDTO) {
    User user = ReturnOptional.r(repository.findById(userDTO.getId()));

    userDTO.setEmail(user.getEmail());
    if (StringUtils.isEmpty(userDTO.getPassword())) {
      userDTO.setPassword(user.getPassword());
    }

    mapper.map(userDTO, user);
  }
}
