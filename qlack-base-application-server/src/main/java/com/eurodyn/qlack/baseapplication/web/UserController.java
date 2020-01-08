package com.eurodyn.qlack.baseapplication.web;

import com.eurodyn.qlack.baseapplication.dto.UserDTO;
import com.eurodyn.qlack.baseapplication.model.User;
import com.eurodyn.qlack.baseapplication.service.UserService;
import com.eurodyn.qlack.util.data.filter.ReplyPageableFilter;
import com.eurodyn.qlack.util.querydsl.EmptyPredicateCheck;
import com.querydsl.core.types.Predicate;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@Transactional
@RequestMapping("/api/secured/users")
@RequiredArgsConstructor
public class UserController {

  @Autowired
  private final UserService userService;

  @PostMapping
  public void upload(@Valid @RequestBody UserDTO userDTO) {
    userService.upload(userDTO);
  }

  @GetMapping
  @EmptyPredicateCheck
  @ReplyPageableFilter("-password")
  public Page<UserDTO> findAll(@QuerydslPredicate(root = User.class) Predicate predicate,
      Pageable pageable) {
    return userService.findAll(predicate, pageable);
  }

  @GetMapping("{userId}")
  public UserDTO find(@Valid @PathVariable String userId) {
    return userService.findById(userId);
  }

  @DeleteMapping("{userId}")
  public void delete(@Valid @PathVariable String userId) {
    userService.deleteById(userId);
  }
}
