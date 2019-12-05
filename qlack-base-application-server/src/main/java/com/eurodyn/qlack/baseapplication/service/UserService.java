package com.eurodyn.qlack.baseapplication.service;

import com.eurodyn.qlack.baseapplication.dto.FileDTO;
import com.eurodyn.qlack.baseapplication.dto.UserDTO;
import com.eurodyn.qlack.baseapplication.model.File;
import com.eurodyn.qlack.baseapplication.model.User;
import com.eurodyn.qlack.baseapplication.repository.UserRepository;
import com.eurodyn.qlack.common.exception.QAlreadyExistsException;
import com.eurodyn.qlack.util.data.optional.ReturnOptional;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService extends BaseService<UserDTO, User> {

  @Autowired
  private final UserRepository repository;

  @Autowired
  private final FileService fileService;

  public void upload(UserDTO userDTO, MultipartFile pic) {
    if (isNewUser(userDTO) && repository.existsByEmail(userDTO.getEmail())) {
      throw new QAlreadyExistsException("Email is already in use.");
    }

    if (isNewUser(userDTO)) {
      userDTO.setId(null);
      createUser(userDTO, pic);
    } else {
      updateUser(userDTO, pic);
    }
  }

  private boolean isNewUser(UserDTO userDTO) {
    return userDTO.getId().equals("0");
  }

  private void createUser(UserDTO userDTO, MultipartFile pic) {
    FileDTO fileDTO = fileService.saveFile(pic);
    File file = fileService.findEntityById(fileDTO.getId());

    User newUser = mapper.map(userDTO);
    newUser.setProfilepic(file);

    repository.save(newUser);
  }

  private void updateUser(UserDTO userDTO, MultipartFile pic) {
    User user = ReturnOptional.r(repository.findById(userDTO.getId()));

    userDTO.setEmail(user.getEmail());
    if (StringUtils.isEmpty(userDTO.getPassword())) {
      userDTO.setPassword(user.getPassword());
    }

    mapper.map(userDTO, user);

    if (pic != null) {
      FileDTO fileDTO = fileService.saveFile(pic);
      File file = fileService.findEntityById(fileDTO.getId());

      File previousPic = user.getProfilepic();
      user.setProfilepic(file);

      if (previousPic != null) {
        fileService.deleteById(previousPic.getId());
      }
    }
  }
}
